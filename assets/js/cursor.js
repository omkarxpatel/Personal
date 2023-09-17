// script.js
const circle = document.getElementById('follower');
const delay = 100; // Adjust this value for the delay (in milliseconds)

document.addEventListener('mousemove', (e) => {
    // Calculate the new position with a delay
    setTimeout(() => {
        const x = e.clientX;
        const y = e.clientY;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
    }, delay);
});
