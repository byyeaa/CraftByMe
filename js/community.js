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
                <p class="post-text">${postText}</p>
            `;

            if (selectedMediaFiles.length > 0) {
                const mediaContainer = document.createElement('div');
                mediaContainer.classList.add('post-media');

                selectedMediaFiles.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (file.type.startsWith('image/')) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.style.width = '100%';
                            img.style.height = '100%';
                            img.style.objectFit = 'contain';
                            img.style.position = 'absolute';
                            img.style.top = '0';
                            img.style.left = '0';
                            mediaContainer.appendChild(img);
                        } else if (file.type.startsWith('video/')) {
                            const video = document.createElement('video');
                            video.src = e.target.result;
                            video.controls = true;
                            video.style.width = '100%';
                            video.style.height = '100%';
                            video.style.objectFit = 'contain';
                            video.style.position = 'absolute';
                            video.style.top = '0';
                            video.style.left = '0';
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

            const postActionsHTML = `
                <div class="post-actions">
                    <button class="like-button"><span class="material-icons">favorite</span> Like (<span class="like-count">0</span>)</button>
                    <button class="comment-toggle-button"><span class="material-icons">comment</span> Comment</button>
                    <button class="bookmark-button"><span class="material-icons">bookmark</span> Bookmark</button>
                </div>
                <div class="comment-section" style="display: none;">
                    <ul class="comment-list"></ul>
                    <div class="comment-input-container">
                        <input type="text" class="comment-input" placeholder="Add a comment...">
                        <button class="submit-comment">Submit</button>
                    </div>
                </div>
            `;
            postCard.insertAdjacentHTML('beforeend', postActionsHTML);

            const h2Element = trendingSection.querySelector('h2');
            if (h2Element && trendingSection.children.length > 1) {
                trendingSection.insertBefore(postCard, trendingSection.children[1]);
            } else {
                trendingSection.appendChild(postCard);
            }

            const newLikeButton = postCard.querySelector(".like-button");
            const newCommentToggleButton = postCard.querySelector(".comment-toggle-button");
            const newBookmarkButton = postCard.querySelector(".bookmark-button");
            const newSubmitCommentButton = postCard.querySelector(".submit-comment");

            newLikeButton.addEventListener("click", () => {
                const countSpan = newLikeButton.querySelector(".like-count");
                let count = parseInt(countSpan.textContent, 10);
                const iconSpan = newLikeButton.querySelector(".material-icons");

                if (newLikeButton.classList.contains("liked")) {
                    countSpan.textContent = count - 1;
                    newLikeButton.classList.remove("liked");
                    if (iconSpan) {
                        iconSpan.style.color = "";
                    }
                } else {
                    countSpan.textContent = count + 1;
                    newLikeButton.classList.add("liked");
                    if (iconSpan) {
                        iconSpan.style.color = "red";
                    }
                }
            });

            newCommentToggleButton.addEventListener("click", () => {
                const commentSection = newCommentToggleButton.closest('.post-card').querySelector(".comment-section");
                commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
            });

            newSubmitCommentButton.addEventListener("click", () => {
                const commentInput = newSubmitCommentButton.parentElement.querySelector(".comment-input");
                const commentList = newSubmitCommentButton.closest('.comment-section').querySelector(".comment-list");

                if (commentInput.value.trim()) {
                    const li = document.createElement("li");
                    li.textContent = commentInput.value;
                    commentList.appendChild(li);
                    commentInput.value = "";
                }
            });

            newBookmarkButton.addEventListener("click", () => {
                newBookmarkButton.classList.toggle("bookmarked");
                const iconSpan = newBookmarkButton.querySelector(".material-icons");

                if (newBookmarkButton.classList.contains("bookmarked")) {
                    iconSpan.textContent = "bookmark_added";
                    newBookmarkButton.innerHTML = `<span class="material-icons">bookmark_added</span> Bookmarked`;
                } else {
                    iconSpan.textContent = "bookmark";
                    newBookmarkButton.innerHTML = `<span class="material-icons">bookmark</span> Bookmark`;
                }
            });

            whatHappeningInput.value = '';
            selectedMediaFiles = [];
            updateMediaPreview();
        });
    }

    const likeButtons = document.querySelectorAll(".like-button");
    const commentToggles = document.querySelectorAll(".comment-toggle-button");
    const bookmarkButtons = document.querySelectorAll(".bookmark-button");

    likeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const countSpan = btn.querySelector(".like-count");
            let count = parseInt(countSpan.textContent, 10);
            const iconSpan = btn.querySelector(".material-icons");

            if (btn.classList.contains("liked")) {
                countSpan.textContent = count - 1;
                btn.classList.remove("liked");
                if (iconSpan) {
                    iconSpan.style.color = "";
                }
            } else {
                countSpan.textContent = count + 1;
                btn.classList.add("liked");
                if (iconSpan) {
                    iconSpan.style.color = "red";
                }
            }
        });
    });

    commentToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const commentSection = toggle.closest('.post-card').querySelector(".comment-section");
            commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
        });
    });

    document.querySelectorAll(".submit-comment").forEach((btn) => {
        btn.addEventListener("click", () => {
            const commentInput = btn.parentElement.querySelector(".comment-input");
            const commentList = btn.closest('.comment-section').querySelector(".comment-list");

            if (commentInput.value.trim()) {
                const li = document.createElement("li");
                li.textContent = commentInput.value;
                commentList.appendChild(li);
                commentInput.value = "";
            }
        });
    });

    bookmarkButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("bookmarked");
            const iconSpan = btn.querySelector(".material-icons");

            if (btn.classList.contains("bookmarked")) {
                iconSpan.textContent = "bookmark_added";
                btn.innerHTML = `<span class="material-icons">bookmark_added</span> Bookmarked`;
            } else {
                iconSpan.textContent = "bookmark";
                btn.innerHTML = `<span class="material-icons">bookmark</span> Bookmark`;
            }
        });
    });
    updateMediaPreview();
});