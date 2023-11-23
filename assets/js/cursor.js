const circle = document.getElementById('follower');
const delay = 100;

function updateCursorStyle(e) {
    if (navigator.maxTouchPoints === 0) {
        // Only update the cursor style if the device doesn't support touch input
        setTimeout(() => {
            const x = e.clientX;
            const y = e.clientY;
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
        }, delay);

        if (window.matchMedia('(pointer: fine)').matches) {
            circle.classList.add('outline-cursor');
        } else {
            circle.classList.remove('outline-cursor');
        }
    } else {
        // Hide the cursor if touch input is supported
        circle.style.display = 'none';
    }
}

document.addEventListener('mousemove', updateCursorStyle);

// Add an event listener for touchstart to hide the cursor on touch devices
document.addEventListener('touchstart', () => {
    circle.style.display = 'none';
});

// Show the cursor on touchmove (if the device has touch input)
document.addEventListener('touchmove', () => {
    circle.style.display = 'block';
});
