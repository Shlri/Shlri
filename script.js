// Window configurations
const windows = {
    profile: {
        icon: '☠',
        title: 'profile',
        content: `
            <div class="profile-grid">
                <div class="avatar">👤</div>
                <div class="profile-details">
                    <div class="profile-name">shiri_w</div>
                    <div class="profile-line">pixel artist</div>
                    <div class="profile-line">developer</div>
                    <div class="profile-line">streamer</div>
                    <div class="profile-line">she/her</div>
                    <div class="profile-line">age 19</div>
                    <div class="profile-line">4'10</div>
                </div>
            </div>
            <div class="corner-decoration top-right">⛧</div>
            <div class="corner-decoration bottom-left">✝</div>
        `
    },
    links: {
        icon: '⛓',
        title: 'links',
        content: `
            <div class="links-grid">
                <a href="https://www.twitch.tv/MepTBoe_TeJlo" target="_blank" class="link-card">
                    <div class="link-icon">📺</div>
                    <div class="link-label">twitch</div>
                </a>
                <a href="https://youtube.com/@shiri_w" target="_blank" class="link-card">
                    <div class="link-icon">🎬</div>
                    <div class="link-label">youtube</div>
                </a>
                <a href="https://t.me/shiri_w" target="_blank" class="link-card">
                    <div class="link-icon">💬</div>
                    <div class="link-label">telegram</div>
                </a>
                <a href="https://t.me/shiri_ch" target="_blank" class="link-card">
                    <div class="link-icon">📢</div>
                    <div class="link-label">channel</div>
                </a>
                <a href="https://steamcommunity.com/id/__Shiri/" target="_blank" class="link-card">
                    <div class="link-icon">🎮</div>
                    <div class="link-label">steam</div>
                </a>
                <a href="https://github.com/shlri" target="_blank" class="link-card">
                    <div class="link-icon">💻</div>
                    <div class="link-label">github</div>
                </a>
            </div>
            <div class="corner-decoration top-left">☠</div>
        `
    },
    interests: {
        icon: '✝',
        title: 'interests',
        content: `
            <div class="lists-container">
                <div class="list-section likes">
                    <h3>♡ likes</h3>
                    <div class="list-items">
                        <div class="list-item">→ kitty's</div>
                        <div class="list-item">→ anime</div>
                        <div class="list-item">→ games</div>
                        <div class="list-item">→ <em>pron :3</em></div>
                        <div class="list-item">→ pixel art</div>
                        <div class="list-item">→ gothic</div>
                    </div>
                </div>
                <div class="list-section dislikes">
                    <h3>✗ dislikes</h3>
                    <div class="list-items">
                        <div class="list-item">→ loud noises</div>
                        <div class="list-item">→ studing</div>
                        <div class="list-item">→ <em>pron 3:</em></div>
                        <div class="list-item">→ mornings</div>
                    </div>
                </div>
            </div>
            <div class="corner-decoration bottom-right">⛧</div>
        `
    },
    about: {
        icon: '⚰',
        title: 'about',
        content: `
            <div class="about-sections">
                <div class="about-block">
                    <h4>i can do...</h4>
                    <p>✦ montage<br>✦ collage<br>✦ <em>silly</em> pixel art<br>✦ <em>shitpost</em></p>
                </div>
                <div class="about-block">
                    <h4>status</h4>
                    <p>building <em>silly things</em> pixel by pixel</p>
                </div>
            </div>
            <div class="corner-decoration top-right">🕸</div>
            <div class="corner-decoration bottom-left">🦇</div>
        `
    }
};

// Initialize
const container = document.getElementById('windowsContainer');
const windowElements = {};
let zIndexCounter = 10;

// Window positions (вручную задай координаты)
const positions = {
    profile: { x: 160, y: 80, width: 400, height: 350 },
    links: { x: 550, y: 350, width: 450, height: 400 },
    interests: { x: 985, y: 120, width: 400, height: 450 },
    about: { x: 175, y: 530, width: 400, height: 350 }
};

// Create windows
Object.keys(windows).forEach((id, index) => {
    const config = windows[id];
    const pos = positions[id];
    
    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.dataset.windowId = id;
    windowEl.style.animationDelay = (index * 0.1) + 's';
    
    // Set position and size
    windowEl.style.left = pos.x + 'px';
    windowEl.style.top = pos.y + 'px';
    windowEl.style.width = pos.width + 'px';
    windowEl.style.height = pos.height + 'px';
    windowEl.style.zIndex = 10 + index;
    
    windowEl.innerHTML = `
        <div class="window-header">
            <div class="window-title">
                <span class="window-icon">${config.icon}</span>
                <span>${config.title}</span>
            </div>
            <div class="window-buttons">
                <div class="window-btn" data-action="close"></div>
            </div>
        </div>
        <div class="window-content">
            ${config.content}
        </div>
    `;
    
    // Bring to front on hover
    windowEl.addEventListener('mouseenter', () => {
        bringToFront(windowEl);
    });
    
    // Close handler
    const closeBtn = windowEl.querySelector('[data-action="close"]');
    closeBtn.addEventListener('click', () => toggleWindow(id));
    
    container.appendChild(windowEl);
    windowElements[id] = windowEl;
});

function bringToFront(windowEl) {
    zIndexCounter++;
    windowEl.style.zIndex = zIndexCounter;
    windowEl.classList.add('active');
    
    // Dim all other windows
    Object.values(windowElements).forEach(el => {
        if (el !== windowEl) {
            el.classList.remove('active');
        }
    });
}

function toggleWindow(windowId) {
    const windowEl = windowElements[windowId];
    const dockItem = document.querySelector(`[data-window="${windowId}"]`);
    
    if (windowEl.classList.contains('hidden')) {
        windowEl.classList.remove('hidden');
        dockItem.classList.add('active');
    } else {
        windowEl.classList.add('hidden');
        dockItem.classList.remove('active');
    }
}

// Dock handlers (оставь как есть)
document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => {
        const windowId = item.dataset.window;
        toggleWindow(windowId);
    });
});

// Create stars
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Create floating symbols
const symbols = ['✝', '⛧', '♡', '☠', '⚰', '✦', '⛓'];
const symbolsContainer = document.getElementById('floatingSymbols');
for (let i = 0; i < 8; i++) {
    const symbol = document.createElement('div');
    symbol.className = 'float-symbol';
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + '%';
    symbol.style.animationDelay = Math.random() * 20 + 's';
    symbol.style.animationDuration = (15 + Math.random() * 10) + 's';
    symbolsContainer.appendChild(symbol);
}