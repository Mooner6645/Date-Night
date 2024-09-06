onload = () =>{
    document.body.classList.remove("container");
};

const moonBtn = document.querySelector('.moon-btn');
const moonMessage = document.querySelector('.moon-message');

moonBtn.addEventListener('click', () => {
    // Toggle the 'expanded' class on each click
    moonBtn.classList.toggle('expanded');

    // Toggle the opacity based on the 'expanded' class
    moonMessage.style.opacity = moonBtn.classList.contains('expanded') ? '1' : '0';

    // Add a delay before showing the message to ensure the animation starts first
    setTimeout(() => {
        // Show or hide the message based on the 'expanded' class
        moonMessage.style.display = moonBtn.classList.contains('expanded') ? 'block' : 'none';
    }, 500);

    // Add a delay before changing the z-index to ensure the message is visible during animation
    setTimeout(() => {
        // Change the z-index based on the 'expanded' class
        moonMessage.style.zIndex = moonBtn.classList.contains('expanded') ? '4' : '0';
    }, 2000);
});


const firefliesContainer = document.getElementById('fireflies-container');

for (let i = 0; i < 10; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.top = Math.random() * window.innerHeight + 'px';
    firefly.style.left = Math.random() * window.innerWidth + 'px';
    firefliesContainer.appendChild(firefly);
}