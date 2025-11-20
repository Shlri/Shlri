// Handle clickable links
document.querySelectorAll('.clickable').forEach(el => {
    el.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});

// Window drag functionality (optional enhancement)
let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', startDrag);
});

function startDrag(e) {
    if (e.target.classList.contains('control')) return;
    
    draggedWindow = e.target.closest('.window');
    const rect = draggedWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    draggedWindow.style.position = 'fixed';
    draggedWindow.style.zIndex = '1000';
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (!draggedWindow) return;
    
    draggedWindow.style.left = (e.clientX - offsetX) + 'px';
    draggedWindow.style.top = (e.clientY - offsetY) + 'px';
}

function stopDrag() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    draggedWindow = null;
}

// Window controls functionality
document.querySelectorAll('.control').forEach(control => {
    control.addEventListener('click', function(e) {
        e.stopPropagation();
        const window = this.closest('.window');
        const controlText = this.textContent;
        
        if (controlText === '✕') {
            window.style.opacity = '0';
            window.style.transform = 'scale(0.8)';
            setTimeout(() => {
                window.style.display = 'none';
            }, 300);
        } else if (controlText === '_') {
            window.style.opacity = window.style.opacity === '0.3' ? '1' : '0.3';
        }
    });
});

// Subtle glitch effect on random window
setInterval(() => {
    const windows = document.querySelectorAll('.window');
    const randomWindow = windows[Math.floor(Math.random() * windows.length)];
    
    if (randomWindow && Math.random() > 0.7) {
        randomWindow.style.transform = 'translate(2px, 2px)';
        setTimeout(() => {
            randomWindow.style.transform = 'translate(0, 0)';
        }, 100);
    }
}, 5000);

// Add gothic cursor effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const cross = document.createElement('div');
        cross.textContent = '✟';
        cross.style.position = 'fixed';
        cross.style.left = e.clientX + 'px';
        cross.style.top = e.clientY + 'px';
        cross.style.color = '#6b21a8';
        cross.style.fontSize = '12px';
        cross.style.pointerEvents = 'none';
        cross.style.zIndex = '9999';
        cross.style.opacity = '0.6';
        document.body.appendChild(cross);
        
        setTimeout(() => {
            cross.style.transition = 'all 1s';
            cross.style.opacity = '0';
            cross.style.transform = 'translateY(20px)';
        }, 50);
        
        setTimeout(() => {
            cross.remove();
        }, 1050);
    }
});