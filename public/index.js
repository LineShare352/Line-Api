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
    "name": "Luminai",
    "method": "GET",
    "description": "AI/Lumin",
    "category": "AI Tools",
    "endpoint": "/api/ai/luminai",
    "query": "text=Hai%20kamu"
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
  "query": "text=mrbeast"
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
  "name": "Indonesia",
  "method": "GET",
  "description": "Random/Indonesia",
  "category": "Random",
  "endpoint": "/api/random/indonesia",
  "query": null
  },
  {
  "name": "China",
  "method": "GET",
  "description": "Random/China",
  "category": "Random",
  "endpoint": "/api/random/china",
  "query": null
  }, 
  {
  "name": "Japan",
  "method": "GET",
  "description": "Random/Japan",
  "category": "Random",
  "endpoint": "/api/random/japan",
  "query": null
  },
  {
  "name": "Korea",
  "method": "GET",
  "description": "Random/Korea",
  "category": "Random",
  "endpoint": "/api/random/korea",
  "query": null
  }, 
  {
  "name": "Thailand",
  "method": "GET",
  "description": "Random/Thailand",
  "category": "Random",
  "endpoint": "/api/random/thailand",
  "query": null
  }, 
  {
  "name": "Vietnam",
  "method": "GET",
  "description": "Random/Vietnam",
  "category": "Random",
  "endpoint": "/api/random/vietnam",
  "query": null
  }, 
  {
  "name": "To Raw",
  "method": "GET",
  "description": "Tools/To Raw",
  "category": "Tools",
  "endpoint": "/api/tools/raw",
  "query": "url=https://github.com/LineShare352/Line-Api/blob/main/public/index.html"
  }, 
  {
  "name": "To Base64",
  "method": "GET",
  "description": "Tools/To Base64",
  "category": "Tools",
  "endpoint": "/api/tools/base64",
  "query": "text=Line%20Sanjaya"
  }, 
  {
  "name": "To Utf8",
  "method": "GET",
  "description": "Tools/To Utf8",
  "category": "Tools",
  "endpoint": "/api/tools/utf8",
  "query": "text=hai"
  },
  {
  "name": "To Ori",
  "method": "GET",
  "description": "Tools/To Ori",
  "category": "Tools",
  "endpoint": "/api/tools/ori",
  "query": "url=https://raw.githubusercontent.com/LineShare352/Line-Api/main/public/index.html"
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
