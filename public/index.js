const features = [
  {
    name: "Google-Search",
    method: "GET",
    description: "Search/google",
    category: "Search",
    endpoint: "../api/google.js",
    query: "text=Kylian%20Mbappe"
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
  }
];

const featureContainer = document.getElementById("features");

function createCategorySection(categoryName) {
  const categorySection = document.createElement("div");
  categorySection.classList.add("category-section");
  categorySection.innerHTML = `<h2>${categoryName}</h2><div class="category-cards"></div>`;
  return categorySection;
}

function redirectToEndpoint(endpoint, query) {
  const fullUrl = `${endpoint}?${query}`;
  location.href = fullUrl;
}

const categories = [...new Set(features.map((feature) => feature.category))];
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