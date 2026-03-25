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
 const token = localStorage.getItem("token");

// Load Credit Customers Table
document.addEventListener("DOMContentLoaded", loadCreditCustomers);

async function loadCreditCustomers() {
  const tbody = document.querySelector("#creditCustomers tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch("http://localhost:3000/agent/dashboard/credit-sales", {
      headers: { Authorization: "Bearer " + token }
    });
    const creditSales = await res.json();

    creditSales.forEach(sale => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${sale.customerName}</td>
        <td><span class="badge wholesaler">Customer</span></td>
        <td>${sale.location || "-"}</td>
        <td>-</td>
        <td style="color:orange;font-weight:600;">${sale.amountDue}</td>
        <td>
          <button class="action-btn">
            <span class="material-symbols-outlined">more_horiz</span>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error loading credit customers:", error);
  }
}

// Credit Sale Form Submission
document.querySelector("#creditSaleForm").addEventListener("submit", async e => {
  e.preventDefault();

  const customerName = document.querySelector("#creditCustomerName").value;
  const nin = document.querySelector("#creditNIN").value;
  const location = document.querySelector("#creditLocation").value;
  const contact = document.querySelector("#creditContact").value;
  const product = document.querySelector("#creditProductSelect").value;
  const tonnage = Number(document.querySelector("#creditTonnage").value);
  const amountDue = Number(document.querySelector("#creditAmountDue").value);

  try {
    const res = await fetch("http://localhost:3000/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({ customerName, nin, location, contact, product, tonnage, amountDue, saleType: "CreditSale" })
    });

    if (!res.ok) throw new Error("Credit sale failed");
    showToast("Credit sale recorded", "success");

  } catch (error) {
    console.error(error);
    showToast("Error recording credit sale", "error");
  }
});