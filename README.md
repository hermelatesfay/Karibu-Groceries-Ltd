# Karibu Groceries System – Frontend

##  Overview

This is the frontend of the Karibu Groceries Management System. It provides an interactive user interface for managers and staff to manage stock, sales, procurement, pricing, and reports.

The system is built using **HTML, CSS, and Vanilla JavaScript**, without any frontend frameworks.

---

##  Features

* User authentication (Login & Token-based access)
* Manager Dashboard with summary cards
* Stock Level Monitoring
* Sales Recording (Cash & Credit)
* Procurement Management
* Price Management
* Branch Reports
* Reusable Sidebar Component
* Toast Notifications
* Pagination for tables

---

##  Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API
* LocalStorage (for token storage)

---

##  Folder Structure

```
frontend/
│── pages/
│   ├── manager-dashboard.html
│   ├── stockLevel.html
│   ├── managerSale.html
│   ├── procurement-form.html
│   ├── managePrices.html
│   ├── branch-reports.html
│
│── css/
│── js/
│   ├── api.js
│   ├── auth.js
│   ├── sidebar.js
│   ├── managerDashboard.js
│   ├── stockLevel.js
│   ├── priceManagement.js
│   ├── branchReports.js
│
│── images/
```

---

##  Authentication

* Uses JWT stored in `localStorage`
* Token is attached to API requests using:

```js
Authorization: "Bearer " + localStorage.getItem("token")
```

---

##  Reusable Components

* Sidebar is dynamically injected using JavaScript
* User profile is generated from decoded JWT token
* First letter avatar is used when no profile image is available

---

##  Setup Instructions

1. Open the project folder
2. Ensure backend is running
3. Open any HTML page in browser (e.g. `manager-dashboard.html`)

---

##  API Connection

All API calls are made to:

```
http://localhost:3000
```

Make sure backend is running on this port.

---

## Future Improvements

* Add charts (analytics dashboard)
* Real-time notifications (WebSockets)
* Search and filtering
* Export reports (PDF/Excel)
* Role-based UI control

---

## Author

Karibu Groceries System – Frontend
