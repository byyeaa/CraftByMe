document.addEventListener('DOMContentLoaded', function() {
    const profilePicInput = document.getElementById('profile-pic-input');
    const profilePic = document.getElementById('profile-pic');
    const profilePicEditIcon = document.querySelector('.edit-icon');

    if (profilePicInput && profilePic && profilePicEditIcon) {
        if (!profilePic.src || profilePic.src === window.location.href) {
            profilePic.src = '../assets/gudetama.jpg';
        }

        profilePicEditIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            profilePicInput.click();
        });

        profilePicInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePic.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const profileSection = document.querySelector('.profile-section');
    const bannerEditIcon = document.querySelector('.banner-edit-icon');

    if (profileSection && bannerEditIcon) {
        const bannerBgInput = document.createElement('input');
        bannerBgInput.type = 'file';
        bannerBgInput.accept = 'image/*';
        bannerBgInput.style.display = 'none';
        document.body.appendChild(bannerBgInput);

        bannerEditIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            bannerBgInput.click();
        });

        bannerBgInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileSection.style.backgroundImage = `url('${e.target.result}')`;
                    profileSection.style.backgroundSize = 'cover';
                    profileSection.style.backgroundPosition = 'center';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const handleFollowButtonClick = (button) => {
        if (button.classList.contains('followed')) {
            button.textContent = 'Follow';
            button.classList.remove('followed');
        } else {
            button.textContent = 'Following';
            button.classList.add('followed');
        }
    };

    const followButtons = document.querySelectorAll('.follow-button');
    followButtons.forEach(button => {
        button.addEventListener('click', () => handleFollowButtonClick(button));
    });
});