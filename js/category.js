 document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryType = urlParams.get('type');

            const categoryData = {
                macrame: {
                   title: "Macrame (The Art of Beautiful Knots)",
                   description: "Explore the beauty of knot-tying with cords and threads to create wall hangings, plant hangers, and accessories. Watch the tutorials below!",
                    videos: [
                        { name: "Easy Net Tote Bag Tutorial", url: "https://www.youtube.com/embed/fPPszTTXWGg?si=PWpPjui1LaW1We-O" }, 
                        { name: "Flower Bracelet Tutorial", url:"https://www.youtube.com/embed/sS2BmCzQwbs?si=_a4RX6nrIW7xg_jW"  },  
                        { name: "Wall Hanging Tutorial", url: "https://www.youtube.com/embed/99A-D3ymPEk?si=SqB3c8Gqi69SbQDc"  }
                    ]
                },
                woodart: {
                    title: "Wood Art (The Art of Woodworking)",
                    description: "Discover various artworks made from wood, ranging from carvings, miniature sculptures, to unique home decor. Follow the guides here!",
                    videos: [
                        { name: "Wood Recycling Project", url: "https://www.youtube.com/embed/m-DjPYBfDmQ?si=KDEGeorn8AjcZyQu"  }, 
                        { name: "Geometric Wood Wall Art", url: src="https://www.youtube.com/embed/HL9TOEMUznM?si=rCq-s6w8FRMvIFQO"  },
                        { name: "Carving A house", url:"https://www.youtube.com/embed/08sQ8wxj4YE?si=C10LE2LY_ecjwNXS" }
                    ]
                },
                pottery: {
                   title: "Pottery (The Art of Ceramics)",
                   description: "View collections of handcrafted clay artworks, including vases, bowls, cups, and ceramic sculptures. Start shaping now!",
                    videos: [
                        { name: "Air Dry Clay", url: "https://www.youtube.com/embed/Fz0ASA3OlCE?si=e1ft7HyRS1gUY623" },
                        { name: "Throwing and Turning a Pottery Bowl ", url: "https://www.youtube.com/embed/1Gic5nYiAjM?si=oSF5QHjbwcWAlcGf" },
                        { name: "Handmade Pottery Teapot", url: "https://www.youtube.com/embed/gAzaeA-ifNE?si=n2u8nUAZBNreWJq0" }
                    ]
                },
                papercraft: {
                    title: "Paper Craft (The Art of Paper)",
                    description: "Create wonders from paper, including origami, quilling, greeting cards, and three-dimensional decorations. Learn the techniques!",
                    videos: [
                        { name: "Magnetic Paper Craft", url: "https://www.youtube.com/embed/rn-xNb3jKQM?si=F0doNoit9E1xxwI3" },
                        { name: "Making Keychain From Paper", url: "https://www.youtube.com/embed/2nmncP7sKsM?si=w6QqTgbPnoHNkio5" },
                        { name: "Pop Up Card", url: "https://www.youtube.com/embed/0EAIrokMaVg?si=G3koCa6aWkSOdHkC" }
                    ]
                },
                textile: {
                   title: "Textile Crafts (The Art of Textiles)",
                    description: "Learn how to create beautiful crafts from fabric and yarn, such as embroidery, knitting, patchwork, and weaving. Find your inspiration!",
                    videos: [
                        { name: "Making Patchwork", url: "https://www.youtube.com/embed/_C-0CXwKqNo?si=QHUadloTpdU-3U1L"  },
                        { name: "Punch Needle", url: "https://www.youtube.com/embed/XWHcR_dtn1w?si=4hY1IyaVkXUlE-Mf" },
                        { name: "Rose Bucket with Crochet", url: "https://www.youtube.com/embed/fPOvj-7px94?si=yVFLKYZtRMYHzj5W" }
                    ]
                }
            };

            const displayTitle = document.getElementById('categoryTitle');
            const displayDescription = document.getElementById('categoryDescription');
            const displayContent = document.getElementById('categoryContent');

            if (categoryType && categoryData[categoryType]) {
                const data = categoryData[categoryType];
                displayTitle.textContent = data.title;
                displayDescription.textContent = data.description;

                displayContent.innerHTML = '';

                data.videos.forEach(video => {
                    const videoDiv = document.createElement('div');
                    videoDiv.className = 'video-item';
                    videoDiv.innerHTML = `
                        <h4>${video.name}</h4>
                        <iframe width="560" height="315" 
                                src="${video.url}" 
                                title="${video.name}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" 
                                allowfullscreen>
                        </iframe>
                    `;
                    displayContent.appendChild(videoDiv);
                });
            } else {
                displayTitle.textContent = "Kategori Tidak Ditemukan";
                displayDescription.textContent = "Silakan pilih kategori yang valid dari halaman utama.";
                displayContent.innerHTML = '';
            }
        });