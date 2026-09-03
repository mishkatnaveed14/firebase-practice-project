import {
  getalldata,
  logout,
  togetloggedinuser,
  deleteUser,
  blockUser,
  unblockUser,
} from "../firebase.config.js";
import { products, getOrders } from "./store.js";
togetloggedinuser();

const tableBody = document.getElementById("users-table-body");
const totalUsers = document.getElementById("total-users");
const refreshBtn = document.getElementById("refresh-btn");
const userSearch = document.getElementById("user-search");
const monthlyRevenue = document.getElementById("monthly-revenue");
const totalAccounts = document.getElementById("total-accounts");
const pendingOrders = document.getElementById("pending-orders");
const lowStock = document.getElementById("low-stock");
const orderOverview = document.getElementById("order-overview");
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
  try {
    const users = await getalldata();
    if (!users) throw new Error("Users could not be loaded");
    allUsers = users;
    filterUsers();
    showDashboardMetrics();
  } catch (error) {
    console.error("Unable to load users", error);
    if (tableBody)
      tableBody.innerHTML = `<tr><td colspan="7" class="empty-row">Users could not be loaded. Check your Firestore rules.</td></tr>`;
  }
}

function showDashboardMetrics() {
  if (!monthlyRevenue && !orderOverview) return;
  const orders = getOrders();
  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );
  const pending = orders.filter(
    (order) => order.status === "Processing",
  ).length;
  if (monthlyRevenue)
    monthlyRevenue.textContent = `$${revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  if (totalAccounts) totalAccounts.textContent = allUsers.length;
  const activeUsers = allUsers.filter(
    (user) => user.status !== "Blocked",
  ).length;
  const newUsers = allUsers.filter((user) => user.role !== "admin").length;
  const activeUsersElement = document.getElementById("active-users");
  const newUsersElement = document.getElementById("new-users");
  if (activeUsersElement) activeUsersElement.textContent = activeUsers;
  if (newUsersElement) newUsersElement.textContent = newUsers;
  if (pendingOrders) pendingOrders.textContent = pending;
  if (lowStock)
    lowStock.textContent = products.filter(
      (product) => product.stock > 0 && product.stock < 15,
    ).length;
  if (orderOverview) {
    orderOverview.innerHTML = orders.length
      ? orders
          .slice(0, 5)
          .map(
            (order) =>
              `<tr><td>${order.id}</td><td>${order.items?.length || 0} items</td><td>$${Number(order.total || 0).toFixed(2)}</td><td><span class="status-pill">${order.status}</span></td></tr>`,
          )
          .join("")
      : `<tr><td colspan="4" class="empty-row">No orders have been placed yet.</td></tr>`;
  }
}

function filterUsers() {
  const searchTerm = userSearch ? userSearch.value.trim().toLowerCase() : "";
  const filteredUsers = allUsers.filter((user) =>
    (user.username || "").toLowerCase().includes(searchTerm),
  );
  renderUsers(filteredUsers);
}

showDashboardMetrics();
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
