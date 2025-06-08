document.addEventListener('DOMContentLoaded', () => {
    const exploreButton = document.getElementById('exploreButton');

    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            console.log('Explore button clicked! Redirecting to home page...');
            
            window.location.href = '../html/home.html';
        });
    } else {
        console.error("Error: Explore button with ID 'exploreButton' not found.");
    }
});
