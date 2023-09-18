// script.js
const circle = document.getElementById('follower');
const delay = 100; // Adjust this value for the delay (in milliseconds)

function updateCursorStyle(e) {
    // Calculate the new position with a delay
    setTimeout(() => {
        const x = e.clientX;
        const y = e.clientY;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
    }, delay);

    // Check if the device has a pointer (e.g., a mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
        circle.classList.add('outline-cursor');
    } else {
        circle.classList.remove('outline-cursor');
    }
}

document.addEventListener('mousemove', updateCursorStyle);
