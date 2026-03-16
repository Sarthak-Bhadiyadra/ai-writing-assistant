// background.ts - FIXED TOKEN PARSING
const SUPABASE_REF = process.env.SUPABASE_REF || 'srxmxrpfplhylngzirfm';

async function syncTokenFromCookies() {
    try {
        console.log('Sync: Searching for cookies for project:', SUPABASE_REF);
        
        const allLocalCookies = await chrome.cookies.getAll({ domain: "localhost" });
        console.log('Sync: Found', allLocalCookies.length, 'total cookies for localhost');

        let foundToken = null;
        let tokenName = "";

        // Strategy 1: Look for specific Project Ref cookies
        const targetPrefix = `sb-${SUPABASE_REF}-auth-token`;
        const primaryCookie = allLocalCookies.find(c => c.name === targetPrefix || c.name === `${targetPrefix}.0`);
        
        if (primaryCookie) {
            tokenName = primaryCookie.name;
            console.log('Found cookie:', primaryCookie.name, 'Raw value length:', primaryCookie.value.length);
            
            // FIXED: Supabase cookies are base64(session) - extract the access_token
            try {
                const decodedValue = decodeURIComponent(primaryCookie.value);
                console.log('Decoded cookie value preview:', decodedValue.substring(0, 100) + '...');
                
                // Supabase cookie format: base64(session_object)
                const sessionMatch = decodedValue.match(/^base64-(.*)$/);
                if (sessionMatch) {
                    const sessionB64 = sessionMatch[1];
                    const sessionJson = JSON.parse(atob(sessionB64));
                    console.log('Parsed session structure:', Object.keys(sessionJson));
                    
                    // Extract access_token from session
                    foundToken = sessionJson.access_token || 
                                (sessionJson[0] && sessionJson[0].access_token) || 
                                null;
                } else {
                    // Fallback for direct token
                    foundToken = decodedValue;
                }
            } catch (e) {
                console.log('Parse error, using raw decoded value:', e);
                foundToken = decodeURIComponent(primaryCookie.value);
            }
        }

        // Strategy 2: Fallback to ANY Supabase auth token
        if (!foundToken) {
            const fallbackCookie = allLocalCookies.find(c => c.name.includes('auth-token'));
            if (fallbackCookie) {
                tokenName = fallbackCookie.name;
                try {
                    const decoded = decodeURIComponent(fallbackCookie.value);
                    const sessionMatch = decoded.match(/^base64-(.*)$/);
                    if (sessionMatch) {
                        const sessionJson = JSON.parse(atob(sessionMatch[1]));
                        foundToken = sessionJson.access_token || sessionJson[0]?.access_token;
                    } else {
                        foundToken = decoded;
                    }
                } catch (e) {
                    foundToken = decodeURIComponent(fallbackCookie.value);
                }
            }
        }

        if (foundToken) {
            await chrome.storage.local.set({ supabase_token: foundToken });
            console.log('✅ Synced ACCESS_TOKEN (length:', foundToken.length, '):', tokenName);
            
            const tabs = await chrome.tabs.query({ url: "*://localhost/*" });
            for (const tab of tabs) {
                if (tab.id) {
                    try {
                        await chrome.tabs.sendMessage(tab.id, { 
                            action: 'token_synced', 
                            name: tokenName,
                            tokenPreview: foundToken.substring(0, 20) + '...' 
                        });
                    } catch (e) {
                        console.log('Tab', tab.id, 'not ready');
                    }
                }
            }
        } else {
            console.warn('❌ No valid access_token found in', allLocalCookies.length, 'cookies');
            // Log all auth-token cookies for debugging
            const authCookies = allLocalCookies.filter(c => c.name.includes('auth-token'));
            console.log('All auth cookies:', authCookies.map(c => ({name: c.name, length: c.value.length})));
        }
    } catch (error) {
        console.error('Sync error:', error);
    }
}

// Restore Listeners
chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Assistant: Extension Installed');
    syncTokenFromCookies();
    chrome.alarms.create('syncToken', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'syncToken') {
        syncTokenFromCookies();
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('localhost:3000')) {
        syncTokenFromCookies();
    }
});

// Handle direct message from Dashboard
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    console.log('Received external message:', request, 'from', sender.url);
    if (request.jwt) {
        chrome.storage.local.set({ supabase_token: request.jwt }, () => {
            console.log('✅ Token synced via external message');
            sendResponse({ success: true, message: 'Token received' });
        });
        return true; // Keep message channel open for async response
    }
});

// Handle internal messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'open_popup') {
        chrome.storage.local.set({ selectedText: request.text }, () => {
            if (sender.tab && sender.tab.id) {
                chrome.tabs.sendMessage(sender.tab.id, { action: 'show_ui', text: request.text });
            }
        });
    }
});
