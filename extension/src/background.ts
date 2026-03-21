// background.ts - FIXED TOKEN PARSING
const SUPABASE_REF = process.env.SUPABASE_REF || 'srxmxrpfplhylngzirfm';

async function syncTokenFromCookies() {
    try {
        console.log('Sync: Searching for cookies for project:', SUPABASE_REF);
        
        const allLocalCookies = await chrome.cookies.getAll({ domain: "localhost" });
        console.log('Sync: Found', allLocalCookies.length, 'total cookies for localhost');

        let foundToken = null;
        let tokenName = "";

        // Strategy 1: Look for specific Project Ref cookies (handle splitting)
        const targetPrefix = `sb-${SUPABASE_REF}-auth-token`;
        const projectCookies = allLocalCookies
            .filter(c => c.name.startsWith(targetPrefix))
            .sort((a, b) => {
                const aIdx = parseInt(a.name.split('.').pop() || '0');
                const bIdx = parseInt(b.name.split('.').pop() || '0');
                if (isNaN(aIdx)) return -1;
                if (isNaN(bIdx)) return 1;
                return aIdx - bIdx;
            });
        
        if (projectCookies.length > 0) {
            tokenName = projectCookies[0].name + (projectCookies.length > 1 ? '+' : '');
            console.log('Found', projectCookies.length, 'parts for', targetPrefix);
            
            try {
                // Stitch cookies together
                const rawValue = projectCookies.map(c => c.value).join('');
                const decodedValue = decodeURIComponent(rawValue);
                foundToken = extractToken(decodedValue);
            } catch (e) {
                console.log('Stitch/Parse error:', e);
            }
        }

        // Strategy 2: Fallback to ANY Supabase auth token
        if (!foundToken) {
            const fallbackCookie = allLocalCookies.find(c => c.name.includes('auth-token') && !c.name.startsWith(targetPrefix));
            if (fallbackCookie) {
                tokenName = fallbackCookie.name;
                foundToken = extractToken(decodeURIComponent(fallbackCookie.value));
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
    } else if (request.action === 'store_token' && request.token) {
        chrome.storage.local.set({ supabase_token: request.token }, () => {
            console.log('✅ Token synced from content script (source:', request.source || 'unknown', ')');
        });
    } else if (request.action === 'improve_text') {
        // Handle improvement request in background for reliability and CORS
        handleImprovementRequest({ ...request, sourceUrl: sender.url }, sendResponse);
        return true; // Keep channel open for async response
    }
});

async function handleImprovementRequest(request: any, sendResponse: (response: any) => void) {
    try {
        const data = await chrome.storage.local.get('supabase_token');
        const rawToken = data.supabase_token as string;
        console.log("BG: rawToken from storage:", rawToken ? (rawToken.substring(0, 20) + '...') : 'undefined');
        const token = extractToken(rawToken);

        if (!token) {
            console.error('BG: No token found or token invalid after extraction (raw length:', rawToken?.length || 0, ')');
            sendResponse({ error: 'Not logged in. Please sign in to the Dashboard.' });
            return;
        }

        console.log('BG: Sending request with token preview:', token.substring(0, 20) + '...');

        // Use the backend URL from environment or hardcode for dev
        const BACKEND_URL = 'http://localhost:5000'; 
        
        console.log('BG: Improvement request for tone:', request.tone);

        const response = await fetch(`${BACKEND_URL}/improve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                text: request.text,
                tone: request.tone,
                url: request.sourceUrl,
                source: extractDomain(request.sourceUrl)
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            sendResponse({ 
                error: errData.error || `Server error (${response.status})`,
                code: errData.code
            });
            return;
        }

        const result = await response.json();
        sendResponse({ result: result.result });
    } catch (error) {
        console.error('BG: Improvement error:', error);
        sendResponse({ error: error instanceof Error ? error.message : 'Connection failed' });
    }
}

function extractToken(value: string): string | null {
    if (!value) return null;
    if (typeof value !== 'string') return null;
    
    try {
        let jsonStr = value;
        // Handle Supabase's base64- prefix used in some versions
        if (value.startsWith('base64-')) {
            jsonStr = safeAtob(value.substring(7));
        }
        
        // If it's a JSON string (session object)
        if (jsonStr.trim().startsWith('{') || jsonStr.trim().startsWith('[')) {
            const session = JSON.parse(jsonStr);
            // Dig deep for the token
            const token = session.access_token || 
                         (Array.isArray(session) && session[0]?.access_token) ||
                         (session.session && session.session.access_token);
            
            if (token) return token;
        }
        
        // If it's the raw value but still looks like a JWT
        const parts = jsonStr.split('.');
        if (parts.length === 3) return jsonStr;
        
        // Final fallback: maybe it's the raw value from the cookie
        if (value.split('.').length === 3) return value;

        return null;
    } catch (e) {
        console.error('BG: extractToken error:', e);
        // If decryption/parsing fails, check if it's a JWT
        if (value.split('.').length === 3) return value;
        return null;
    }
}
function extractDomain(url: string | undefined): string {
    if (!url) return 'Extension';
    try {
        const u = new URL(url);
        return u.hostname.replace('www.', '');
    } catch {
        return 'Webpage';
    }
}

function safeAtob(str: string): string {
    try {
        // Handle base64url (Supabase standard)
        // 1. Replace URL-safe characters
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        // 2. Add padding
        while (base64.length % 4) {
            base64 += '=';
        }
        return atob(base64);
    } catch (e) {
        // Fallback to regular atob
        return atob(str);
    }
}
