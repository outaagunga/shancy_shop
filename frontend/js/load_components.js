// Function to load HTML components
async function loadComponent(url, elementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to load component: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = data;
    } else {
      console.warn(`Element with ID "${elementId}" not found.`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to initialize component loading
function initializeComponents(components) {
  components.forEach(({ url, elementId }) => {
    loadComponent(url, elementId);
  });
}

// Execute on window load
window.onload = function () {
  const components = [
    // { url: "header.html", elementId: "header" },
    {
      url: "shancy_ecommerce/components/products.html",
      elementId: "products_listing",
    },
    // { url: "footer.html", elementId: "footer" },
  ];

  initializeComponents(components);
};
