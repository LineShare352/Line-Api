const features = [
  {
    name: "Google-Search",
    method: "GET",
    description: "Search/google",
    category: "Search",
    endpoint: "../api/google.js",
    query: "text=Oline%20Jkt48"
  },
  {
    name: "NPM Search",
    method: "GET",
    description: "Search/npm",
    category: "Search",
    endpoint: "../api/npm.js",
    query: "text=axios"
  },
  {
    name: "Wikimedia",
    method: "GET",
    description: "Search/wikimedia",
    category: "Search",
    endpoint: "../api/wikimedia.js",
    query: "text=Harimau"
  }, 
  {
    name: "Pinterest",
    method: "GET",
    description: "Search/pinterest",
    category: "Search",
    endpoint: "../api/pinterest.js",
    query: "text=Oline%20Jkt48"
  },
  {
    name: "Brat",
    method: "GET",
    description: "Maker/brat",
    category: "Maker",
    endpoint: "../api/brat.js",
    query: "text=Hello%20Wak"
  },
  {
    name: "Tweet",
    method: "POST", // Ubah menjadi POST
    description: "Generate a tweet as an image",
    category: "Maker",
    endpoint: "../api/tweet.js",
    payload: { // Contoh payload JSON
        name: "John Doe",
        username: "@johndoe",
        tweetText: "Hello Wak!",
        profile: "https://cdn.arifzyn.tech/f/886z70cc.jpg", // URL profil
        image: "https://cdn.arifzyn.tech/f/886z70cc.jpg", // Kosongkan jika tidak ada gambar tambahan
        theme: "dark",
        retweets: 100,
        quotes: 10,
        likes: 500,
        client: "Twitter for iPhone"
    }
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
