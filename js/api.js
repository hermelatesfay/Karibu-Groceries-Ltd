
// ---------------- API BASE CONFIG ----------------
const API_BASE_URL = "http://localhost:3000";

// ---------------- GET TOKEN ----------------
function getToken() {
  return localStorage.getItem("token");
}

// ---------------- GENERIC REQUEST FUNCTION ----------------
async function request(endpoint, options = {}) {

  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  // Attach token automatically
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // If token expired or unauthorized
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  const data = await response.json();
  return data;
}

// ---------------- API METHODS ----------------
const api = {

  get(endpoint) {
    return request(endpoint, {
      method: "GET"
    });
  },

  post(endpoint, body) {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
  },

  put(endpoint, body) {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  },

  delete(endpoint) {
    return request(endpoint, {
      method: "DELETE"
    });
  }

};