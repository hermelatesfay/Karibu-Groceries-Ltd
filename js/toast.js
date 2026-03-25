// Create toast container automatically
const toastContainer = document.createElement("div");
toastContainer.className = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message, type = "success") {

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 3000);
}