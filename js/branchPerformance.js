

const API = "http://localhost:5000/api/director";

async function loadBranches(){

try{

const res = await fetch(`${API}/branch-stock`);
const branches = await res.json();

const table = document.getElementById("branchTable");

table.innerHTML = "";

branches.forEach(branch => {

const row = `
<tr>
<td><strong>${branch._id}</strong></td>
<td>Operational</td>
<td><strong>${branch.totalRemainingStock} Tons</strong></td>
<td>-</td>
<td><span class="material-symbols-outlined">more_vert</span></td>
</tr>
`;

table.innerHTML += row;

});

}
catch(err){
console.error(err)
}

}

loadBranches();

