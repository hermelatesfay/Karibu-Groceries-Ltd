const toastContainer = document.getElementById('toast-container');

// ----------------- Toast Function -----------------
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.classList.add('toast', type, 'show');
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('show');
    toast.remove();
  }, 3000);
}
// Select table body and stats cards
const priceTableBody = document.querySelector("table tbody");
const totalProductsCard = document.querySelector(".stats .card:nth-child(1) h3");
const avgMarginCard = document.querySelector(".stats .card:nth-child(2) h3");
const pendingUpdatesCard = document.querySelector(".stats .card:nth-child(3) h3");

// Load products and update UI
async function loadPriceManagement() {
  try {
    const res = await fetch("http://localhost:3000/dashboard/manager/price-management", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const products = await res.json();

    // Update stats cards
    totalProductsCard.textContent = `${products.length} Items`;

    // Assuming pending updates = products with currentSellingPrice = 0
    const pendingUpdates = products.filter(p => !p.currentSellingPrice || p.currentSellingPrice <= 0);
    pendingUpdatesCard.textContent = `${pendingUpdates.length} Products`;

    // Average margin: since cost price is not available, we can calculate as 0% or skip
    let avgMargin = 0;
    avgMarginCard.textContent = `${avgMargin.toFixed(1)}%`;

    // Clear table body
    priceTableBody.innerHTML = "";

    products.forEach(product => {
      const sellingPrice = product.currentSellingPrice || 0;

      // Determine margin color (since costPrice is not provided, we only show green if price > 0, red if 0)
      let marginClass = "margin-green";
      if (!sellingPrice || sellingPrice <= 0) marginClass = "margin-red";

      // Format price
      const formatCurrency = price =>
        new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(price);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <b>${product.name}</b><br>
          <small>Unit: ${product.unit || "N/A"}</small>
        </td>
        <td class="price">${formatCurrency(0)}</td>
        <td class="price">${formatCurrency(sellingPrice)}</td>
        <td><span class="margin ${marginClass}">${sellingPrice > 0 ? "100%" : "0%"}</span></td>
        <td>${product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "Updating now..."}</td>
        <td style="text-align:right;"><button class="edit-btn" data-id="${product._id}">Edit</button></td>
      `;
      priceTableBody.appendChild(tr);
    });

    attachEditButtons();

  } catch (error) {
    console.error(error);
    showToast("Failed to load products", "error");
  }
}

// Attach click listeners to edit buttons
function attachEditButtons() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      console.log("Edit product:", productId);
      showToast(`Edit product ${productId}`, "info");
    });
  });
}

// Initialize
loadPriceManagement();