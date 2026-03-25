// ----------------- Elements -----------------
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const toastContainer = document.getElementById('toast-container');
const passwordToggle = document.querySelector('.password-toggle');

// Toggle password visibility
passwordToggle.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  passwordToggle.textContent = type === 'password' ? 'visibility' : 'visibility_off';
});

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

// ----------------- Form Validation -----------------
function validateForm() {
  let valid = true;

  // Clear previous errors
  usernameError.textContent = '';
  passwordError.textContent = '';

  if (!usernameInput.value.trim()) {
    usernameError.textContent = 'Username is required';
    valid = false;
  }

  if (!passwordInput.value.trim()) {
    passwordError.textContent = 'Password is required';
    valid = false;
  }

  return valid;
}

// login form submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Incorrect username or password", "error");
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    showToast("Login successful", "success");

    function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = atob(base64Payload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    return e;
  }
}

window.addEventListener("pageshow", function () {

  const token = localStorage.getItem("token");

  if (!token) return;

  const user = parseJwt(token);

  if (!user) return;

  const currentTime = Date.now() / 1000;

  if (user.exp && user.exp < currentTime) {
    localStorage.removeItem("token");
    return;
  }

  // If user is logged in redirect immediately
  if (user.role === "Manager") {
    window.location.replace("manager-dashboard.html");
  }

  if (user.role === "Sales agent") {
    window.location.replace("sales-dashboard.html");
  }

  if (user.role === "Director") {
    window.location.replace("director-dashboard.html");
  }

});

    // Decode token to get user info
    const user = parseJwt(data.token);

    // Redirect based on role
    setTimeout(() => {
      if (user.role === "Manager") {
        window.location.href = "manager-dashboard.html";
      } 
      else if (user.role === "Sales agent") {
        window.location.href = "salesAgent-dashboard.html";
      } 
      else if (user.role === "Director") {
        window.location.href = "director-dashboard.html";
      }
    }, 1200);

  } catch (error) {
    showToast("Error connecting to server", error);
  }
});


