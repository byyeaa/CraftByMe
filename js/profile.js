document.addEventListener('DOMContentLoaded', function() {
    // --- Profile Picture Logic ---
    const profilePicInput = document.getElementById('profile-pic-input');
    const profilePic = document.getElementById('profile-pic');
    const profilePicEditIcon = document.querySelector('.edit-icon'); // Ubah selector ini

    if (profilePicInput && profilePic && profilePicEditIcon) {
        profilePicEditIcon.addEventListener('click', function(e) {
            e.stopPropagation(); // Pastikan ini mencegah event menyebar ke banner-edit-icon atau profile-section
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

    // --- Banner Background Logic ---
    const profileSection = document.querySelector('.profile-section');
    const bannerEditIcon = document.querySelector('.banner-edit-icon'); // Selector baru untuk ikon banner

    if (profileSection && bannerEditIcon) { // Pastikan ikon banner ada
        const bannerBgInput = document.createElement('input');
        bannerBgInput.type = 'file';
        bannerBgInput.accept = 'image/*';
        bannerBgInput.style.display = 'none';
        document.body.appendChild(bannerBgInput);

        // Ubah trigger untuk banner dari klik profileSection menjadi klik bannerEditIcon
        bannerEditIcon.addEventListener('click', function(e) { // Tambahkan listener ke ikon banner
            e.stopPropagation(); // Penting: Pastikan ini mencegah klik menyebar ke profile-section itu sendiri
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

        // Hapus atau modifikasi bagian ini jika tidak lagi diperlukan:
        // profileSection.addEventListener('click', function(e) {
        //     const isClickOnProfilePicArea = profilePic && profilePicEditIcon &&
        //         (profilePic.contains(e.target) || profilePicEditIcon.contains(e.target));
        //     if (!isClickOnProfilePicArea) {
        //         bannerBgInput.click();
        //     }
        // });
        // Karena sekarang kita punya ikon khusus, logika di atas bisa dihapus
        // atau disederhanakan jika ada area lain di profile-section yang boleh diklik.
    }
});