

const API = "http://localhost:5000/api/director";

async function loadFinancials(){

try{

const revenue = await fetch(`${API}/total-revenue`).then(r=>r.json());
const credit = await fetch(`${API}/credit-outstanding`).then(r=>r.json());
const profit = await fetch(`${API}/profit`).then(r=>r.json());

document.getElementById("revenueCard").textContent =
`UGX ${revenue.totalRevenue.toLocaleString()}`;

document.getElementById("profitCard").textContent =
`UGX ${profit.estimatedProfit.toLocaleString()}`;

document.getElementById("creditCard").textContent =
`UGX ${credit.totalCreditOutstanding.toLocaleString()}`;

}
catch(err){
console.error(err)
}

}

loadFinancials();

