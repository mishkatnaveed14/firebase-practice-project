import { getalldata, logout, togetloggedinuser } from "../firebase.config.js";
togetloggedinuser();

const tableBody = document.getElementById("users-table-body");
const totalUsers = document.getElementById("total-users");
const refreshBtn = document.getElementById("refresh-btn");

async function showUsers() {
  const users = await getalldata();
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username || "Nothing"}</td>
      <td>${user.email || "nothing"}</td>
      <td>${user.id}</td>
    `;
    tableBody.appendChild(row);
  });
  totalUsers.textContent = users.length;
}
showUsers();
document.getElementById("logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
refreshBtn.addEventListener("click", showUsers);
