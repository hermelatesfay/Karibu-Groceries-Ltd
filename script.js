document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simulated users
  const users = {
    manager: { password: "1234", role: "manager" },
    agent: { password: "1234", role: "salesAgent" },
    director: { password: "1234", role: "director" },
  };

  if (users[username] && users[username].password === password) {
    localStorage.setItem("role", users[username].role);

    if (users[username].role === "manager") {
      window.location.href = "manager-dashboard.html";
    } else if (users[username].Role === "salesAgent") {
      window.location.href = "agent-dashboard.html";
    } else {
      window.location.href = "director-dashboard.html";
    }
  } else {
    document.getElementById("errorMsg").textContent =
      "Invalid username or password";
  }
});
