document.addEventListener('DOMContentLoaded', () => {
    const triggerImageInput = document.getElementById('triggerImageInput');
    const triggerVideoInput = document.getElementById('triggerVideoInput');
    const triggerDocumentInput = document.getElementById('triggerDocumentInput');
    const imageInput = document.getElementById('imageInput');
    const videoInput = document.getElementById('videoInput');
    const documentInput = document.getElementById('documentInput');
    const mediaPreviewContainer = document.getElementById('mediaPreviewContainer');
    const uploadButton = document.querySelector('.upload-button');
    const whatHappeningInput = document.querySelector('.what-happening-input');

    let selectedMediaFiles = [];

    function updateMediaPreview() {
        mediaPreviewContainer.innerHTML = '';

        if (selectedMediaFiles.length === 0) {
            mediaPreviewContainer.style.display = 'none';
            return;
        }

        mediaPreviewContainer.style.display = 'flex';

        selectedMediaFiles.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.classList.add('media-preview-item');

            const removeButton = document.createElement('span');
            removeButton.classList.add('remove-media');
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                removeMediaFile(index);
            });
            previewItem.appendChild(removeButton);

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const mediaElement = document.createElement('img');
                    mediaElement.src = e.target.result;
                    previewItem.appendChild(mediaElement);
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const mediaElement = document.createElement('video');
                    mediaElement.src = e.target.result;
                    mediaElement.controls = false;
                    mediaElement.autoplay = false;
                    mediaElement.muted = true;
                    mediaElement.loop = true;
                    mediaElement.preload = 'metadata';
                    previewItem.appendChild(mediaElement);
                    previewItem.addEventListener('mouseenter', () => mediaElement.play());
                    previewItem.addEventListener('mouseleave', () => {
                        mediaElement.pause();
                        mediaElement.currentTime = 0;
                    });
                };
                reader.readAsDataURL(file);
            } else {
                const fileInfo = document.createElement('div');
                fileInfo.classList.add('file-info');

                let fileIconClass = 'insert_drive_file';
                if (file.type.includes('pdf')) {
                    fileIconClass = 'picture_as_pdf';
                } else if (file.name.includes('.doc') || file.name.includes('.docx')) {
                    fileIconClass = 'description';
                } else if (file.name.includes('.xls') || file.name.includes('.xlsx')) {
                    fileIconClass = 'insert_chart';
                } else if (file.name.includes('.ppt') || file.name.includes('.pptx')) {
                    fileIconClass = 'slideshow';
                } else if (file.type.includes('text')) {
                    fileIconClass = 'text_snippet';
                } else if (file.type.includes('zip') || file.name.includes('.zip') || file.name.includes('.rar')) {
                    fileIconClass = 'folder_zip';
                }

                const icon = document.createElement('span');
                icon.classList.add('material-icons', 'file-icon');
                icon.textContent = fileIconClass;
                fileInfo.appendChild(icon);

                const fileName = document.createElement('p');
                fileName.textContent = file.name;
                fileInfo.appendChild(fileName);

                previewItem.appendChild(fileInfo);
            }

            mediaPreviewContainer.appendChild(previewItem);
        });
    }

    function removeMediaFile(indexToRemove) {
        selectedMediaFiles.splice(indexToRemove, 1);
        updateMediaPreview();
    }

    triggerImageInput.addEventListener('click', () => {
        imageInput.click();
    });

    triggerVideoInput.addEventListener('click', () => {
        videoInput.click();
    });

    triggerDocumentInput.addEventListener('click', () => {
        documentInput.click();
    });

    function handleFileSelection(event) {
        const files = event.target.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                selectedMediaFiles.push(files[i]);
            }
            updateMediaPreview();
        }
        event.target.value = '';
    }

    imageInput.addEventListener('change', handleFileSelection);
    videoInput.addEventListener('change', handleFileSelection);
    documentInput.addEventListener('change', handleFileSelection);

    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            const postText = whatHappeningInput.value;

            if (postText.trim() === '' && selectedMediaFiles.length === 0) {
                alert('Please write something or select media to upload!');
                return;
            }

            const trendingSection = document.querySelector('.trending-section');
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');

            postCard.innerHTML = `
                <div class="post-header">
                    <img src="../assets/gudetama.jpg" class="user-avatar-small-placeholder">
                    <div class="post-meta">
                        <div class="post-username">craffyyyt</div>
                        <div class="post-time">just now</div>
                    </div>
                </div>
            `;

            const postTextElement = document.createElement('p');
            postTextElement.classList.add('post-text');
            postTextElement.textContent = postText;
            postCard.appendChild(postTextElement);

            if (selectedMediaFiles.length > 0) {
                const mediaContainer = document.createElement('div');
                mediaContainer.classList.add('post-media');

                selectedMediaFiles.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (file.type.startsWith('image/')) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.style.maxWidth = '100%';
                            mediaContainer.appendChild(img);
                        } else if (file.type.startsWith('video/')) {
                            const video = document.createElement('video');
                            video.src = e.target.result;
                            video.controls = true;
                            video.style.maxWidth = '100%';
                            mediaContainer.appendChild(video);
                        } else {
                            const fileInfo = document.createElement('div');
                            fileInfo.innerHTML = `<p>${file.name}</p>`;
                            fileInfo.style.padding = '8px';
                            fileInfo.style.border = '1px solid #ccc';
                            mediaContainer.appendChild(fileInfo);
                        }
                    };
                    reader.readAsDataURL(file);
                });

                postCard.appendChild(mediaContainer);
            }

            trendingSection.insertBefore(postCard, trendingSection.children[1]);

            whatHappeningInput.value = '';
            selectedMediaFiles = [];
            updateMediaPreview();
        });
    }

    updateMediaPreview();
});
