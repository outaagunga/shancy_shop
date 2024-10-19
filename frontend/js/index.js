async function fetchProducts(apiUrl, options = {}) {
  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createProductHTML(product, options = {}) {
  const productDiv = document.createElement("div");
  productDiv.className = options.className || "product";
  productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h5>${product.title}</h5>
        <p>$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="btn btn-primary" onclick="${
          options.addToCartFunction
        }('${product.id}')">Add to Cart</button>
    `;
  return productDiv;
}

function displayProducts(products, container, options = {}) {
  container.innerHTML = ""; // Clear the container
  products.forEach((product) => {
    container.appendChild(createProductHTML(product, options));
  });
}

// Sample addToCart function
function addToCart(productId) {
  console.log(`Product with ID ${productId} added to cart!`);
}

window.onload = async () => {
  const products = await fetchProducts("https://fakestoreapi.com/products");
  const container = document.getElementById("product-container");
  if (products) {
    displayProducts(products, container, { addToCartFunction: "addToCart" });
  }
};
