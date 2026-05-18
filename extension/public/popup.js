async function loadPopupData() {
    try {
        const data = await chrome.storage.local.get(['supabase_token']);
        const token = data.supabase_token;
        
        if (!token || token === 'undefined' || token === 'null') {
            document.getElementById('logged-in-view').style.display = 'none';
            document.getElementById('logged-out-view').style.display = 'block';
            document.getElementById('status-badge').className = 'status-badge offline';
            document.getElementById('status-dot').className = 'status-dot offline';
            document.getElementById('status-text').textContent = 'Offline';
            return;
        }

        // Fetch usage from backend
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            // Use localhost to match manifest.json host_permissions!
            const response = await fetch('http://localhost:5000/usage', {
                method: 'GET',
                headers: { 
                    'Authorization': 'Bearer ' + token.trim(),
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const usage = await response.json();
                
                const count = usage.count || 0;
                const limit = usage.limit || 30;
                const plan = usage.plan || 'free';
                const percentage = limit === -1 ? 0 : Math.min((count / limit) * 100, 100);

                document.getElementById('usage-count').textContent = String(count);
                document.getElementById('usage-limit').textContent = limit === -1 ? '/ unlimited' : `/ ${limit} improvements`;
                document.getElementById('plan-name').textContent = plan;

                const progressFill = document.getElementById('progress-fill');
                if (progressFill) {
                    progressFill.style.width = (limit === -1 ? 0 : percentage) + '%';
                    if (percentage > 80) progressFill.classList.add('warning');
                }

                document.getElementById('usage-note').textContent = 
                    limit === -1 
                        ? 'Unlimited improvements available'
                        : `${Math.max(0, (100 - percentage)).toFixed(0)}% of daily limit remaining`;
            } else if (response.status === 401 || response.status === 403) {
                document.getElementById('logged-in-view').style.display = 'none';
                document.getElementById('logged-out-view').style.display = 'block';
                document.getElementById('status-badge').className = 'status-badge offline';
                document.getElementById('status-dot').className = 'status-dot offline';
                document.getElementById('status-text').textContent = 'Session Expired';
            } else {
                throw new Error(`Server returned status: ${response.status}`);
            }
        } catch (fetchErr) {
            console.error('AI Writer: Fetch error:', fetchErr);
            document.getElementById('usage-count').textContent = '-';
            document.getElementById('usage-limit').textContent = 'Failed';
            document.getElementById('usage-note').textContent = fetchErr.message || 'Server not responding';
            document.getElementById('plan-name').textContent = 'Error';
            document.getElementById('status-badge').className = 'status-badge offline';
            document.getElementById('status-dot').className = 'status-dot offline';
            document.getElementById('status-text').textContent = 'Error';
        }

    } catch (err) {
        console.error('AI Writer: Script error:', err);
        document.getElementById('usage-note').textContent = 'Critical Error: ' + err.message;
    }
}

document.addEventListener('DOMContentLoaded', loadPopupData);
