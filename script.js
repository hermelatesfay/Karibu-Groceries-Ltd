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

    // let passwordInput = document.getElementById("password");
    // let eye = document.getElementById("eye");

    // eye.addEventListener("click", ()=>{
    //   if(passwordInput.type === "password")
    //   {
    //     passwordInput.type = "text";
        
    //   }else{
    //     passwordInput.type = "password";
        
    //   }
      
    // })



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
    // document.addEventListener("DOMContentLoaded", () => {
    //   if (!localStorage.getItem("registeredUser")) {
    //     const defaultUser = {
    //       username: "kgl_admin",
    //       password: "groceries2026",
    //       role: "Manager"
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
    // document.getElementById("loginForm").addEventListener("submit", (e) => {
    //   e.preventDefault();
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
    //     window.location.href = "manager-dashboard.html";
    //   }, 1200);
    // });



    //put background to active links
    //  let links = document.querySelectorAll(".nav-links");

    //  links.forEach(link=>{
    //   link.addEventListener("click",()=>{
    //     links.forEach(l=>l.classList.remove('active'))
    //     link.classList.add("active")
    //   })
    //  })


    //  const procurementForm = document.getElementById("form"); //syntax error(missing quotes)-->fixed it by adding quotes
    
    //  procurementForm.addEventListener("submit",(e)=>{   //syntax error(missing closing bracket and typo in the method)-->fixed it by adding closing bracket to the function and added r to the method addEventListener
    //     e.preventDefault();
      
    //     let produceName = document.getElementById("produceName").value;
    //     let produceType = document.getElementById("produceType").value;
    //     let tonnage = document.getElementById("tonnage").value;
    //     let totalCost = document.getElementById("totalCost").value;
    //     let salePrice = document.getElementById("salePrice").value;
    //     let dealerName = document.getElementById("dealerName").value;
    //     let contactInfo = document.getElementById("contactInfo").value;
    //     let branch = document.getElementById("branch").value;
    //     let dateTime = document.getElementById("dateTime").value;

    //     const newProcurement = {
    //       produceName,
    //       produceType,
    //       tonnage,
    //       totalCost,
    //       salePrice,
    //       dealerName,
    //       contactInfo,
    //       branch,
    //       dateTime
    //     }

    //    const procurement = JSON.parse(localStorage.getItem("procurement")) || []; //logical error-->fixed it by adding another |
    //    procurement.push(newProcurement)

    //     localStorage.setItem("procurement",JSON.stringify(procurement)); //Runtime error(Procurement not defined)-->fixed it by changing P to p

    //     alert("Procurement saved");
    //     procurementForm.reset();
    //  })


  

    const links = document.querySelectorAll("#nav a");
    const currentPage = window.location.pathname;

    links.forEach((link)=>{
      if(link.getAttribute("href") === currentPage.split("/").pop()){
          link.classList.add("active")
      }
    })


    const contentLinks = document.querySelectorAll(".contentlinks a");
    const newEntry = window.location.pathname;


    contentLinks.forEach((contentLink)=>{
      if(contentLink.getAttribute("href") === newEntry.split("/").pop()){
        contentLink.classList.add("active")
      }
    })

    
    
    const sideLinks = document.querySelectorAll("nav-links a li");
    const sideLinkPage = window.location.pathname;

    sideLinks.forEach((sideLink)=>{
      if(sideLink.getAttribute("href") === sideLinkPage.split("/").pop()){
          sideLink.classList.add("activenow")
      }
    })




      //show or hide form section
    const regular = document.getElementById("regularSale");
    const credit = document.getElementById("creditSale");
    const regularFields = document.getElementById("regularFields");
    const creditFields = document.getElementById("creditFields");


    regular.addEventListener("change",function(){
      if(this.checked){
        regularFields.style.display = "block";
        creditFields.style.display = "none";
      }
    })

    credit.addEventListener("change",function(){
      if(this.checked){
        regularFields.style.display = "none";
        creditFields.style.display = "block";
      }
    })






    
 
