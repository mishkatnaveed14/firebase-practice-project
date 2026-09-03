import {
  getalldata,
  logout,
  togetloggedinuser,
  deleteUser,
  blockUser,
  unblockUser,
} from "../firebase.config.js";
togetloggedinuser();

const tableBody = document.getElementById("users-table-body");
const totalUsers = document.getElementById("total-users");
const refreshBtn = document.getElementById("refresh-btn");
const userSearch = document.getElementById("user-search");
let allUsers = [];

function renderUsers(users) {
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username || "Nothing"}</td>
      <td>${user.email || "nothing"}</td>
      <td>${user.id}</td>
      <td><button class="btn btn-danger delete" data-action="delete" data-user-id="${user.id}">Delete</button></td>
      <td><button class="btn btn-primary block" data-action="block" data-user-id="${user.id}">Block</button></td>
      <td><button class="btn btn-primary unblock" data-action="unblock" data-user-id="${user.id}">Unblock</button></td>
    `;
    tableBody.appendChild(row);
  });
  if (totalUsers) totalUsers.textContent = users.length;
}

async function showUsers() {
  const users = await getalldata();
  if (!users) return;
  allUsers = users;
  filterUsers();
}

function filterUsers() {
  const searchTerm = userSearch ? userSearch.value.trim().toLowerCase() : "";
  const filteredUsers = allUsers.filter((user) =>
    (user.username || "").toLowerCase().includes(searchTerm),
  );
  renderUsers(filteredUsers);
}

showUsers();
document.getElementById("logout-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
refreshBtn?.addEventListener("click", showUsers);
userSearch?.addEventListener("input", filterUsers);

tableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const userId = button.dataset.userId;
  const action = button.dataset.action;

  try {
    if (action === "delete") {
      if (!confirm("Delete this user profile?")) return;
      await deleteUser(userId);
    } else if (action === "block") {
      await blockUser(userId);
    } else if (action === "unblock") {
      await unblockUser(userId);
    }
    await showUsers();
  } catch (error) {
    console.error(`Unable to ${action} user`, error);
    alert("Action failed. Check Firestore rules and try again.");
  }
});
