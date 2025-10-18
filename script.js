// Update time display
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    const currentTime = Date.now();
    timeElement.textContent = currentTime;
    timeElement.setAttribute('datetime', new Date(currentTime).toISOString());
}

// Initialize time and update every second
updateTime();
setInterval(updateTime, 1000);

// Handle avatar upload
const avatarUpload = document.getElementById('avatarUpload');
const avatarImage = document.getElementById('avatarImage');

avatarUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            avatarImage.src = event.target.result;
            avatarImage.alt = `Profile picture - ${file.name}`;
        };
        reader.readAsDataURL(file);
    }
});

// Keyboard accessibility for upload
avatarUpload.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
});