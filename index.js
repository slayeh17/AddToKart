import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const item = document.getElementById("item-name");
const addBtn = document.getElementById("AddToKart");
const list = document.querySelector(".items");

const appSettings = {
    databaseURL: "https://addtokartdb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsListInDB = ref(database, "items-list");

addBtn.addEventListener('click', ()=> {
    let itemName = item.value;
    item.value = "";
    list.innerHTML += `<li class="item">${itemName}</li>`
    // push(itemsListInDB, itemName);
});