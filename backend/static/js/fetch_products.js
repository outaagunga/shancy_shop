// Function to fetch products from the given API URL
async function fetchProducts(apiUrl, options = {}) {
  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// Function to generate HTML for a single product
function createProductHTML(product, options = {}) {
  const productDiv = document.createElement("div");
  productDiv.className = options.className || "product";
  productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h5>${product.title}</h5>
      <p>$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button class="btn btn-primary" onclick="${options.addToCartFunction}('${
    product.id
  }')">Add to Cart</button>
  `;
  return productDiv;
}

// Function to display products in a given container
function displayProducts(products, container, options = {}) {
  container.innerHTML = ""; // Clear the container
  products.forEach((product) => {
    container.appendChild(createProductHTML(product, options));
  });
}

// Call the fetchProducts function and display the results when the page loads
window.onload = async () => {
  const products = await fetchProducts("https://fakestoreapi.com/products");
  const container = document.getElementById("product-container");
  if (products) {
    displayProducts(products, container);
  }
};
