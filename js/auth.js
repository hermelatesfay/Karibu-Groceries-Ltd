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
// // ---------------- JWT Decode ----------------
// function parseJwt(token) {
//   try {
//     const base64Payload = token.split('.')[1];
//     const decodedPayload = atob(base64Payload);
//     return JSON.parse(decodedPayload);
//   } catch (error) {
//     return error;
//   }
// }

// // ---------------- Check Login ----------------
// function requireAuth(allowedRoles = []) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     redirectToLogin();
//     return;
//   }

//   const user = parseJwt(token);

//   if (!user) {
//     redirectToLogin();
//     return;
//   }

//   // Check token expiration
//   const currentTime = Date.now() / 1000;
//   if (user.exp && user.exp < currentTime) {
//     localStorage.removeItem("token");
//     redirectToLogin();
//     return;
//   }

//   // Check role access
//   if (allowedRoles.length && !allowedRoles.includes(user.role)) {
//     showToast("You are not authorized to access this page.");
//     redirectToLogin();
//     return;
//   }

//   return user;
// }

// document.addEventListener("DOMContentLoaded", () => {

//   const logoutBtn = document.getElementById("logoutBtn");

//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//       logout();
//     });
//   }

// });

// // ---------------- Redirect ----------------
// function redirectToLogin() {
//   window.location.href = "login.html";
// }

// // ---------------- Logout ----------------
// function logout() {
//   localStorage.removeItem("token");
//   window.location.href = "login.html";
// }



// ---------------- Decode JWT ----------------
function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = atob(base64Payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    return error;
  }
}

// ---------------- Logout ----------------
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}




// ---------------- Route Guard ----------------
document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("token");

  // If no token -> redirect
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const user = parseJwt(token);

  if (!user) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  // Check expiration
  const currentTime = Date.now() / 1000;

  if (user.exp && user.exp < currentTime) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  // Get required role from page
  const requiredRole = document.body.dataset.role;

  if (requiredRole && user.role !== requiredRole) {
    showToast("Unauthorized access");
    window.location.href = "login.html";
    return;
  }

});


