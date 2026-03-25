
async function loadSidebar() {
  const res = await fetch("../components/sidebar.html");
  const data = await res.text();

  document.getElementById("sidebar-container").innerHTML = data;

  //  Only call if function exists
  if (typeof loadUserProfile === "function") {
    loadUserProfile();
  }

  setActiveLink();

  //Attach logout AFTER sidebar is loaded
  setupLogout();
}

function setActiveLink() {
  const links = document.querySelectorAll(".nav-link a");

  let currentPage = window.location.pathname.split("/").pop();

  // Fix empty path
  if (!currentPage || currentPage === "") {
    currentPage = "manager-dashboard.html";
  }

  links.forEach(link => {
    let linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.parentElement.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", loadSidebar);

function setupLogout(){
  const logoutBtn = document.getElementById("logoutBtn");

  if(!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    if(typeof logout === "function"){
      logout();
    }
  });
}


// LOAD USER PROFILE


function loadUserProfile(){

const token = localStorage.getItem("token")

if(!token) return

try{

// Split the token
const payload = token.split(".")[1]

// Decode base64 payload
const decoded = JSON.parse(atob(payload))

// Get elements
const usernameEl = document.getElementById("username")
const roleEl = document.getElementById("userRole")


// Set values
if(usernameEl) usernameEl.textContent = decoded.username || "User"
if(roleEl) roleEl.textContent = decoded.role || "Manager"

// Update welcome message
// const headerText = document.querySelector(".header p")

// if(headerText){
// headerText.textContent =
// `Welcome back ${decoded.username}, here is today's summary`
// }
generateAvatar(decoded.username)

}catch(error){

console.log("Token decode error:", error)

}

}

function generateAvatar(name) {
  const profilePic = document.getElementById("profilePicture");

  if (!profilePic) return;

  const firstLetter = name.charAt(0).toUpperCase();

  profilePic.style.display = "none";

  let avatar = document.getElementById("avatar");

  if (!avatar) {
    avatar = document.createElement("div");
    avatar.id = "avatar";
    profilePic.parentElement.prepend(avatar);
  }

  avatar.textContent = firstLetter;
  avatar.className = "avatar";
}
