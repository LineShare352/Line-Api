const features = [
  {
    "name": "Google-Search",
    "method": "GET",
    "description": "Search/google",
    "category": "Search",
    "endpoint": "/api/search/google",
    "query": "text=Oline%20Jkt48"
  },
  {
    "name": "NPM Search",
    "method": "GET",
    "description": "Search/npm",
    "category": "Search",
    "endpoint": "/api/search/npm",
    "query": "text=axios"
  },
  {
    "name": "Wikimedia",
    "method": "GET",
    "description": "Search/wikimedia",
    "category": "Search",
    "endpoint": "/api/search/wikimedia",
    "query": "text=Harimau"
  }, 
  {
    "name": "Pinterest",
    "method": "GET",
    "description": "Search/pinterest",
    "category": "Search",
    "endpoint": "/api/search/pinterest",
    "query": "text=Oline%20Jkt48"
  },
  {
    "name": "Kbbi",
    "method": "GET",
    "description": "Search/Kbbi",
    "category": "Search",
    "endpoint": "/api/search/kbbi",
    "query": "text=asu"
  },
  {
    "name": "Playstore",
    "method": "GET",
    "description": "Search/Playstore",
    "category": "Search",
    "endpoint": "/api/search/playstore",
    "query": "text=free%20fire"
  },
  {
    "name": "Soundcloud",
    "method": "GET",
    "description": "Search/Soundcloud",
    "category": "Search",
    "endpoint": "/api/search/soundcloud",
    "query": "text=diary%20depresiku"
  },
  {
    "name": "Detail Teater",
    "method": "GET",
    "description": "Search/Detail Teater",
    "category": "Search",
    "endpoint": "/api/search/detailteater",
    "query": "url=https://www.teater.co/film/moana-2-2024"
  },
  {
    "name": "Berita Hoax",
    "method": "GET",
    "description": "Search/Berita Hoax",
    "category": "Search",
    "endpoint": "/api/search/hoax",
    "query": "category=covid"
  },
  {
    "name": "Food Search",
    "method": "GET",
    "description": "Search/Food",
    "category": "Search",
    "endpoint": "/api/search/food",
    "query": "makanan=ayam"
  },
  {
    "name": "Apple Search",
    "method": "GET",
    "description": "Search/Apple",
    "category": "Search",
    "endpoint": "/api/search/apple",
    "query": "query=macbook"
  },
  {
    "name": "Fitgirl Search",
    "method": "GET",
    "description": "Search/Fitgirl",
    "category": "Search",
    "endpoint": "/api/search/fitgirl",
    "query": "page=1"
  },
  {
    "name": "Antara News",
    "method": "GET",
    "description": "Search/Antara News",
    "category": "Search",
    "endpoint": "/api/search/antara",
    "query": "query=politik"
  },
  {
    "name": "Imdb Search",
    "method": "GET",
    "description": "Search/Imdb",
    "category": "Search",
    "endpoint": "/api/search/imdb",
    "query": "query=inception"
  },
  {
    "name": "Weather Search",
    "method": "GET",
    "description": "Search/Weather",
    "category": "Search",
    "endpoint": "/api/search/weather",
    "query": "city=jakarta"
  },
  {
    "name": "Crypto Search",
    "method": "GET",
    "description": "Search/Crypto",
    "category": "Search",
    "endpoint": "/api/search/crypto", 
    "query": null
  },
  {
  "name": "Otakudesu-Search",
  "method": "GET",
  "description": "Anime/Otakudesu",
  "category": "Anime",
  "endpoint": "/api/anime/otakudesu",
  "query": "s=naruto"
  },
  {
  "name": "Animebatch-Search",
  "method": "GET",
  "description": "Anime/Animebatch",
  "category": "Anime",
  "endpoint": "/api/anime/batch",
  "query": "text=naruto"
  },
  {
  "name": "Komiku-Search",
  "method": "GET",
  "description": "Anime/Komiku",
  "category": "Anime",
  "endpoint": "/api/anime/komiku",
  "query": "query=the-max-leveled-hero-will-return"
  },
  {
  "name": "Manhua-Search",
  "method": "GET",
  "description": "Anime/Manhua",
  "category": "Anime",
  "endpoint": "/api/anime/manhua",
  "query": "name=Solo Leveling"
  },
  {
  "name": "Myanime-Search",
  "method": "GET",
  "description": "Anime/Myanime",
  "category": "Anime",
  "endpoint": "/api/anime/myanime",
  "query": "query=naruto"
  },
  {
  "name": "Brat-Sticker",
  "method": "GET",
  "description": "Maker/Brat-Sticker.",
  "category": "Maker",
  "endpoint": "/api/maker/brat",
  "query": "text=Hello%20Wak"
  },
  {
    "name": "Yt-Comment",
    "method": "GET",
    "description": "Maker/yt-comment",
    "category": "Maker",
    "endpoint": "/api/maker/ytcomment",
    "query": "text=halo&avatar=https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg&username=Line", 
  }, 
  {
    "name": "Cimg Maker",
    "method": "GET",
    "description": "Maker/Cimg",
    "category": "Maker",
    "endpoint": "/api/maker/cimg",
    "query": "prompt=Women without clothes",
  }, 
  {
    "name": "Luminai",
    "method": "GET",
    "description": "AI/Lumin",
    "category": "AI Tools",
    "endpoint": "/api/ai/luminai",
    "query": "text=Hai%20kamu"
  }, 
  {
    "name": "Open Ai",
    "method": "GET",
    "description": "AI/Open Ai",
    "category": "AI Tools",
    "endpoint": "/api/ai/openai",
    "query": "text=apa%20itu%20asi"
  }, 
  {
    "name": "Blackbox",
    "method": "GET",
    "description": "AI/Blackbox",
    "category": "AI Tools",
    "endpoint": "/api/ai/blackbox",
    "query": "text=Hai%20kamu"
  },
  {
    "name": "Simi",
    "method": "GET",
    "description": "AI/Simi",
    "category": "AI Tools",
    "endpoint": "/api/ai/simi",
    "query": "text=Hai%20kamu"
  }, 
  {
    "name": "Gemini",
    "method": "GET",
    "description": "AI/Gemini",
    "category": "AI Tools",
    "endpoint": "/api/ai/gemini",
    "query": "text=Hai%20kamu"
  }, 
  {
    "name": "Moshi Ai",
    "method": "GET",
    "description": "AI/Moshi Ai",
    "category": "AI Tools",
    "endpoint": "/api/ai/moshiai",
    "query": "text=Hai%20kamu"
  }, 
  {
    "name": "Muslim Ai",
    "method": "GET",
    "description": "AI/Muslim Ai",
    "category": "AI Tools",
    "endpoint": "/api/ai/muslimai",
    "query": "text=Hai"
  }, 
  {
  "name": "Tebak JKT",
  "method": "GET",
  "description": "Games/Tebak JKT48",
  "category": "Games",
  "endpoint": "/api/games/tebakjkt",
  "query": null
  }, 
  {
  "name": "Tebak Hewan",
  "method": "GET",
  "description": "Games/Tebak Hewan",
  "category": "Games",
  "endpoint": "/api/games/tebakhewan",
  "query": null
  }, 
  {
  "name": "Tebak Bendera",
  "method": "GET",
  "description": "Games/Tebak Bendera",
  "category": "Games",
  "endpoint": "/api/games/tebakbendera",
  "query": null
  }, 
  {
  "name": "Tebak Gambar",
  "method": "GET",
  "description": "Games/Tebak Gambar",
  "category": "Games",
  "endpoint": "/api/games/tebakgambar",
  "query": null
  }, 
  {
  "name": "Tebak ML",
  "method": "GET",
  "description": "Games/Tebak ML",
  "category": "Games",
  "endpoint": "/api/games/tebakml",
  "query": null
  },
  {
  "name": "Tebak Kabupaten",
  "method": "GET",
  "description": "Games/Kabupaten",
  "category": "Games",
  "endpoint": "/api/games/tebakkabupaten",
  "query": null
  },
  {
  "name": "Tebak Lagu",
  "method": "GET",
  "description": "Games/Tebak Lagu",
  "category": "Games",
  "endpoint": "/api/games/tebaklagu",
  "query": null
  },
  {
  "name": "Tebak Kalimat",
  "method": "GET",
  "description": "Games/Tebak Kalimat",
  "category": "Games",
  "endpoint": "/api/games/tebakkalimat",
  "query": null
  }, 
  {
  "name": "Tiktok",
  "method": "GET",
  "description": "Stalk/Tiktok",
  "category": "Stalk",
  "endpoint": "/api/stalk/tiktok",
  "query": "username=mrbeast"
  },  
  {
  "name": "Jagokata",
  "method": "GET",
  "description": "Fun/Jagokata",
  "category": "Fun",
  "endpoint": "/api/fun/jagokata",
  "query": "text=kesuksesan"
  },
  {
  "name": "Instagram",
  "method": "GET",
  "description": "Download/Instagram",
  "category": "Download",
  "endpoint": "/api/download/instagram",
  "query": "url=https://www.instagram.com/p/DCQhOuXTRvE/?img_index=1."
  },
  {
  "name": "Facebook",
  "method": "GET",
  "description": "Download/Facebook",
  "category": "Download",
  "endpoint": "/api/download/facebook",
  "query": "url=https://www.facebook.com/share/r/12BFZAtjpS8/?mibextid=qDwCgo"
  },
  {
  "name": "Tiktok",
  "method": "GET",
  "description": "Download/Tiktok",
  "category": "Download",
  "endpoint": "/api/download/tiktok",
  "query": "url=https://vt.tiktok.com/ZSjbVKJpe/"
  }, 
  {
  "name": "Spotify",
  "method": "GET",
  "description": "Download/Spotify",
  "category": "Download",
  "endpoint": "/api/download/spotify",
  "query": "url=https://open.spotify.com/album/3gUZpvR4h9ErseH3AzaHJL?si=Xno8zRVbQ56PvjdHebCOQA"
  },
  {
  "name": "Soundcloud",
  "method": "GET",
  "description": "Download/Soundcloud",
  "category": "Download",
  "endpoint": "/api/download/soundcloud",
  "query": "url=https://soundcloud.com/user593948131/last-child-diary-depresiku"
  },
  {
  "name": "Google Drive",
  "method": "GET",
  "description": "Download/Google Drive",
  "category": "Download",
  "endpoint": "/api/download/gdrive",
  "query": "url="
  },
  {
  "name": "Capcut",
  "method": "GET",
  "description": "Download/Capcut",
  "category": "Download",
  "endpoint": "/api/download/capcut",
  "query": "url=https://www.capcut.com/t/Zs8Sw9wsE/ aesthetic"
  },
  {
  "name": "Terabox",
  "method": "GET",
  "description": "Download/Terabox",
  "category": "Download",
  "endpoint": "/api/download/terabox",
  "query": "url=https://terabox.com/s/1A6XAXNBdHuLneJ51dNNy0g"
  },
  {
  "name": "Ytdlv2",
  "method": "GET",
  "description": "Download/Ytdlv2",
  "category": "Download",
  "endpoint": "/api/download/ytdlv2",
  "query": "url=https://youtu.be/VtRUL3XyfZo?si=mYXU5iPXwcbZqXea&videoQuality=5&audioQuality=3"
  },
  {
  "name": "Cecan Indonesia",
  "method": "GET",
  "description": "Random/Cecan Indonesia",
  "category": "Random",
  "endpoint": "/api/random/indonesia",
  "query": null
  },
  {
  "name": "Cecan China",
  "method": "GET",
  "description": "Random/Cecan China",
  "category": "Random",
  "endpoint": "/api/random/china",
  "query": null
  }, 
  {
  "name": "Cecan Japan",
  "method": "GET",
  "description": "Random/Cecan Japan",
  "category": "Random",
  "endpoint": "/api/random/japan",
  "query": null
  },
  {
  "name": "Cecan Korea",
  "method": "GET",
  "description": "Random/Cecan Korea",
  "category": "Random",
  "endpoint": "/api/random/korea",
  "query": null
  }, 
  {
  "name": "Cecan Thailand",
  "method": "GET",
  "description": "Random/Cecan Thailand",
  "category": "Random",
  "endpoint": "/api/random/thailand",
  "query": null
  }, 
  {
  "name": "Cecan Vietnam",
  "method": "GET",
  "description": "Random/Cecan Vietnam",
  "category": "Random",
  "endpoint": "/api/random/vietnam",
  "query": null
  }, 
  {
  "name": "Asupan Random",
  "method": "GET",
  "description": "Random/Asupan",
  "category": "Random",
  "endpoint": "/api/random/asupan",
  "query": null
  },
  {
  "name": "Quotes Random",
  "method": "GET",
  "description": "Random/Quotes",
  "category": "Games",
  "endpoint": "/api/random/quotes",
  "query": null
  },
  {
  "name": "Jokes Random",
  "method": "GET",
  "description": "Random/Jokes",
  "category": "Games",
  "endpoint": "/api/random/jokes",
  "query": null
  },
  {
  "name": "Meme Random",
  "method": "GET",
  "description": "Random/Meme",
  "category": "Games",
  "endpoint": "/api/random/meme",
  "query": null
  },
  {
  "name": "Toghraw",
  "method": "GET",
  "description": "Tools/Toghraw",
  "category": "Tools",
  "endpoint": "/api/tools/raw",
  "query": "url=https://github.com/LineShare352/Line-Api/blob/main/public/index.html"
  }, 
  {
  "name": "ToBase64",
  "method": "GET",
  "description": "Tools/ToBase64",
  "category": "Tools",
  "endpoint": "/api/tools/base64",
  "query": "text=Line%20Sanjaya"
  }, 
  {
  "name": "ToUtf8",
  "method": "GET",
  "description": "Tools/To Utf8",
  "category": "Tools",
  "endpoint": "/api/tools/utf8",
  "query": "text=hai"
  }, 
  {
  "name": "Toghori",
  "method": "GET",
  "description": "Tools/Toghori",
  "category": "Tools",
  "endpoint": "/api/tools/ori",
  "query": "url=https://raw.githubusercontent.com/LineShare352/Line-Api/main/public/index.html"
  }, 
  {
  "name": "Cek IP",
  "method": "GET",
  "description": "Tools/Cek IP",
  "category": "Tools",
  "endpoint": "/api/tools/cekip",
  "query": "ip=8.8.8.8"
  }
];

const featureContainer = document.getElementById("features");

/**
 * Function to create a category section
 * @param {string} categoryName - Name of the category
 * @returns {HTMLElement} - Category section element
 */
function createCategorySection(categoryName) {
  const categorySection = document.createElement("div");
  categorySection.classList.add("category-section");
  categorySection.innerHTML = `<h2>${categoryName}</h2><div class="category-cards"></div>`;
  return categorySection;
}

/**
 * Redirect user to the API endpoint with query parameters
 * @param {string} endpoint - API endpoint
 * @param {string} query - Query parameters
 */
function redirectToEndpoint(endpoint, query) {
  const fullUrl = `${endpoint}?${query}`;
  location.href = fullUrl;
}

// Generate unique categories
const categories = [...new Set(features.map((feature) => feature.category))];

// Create category sections and populate with cards
categories.forEach((category) => {
  const categorySection = createCategorySection(category);
  const categoryCards = categorySection.querySelector(".category-cards");

  features
    .filter((feature) => feature.category === category)
    .forEach((feature) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${feature.name}</h3>
        <p>${feature.description}</p>
        <button onclick="redirectToEndpoint('${feature.endpoint}', '${feature.query}')">
          ${feature.method}
        </button>
      `;
      categoryCards.appendChild(card);
    });

  featureContainer.appendChild(categorySection);
});

// Add functionality for the Back to Top button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
