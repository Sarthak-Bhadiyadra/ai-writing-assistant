// AI Writer — Content Script
// Runs on every page to provide the text improvement floating button and overlay

console.log('AI Writer: Content script loaded');

// ─── State ───
let floatingButton: HTMLElement | null = null;
let selectedText = '';
let overlay: HTMLDivElement | null = null;
let isMouseDown = false;
let mouseDownTime = 0;
let selectionAnchorNode: Node | null = null;

// ─── Event Listeners ───
document.addEventListener('pointerdown', handlePointerDown, true);
document.addEventListener('pointerup', handlePointerUp, true);
document.addEventListener('keydown', handleKeyDown, true);
document.addEventListener('keyup', handleKeyUp, true);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'show_ui') {
        showUIOverlay(request.text);
    } else if (request.action === 'token_synced' && window.location.host.includes('localhost:3000')) {
        showToast(`✅ AI Writer: Token synced (${request.name})`);
    }
});

// ─── Toast Notification ───
function showToast(message: string) {
    const msgId = 'ai-writer-toast';
    const existing = document.getElementById(msgId);
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = msgId;
    toast.textContent = message;
    Object.assign(toast.style, {
        position: 'fixed', top: '20px', right: '20px', zIndex: '2147483647',
        background: '#161923', color: '#f1f5f9', padding: '12px 20px',
        borderRadius: '12px', border: '1px solid #262a3a',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
        fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '13px', fontWeight: '500',
        transition: 'opacity 0.3s ease', opacity: '0',
    });
    document.body.appendChild(toast);
    // Trigger reflow then fade in
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ─── Pointer/Keyboard Handlers ───

function handlePointerDown(e: PointerEvent) {
    isMouseDown = true;
    mouseDownTime = Date.now();

    // If clicking on the floating button or its children, DON'T remove it
    if (floatingButton && isInsideElement(e.target as Node, floatingButton)) {
        return;
    }

    // If clicking on the overlay, DON'T remove button
    if (overlay && isInsideElement(e.target as Node, overlay)) {
        return;
    }

    // Otherwise, remove the floating button
    removeButton();
}

function handlePointerUp(e: PointerEvent) {
    isMouseDown = false;

    // If clicking on the floating button, let the button's click handler deal with it
    if (floatingButton && isInsideElement(e.target as Node, floatingButton)) {
        return;
    }

    // If the overlay is open, don't show button
    if (overlay) return;

    // Small delay to let browser finalize the selection
    requestAnimationFrame(() => {
        processSelection();
    });
}

function handleKeyUp(e: KeyboardEvent) {
    // Handle Ctrl+A or other selection-modifying keys
    if (e.ctrlKey || e.metaKey || ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        requestAnimationFrame(() => {
            processSelection();
        });
    }
}

function processSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text || text.length === 0) return;
    if (text.length > 5000) return; // Increased limit slightly for Ctrl+A

    // If it was a pointer interaction, ensure it was a drag-select (>80ms)
    // For keyboard shortcuts, elapsed will be 0 as handlePointerDown wasn't called
    if (isMouseDown) {
        const elapsed = Date.now() - mouseDownTime;
        if (elapsed < 80) return;
    }

    selectedText = text;
    selectionAnchorNode = selection.anchorNode;

    // Position near the selection
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // If rect is basically the whole viewport (like Ctrl+A on a simple page), 
    // position at top-right of visible selection
    let targetX = rect.right + window.scrollX;
    let targetY = rect.bottom + window.scrollY;

    if (rect.height > window.innerHeight * 0.8) {
        targetX = window.scrollX + window.innerWidth - 60;
        targetY = window.scrollY + 60;
    }

    showFloatingButton(targetX, targetY);
}

function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
        removeButton();
        closeOverlay();
    }
}

// ─── Helpers ───

function isInsideElement(target: Node | null, container: HTMLElement): boolean {
    let node = target;
    while (node) {
        if (node === container) return true;
        node = node.parentNode;
    }
    return false;
}

// ─── Floating Button ───

function showFloatingButton(x: number, y: number) {
    removeButton();

    const btn = document.createElement('div');
    btn.id = 'ai-writing-assistant-btn';
    btn.setAttribute('role', 'button');
    btn.setAttribute('title', 'Improve with AI Writer');
    btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
        </svg>
    `;

    // Clamp position to viewport
    const btnSize = 36;
    const margin = 8;
    const maxX = window.scrollX + window.innerWidth - btnSize - margin;
    const maxY = window.scrollY + window.innerHeight - btnSize - margin;
    const clampedX = Math.max(window.scrollX + margin, Math.min(x + 8, maxX));
    const clampedY = Math.max(window.scrollY + margin, Math.min(y + 8, maxY));

    Object.assign(btn.style, {
        position: 'absolute',
        left: clampedX + 'px',
        top: clampedY + 'px',
        zIndex: '2147483647',
        width: btnSize + 'px',
        height: btnSize + 'px',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        animation: 'ai-writer-fade-in 0.15s ease',
        pointerEvents: 'auto',
    });

    // Inject keyframes if not already present
    if (!document.getElementById('ai-writer-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ai-writer-keyframes';
        style.textContent = `
            @keyframes ai-writer-fade-in {
                from { opacity: 0; transform: scale(0.85); }
                to { opacity: 1; transform: scale(1); }
            }
            #ai-writing-assistant-btn:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 6px 24px rgba(79, 70, 229, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.4) !important;
            }
            #ai-writing-assistant-btn:active {
                transform: scale(0.95) !important;
            }
        `;
        document.head.appendChild(style);
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const textToImprove = selectedText;
        removeButton();
        if (textToImprove) {
            showUIOverlay(textToImprove);
        }
    });

    document.body.appendChild(btn);
    floatingButton = btn;
}

function removeButton() {
    if (floatingButton) {
        floatingButton.remove();
        floatingButton = null;
    }
}

// ─── UI Overlay (Modal) ───

function closeOverlay() {
    if (overlay) {
        overlay.remove();
        overlay = null;
    }
}

function showUIOverlay(text: string) {
    closeOverlay();

    overlay = document.createElement('div');
    overlay.id = 'ai-writing-assistant-overlay';
    const shadow = overlay.attachShadow({ mode: 'open' });
    
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;

    const container = document.createElement('div');
    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }

            .backdrop {
                position: fixed; inset: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                z-index: 2147483646;
                animation: fadeIn 0.2s ease;
            }

            .modal {
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 480px; max-width: calc(100vw - 32px); max-height: 90vh;
                background: #0f1117;
                border-radius: 20px;
                border: 1px solid #262a3a;
                box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.6);
                z-index: 2147483647; 
                font-family: 'Inter', -apple-system, sans-serif; 
                overflow: hidden;
                animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                color: #f1f5f9;
                display: flex;
                flex-direction: column;
            }

            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { 
                from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); } 
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); } 
            }
            @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            
            .header { 
                padding: 16px 20px; 
                background: #161923;
                border-bottom: 1px solid #262a3a; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                flex-shrink: 0;
            }

            .header-left {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .header-icon {
                width: 30px; height: 30px;
                background: #4f46e5;
                border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                color: white;
                flex-shrink: 0;
            }

            .header-title { 
                font-size: 14px; 
                font-weight: 700; 
                color: #f1f5f9; 
            }

            .header-meta {
                font-size: 11px;
                color: #64748b;
                font-weight: 500;
            }
            
            .content { 
                padding: 20px; 
                overflow-y: auto;
                flex: 1;
            }

            .label {
                font-size: 12px;
                font-weight: 600;
                color: #64748b;
                margin-bottom: 6px;
                display: block;
            }

            textarea { 
                width: 100%; padding: 12px 14px; 
                background: #161923;
                border-radius: 12px; 
                border: 1px solid #262a3a; 
                color: #f1f5f9;
                font-family: 'Inter', -apple-system, sans-serif;
                font-size: 13px; 
                line-height: 1.6;
                margin-bottom: 16px; 
                box-sizing: border-box; 
                transition: border-color 0.2s, box-shadow 0.2s;
                resize: vertical;
                min-height: 70px;
            }
            textarea:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15); }
            textarea[readonly] { resize: none; cursor: default; }
            textarea[readonly]:focus { border-color: #262a3a; box-shadow: none; }
            
            select { 
                width: 100%; padding: 11px 14px; 
                background: #161923;
                border-radius: 12px; 
                border: 1px solid #262a3a; 
                color: #f1f5f9;
                font-family: 'Inter', -apple-system, sans-serif;
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 16px; 
                cursor: pointer;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 14px center;
                transition: border-color 0.2s;
            }
            select:focus { outline: none; border-color: #6366f1; }

            .btn-row {
                display: flex;
                gap: 8px;
            }
            
            .btn-primary { 
                background: #4f46e5; 
                color: #ffffff; 
                flex: 1; padding: 12px; 
                border-radius: 12px; border: none; 
                font-family: 'Inter', -apple-system, sans-serif;
                font-weight: 600; 
                cursor: pointer; 
                transition: all 0.15s;
                font-size: 13px;
                box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
                display: flex; align-items: center; justify-content: center; gap: 6px;
            }
            .btn-primary:hover { background: #6366f1; }
            .btn-primary:active { transform: scale(0.98); }
            .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

            .btn-secondary { 
                background: #161923; 
                color: #f1f5f9; 
                flex: 1; padding: 12px; 
                border-radius: 12px; 
                border: 1px solid #262a3a; 
                font-family: 'Inter', -apple-system, sans-serif;
                font-weight: 600; 
                cursor: pointer; 
                transition: all 0.15s;
                font-size: 13px;
                display: flex; align-items: center; justify-content: center; gap: 6px;
            }
            .btn-secondary:hover { background: #1c1f2e; border-color: #2e3348; }
            .btn-secondary:active { transform: scale(0.98); }

            .btn-success {
                background: rgba(34, 197, 94, 0.15);
                color: #22c55e;
                border-color: rgba(34, 197, 94, 0.25);
            }

            .error-msg {
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.2);
                color: #f87171;
                padding: 10px 14px;
                border-radius: 10px;
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 12px;
                line-height: 1.5;
            }

            .loading-container {
                text-align: center;
                padding: 16px 0;
            }

            .loading-spinner {
                display: inline-block;
                width: 20px; height: 20px;
                border: 2.5px solid rgba(99, 102, 241, 0.15);
                border-top-color: #6366f1;
                border-radius: 50%;
                animation: spin 0.7s linear infinite;
                margin-bottom: 8px;
            }

            .loading-text {
                color: #94a3b8;
                font-size: 12px;
                font-weight: 500;
            }

            @keyframes spin { to { transform: rotate(360deg); } }
            
            #close-btn { 
                color: #64748b; 
                transition: all 0.15s; 
                background: none; 
                border: none; 
                cursor: pointer; 
                font-size: 20px;
                width: 32px; height: 32px;
                display: flex; align-items: center; justify-content: center;
                border-radius: 8px;
                flex-shrink: 0;
            }
            #close-btn:hover { color: #f1f5f9; background: rgba(255,255,255,0.06); }

            .result-section {
                padding-top: 4px;
                border-top: 1px solid #262a3a;
                margin-top: 4px;
            }

            .result-label-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 6px;
            }

            .word-diff {
                font-size: 11px;
                font-weight: 600;
                padding: 2px 8px;
                border-radius: 6px;
            }
            .word-diff.shorter { background: rgba(34, 197, 94, 0.12); color: #22c55e; }
            .word-diff.longer { background: rgba(99, 102, 241, 0.12); color: #818cf8; }
            .word-diff.same { background: rgba(148, 163, 184, 0.12); color: #94a3b8; }
        </style>
        <div class="backdrop" id="backdrop"></div>
        <div class="modal">
            <div class="header">
                <div class="header-left">
                    <div class="header-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                            <path d="M2 2l7.586 7.586"></path>
                            <circle cx="11" cy="11" r="2"></circle>
                        </svg>
                    </div>
                    <div>
                        <div class="header-title">AI Writer</div>
                        <div class="header-meta">${wordCount} words · ${charCount} chars</div>
                    </div>
                </div>
                <button id="close-btn" title="Close (Esc)">&times;</button>
            </div>
            <div class="content">
                <label class="label">Your Text</label>
                <textarea id="original-text" rows="3"></textarea>
                
                <label class="label">Tone</label>
                <select id="tone-selector">
                    <option value="Improve Clarity">Improve Clarity</option>
                    <option value="Make Concise">Make Concise</option>
                    <option value="Formal Tone">Formal Tone</option>
                    <option value="Friendly Tone">Friendly Tone</option>
                    <option value="Fix Grammar">Fix Grammar</option>
                    <option value="Expand">Expand & Elaborate</option>
                </select>

                <div id="error-area" style="display:none;">
                    <div class="error-msg" id="error-msg"></div>
                </div>

                <div id="loading" style="display:none;">
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">Improving your text...</div>
                    </div>
                </div>

                <div id="result-area" style="display:none;" class="result-section">
                    <div class="result-label-row">
                        <label class="label" style="margin-bottom:0">Improved Text</label>
                        <span class="word-diff" id="word-diff"></span>
                    </div>
                    <textarea id="ai-result" rows="3" readonly></textarea>
                    <div class="btn-row" style="margin-bottom: 10px;">
                        <button id="copy-btn" class="btn-secondary">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
                <button id="improve-btn" class="btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    Improve
                </button>
            </div>
        </div>
    `;

    shadow.appendChild(container);
    document.body.appendChild(overlay);

    const root = shadow;
    const originalTextEl = root.getElementById('original-text') as HTMLTextAreaElement;
    originalTextEl.value = text;

    // Close handlers
    const closeModalFn = () => closeOverlay();
    root.getElementById('backdrop')?.addEventListener('click', closeModalFn);
    root.getElementById('close-btn')?.addEventListener('click', closeModalFn);

    const improveBtn = root.getElementById('improve-btn') as HTMLButtonElement;
    const loadingEl = root.getElementById('loading') as HTMLDivElement;
    const resultArea = root.getElementById('result-area') as HTMLDivElement;
    const aiResult = root.getElementById('ai-result') as HTMLTextAreaElement;
    const errorArea = root.getElementById('error-area') as HTMLDivElement;
    const errorMsg = root.getElementById('error-msg') as HTMLDivElement;
    const wordDiffEl = root.getElementById('word-diff') as HTMLSpanElement;

    function showError(msg: string) {
        errorMsg.textContent = msg;
        errorArea.style.display = 'block';
        setTimeout(() => { errorArea.style.display = 'none'; }, 8000);
    }

    improveBtn.onclick = async () => {
        const inputText = originalTextEl.value.trim();
        if (!inputText) {
            showError('Please enter some text to improve.');
            return;
        }

        improveBtn.disabled = true;
        loadingEl.style.display = 'block';
        resultArea.style.display = 'none';
        errorArea.style.display = 'none';

        try {
            const data = await chrome.storage.local.get('supabase_token');
            const supabase_token = data.supabase_token as string;
            
            if (!supabase_token || supabase_token === 'undefined' || supabase_token === 'null') {
                console.error('AI Writer: Token missing.', await chrome.storage.local.get());
                showError('Not logged in. Please visit the AI Writer Dashboard (localhost:3000) and sign in, then refresh this page.');
                improveBtn.disabled = false;
                loadingEl.style.display = 'none';
                return;
            }

            const response = await fetch(`${process.env.BACKEND_URL}/improve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + supabase_token
                },
                body: JSON.stringify({
                    text: inputText,
                    tone: (root.getElementById('tone-selector') as HTMLSelectElement).value
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.error || `Server error (${response.status})`);
            }

            const resultData = await response.json();
            if (resultData.result) {
                aiResult.value = resultData.result;
                resultArea.style.display = 'block';

                // Word diff indicator
                const origWords = inputText.split(/\s+/).filter(Boolean).length;
                const newWords = resultData.result.split(/\s+/).filter(Boolean).length;
                const diff = newWords - origWords;
                if (diff < 0) {
                    wordDiffEl.textContent = `${diff} words`;
                    wordDiffEl.className = 'word-diff shorter';
                } else if (diff > 0) {
                    wordDiffEl.textContent = `+${diff} words`;
                    wordDiffEl.className = 'word-diff longer';
                } else {
                    wordDiffEl.textContent = 'Same length';
                    wordDiffEl.className = 'word-diff same';
                }
            } else {
                showError(resultData.error || 'Could not improve text. Please try again.');
            }
        } catch (e) {
            console.error('AI Writer Error:', e);
            showError(e instanceof Error ? e.message : 'Failed to connect. Check your internet and try again.');
        } finally {
            improveBtn.disabled = false;
            loadingEl.style.display = 'none';
        }
    };

    // Copy button
    root.getElementById('copy-btn')?.addEventListener('click', () => {
        navigator.clipboard.writeText(aiResult.value).then(() => {
            const copyBtn = root.getElementById('copy-btn') as HTMLButtonElement;
            copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Copied!
            `;
            copyBtn.classList.add('btn-success');
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy to Clipboard
                `;
                copyBtn.classList.remove('btn-success');
            }, 2000);
        });
    });
}
