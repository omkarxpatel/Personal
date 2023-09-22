const circle = document.getElementById('follower');
const delay = 100;

function updateCursorStyle(e) {
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
}

document.addEventListener('mousemove', updateCursorStyle);
