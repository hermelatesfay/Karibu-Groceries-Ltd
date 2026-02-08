// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();

//   // Simulated users
//   const users = {
//     manager: { password: "1234", role: "manager" },
//     agent: { password: "1234", role: "salesAgent" },
//     director: { password: "1234", role: "director" },
//   };

//   if (users[username] && users[username].password === password) {
//     localStorage.setItem("role", users[username].role);

//     if (users[username].role === "manager") {
//       window.location.href = "manager-dashboard.html";
//     } else if (users[username].Role === "salesAgent") {
//       window.location.href = "agent-dashboard.html";
//     } else {
//       window.location.href = "director-dashboard.html";
//     }
//   } else {
//     document.getElementById("errorMsg").textContent =
//       "Invalid username or password";
//   }
// });



                  //show or hide password

    let passwordInput = document.getElementById("password");
    let eye = document.getElementById("eye");

    eye.addEventListener("click", ()=>{
      if(passwordInput.type === "password")
      {
        passwordInput.type = "text";
        
      }else{
        passwordInput.type = "password";
        
      }
      
    })



    //  /* ===== CREATE DEFAULT USER ON PAGE LOAD ===== */
    // document.addEventListener("DOMContentLoaded", () => {
    //   if (!localStorage.getItem("registeredUser")) {
    //     const defaultUser = {
    //       username: "kgl_admin",
    //       password: "groceries2026",
    //       role: "manager"
    //     };
    //     localStorage.setItem("registeredUser", JSON.stringify(defaultUser));
    //   }
    // });

    // /* ===== TOAST FUNCTION ===== */
    // function showToast(message, type = "success") {
    //   const container = document.getElementById("toast-container");
    //   const toast = document.createElement("div");
    //   toast.classList.add("toast", type);
    //   toast.textContent = message;
    //   container.appendChild(toast);

    //   setTimeout(() => {
    //     toast.remove();
    //   }, 3000);
    // }

    // /* ===== LOGIN LOGIC ===== */
    // document.getElementById("loginBtn").addEventListener("click", () => {
    //   const username = document.getElementById("username").value.trim();
    //   const password = document.getElementById("password").value.trim();

    //   // 1. Empty fields
    //   if (!username || !password) {
    //     showToast("Please enter both username and password", "error");
    //     return;
    //   }

    //   const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    //   // 2. Username not found
    //   if (!storedUser || storedUser.username !== username) {
    //     showToast("Username does not exist", "error");
    //     return;
    //   }

    //   // 3. Wrong password
    //   if (storedUser.password !== password) {
    //     showToast("Incorrect password, please try again", "error");
    //     return;
    //   }

    //   // 4. Successful login
    //   const loggedInUser = {
    //     username: storedUser.username,
    //     role: storedUser.role,
    //     isLoggedIn: true
    //   };

    //   localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    //   showToast("Login successful", "success");

    //   // 5. Redirect
    //   setTimeout(() => {
    //     window.location.href = "dash.html";
    //   }, 1200);
    // });



    /* ===== CREATE DEFAULT USER ON PAGE LOAD ===== */
    document.addEventListener("DOMContentLoaded", () => {
      if (!localStorage.getItem("registeredUser")) {
        const defaultUser = {
          username: "kgl_admin",
          password: "groceries2026",
          role: "Manager"
        };
        localStorage.setItem("registeredUser", JSON.stringify(defaultUser));
      }
    });

    /* ===== TOAST FUNCTION ===== */
    function showToast(message, type = "success") {
      const container = document.getElementById("toast-container");
      const toast = document.createElement("div");
      toast.classList.add("toast", type);
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }

    /* ===== LOGIN LOGIC ===== */
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // 1. Empty fields
      if (!username || !password) {
        showToast("Please enter both username and password", "error");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

      // 2. Username not found
      if (!storedUser || storedUser.username !== username) {
        showToast("Username does not exist", "error");
        return;
      }

      // 3. Wrong password
      if (storedUser.password !== password) {
        showToast("Incorrect password, please try again", "error");
        return;
      }

      // 4. Successful login
      const loggedInUser = {
        username: storedUser.username,
        role: storedUser.role,
        isLoggedIn: true
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      showToast("Login successful", "success");

      // 5. Redirect
      setTimeout(() => {
        window.location.href = "manager-dashboard.html";
      }, 1200);
    });



    //put background to active links
     let links = document.querySelectorAll(".nav-links");

     links.forEach(link=>{
      link.addEventListener("click",()=>{
        links.forEach(l=>l.classList.remove('active'))
        link.classList.add("active")
      })
     })



    
 
