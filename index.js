import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const item = document.getElementById("item-name");
const addBtn = document.getElementById("add-to-cart");
const list = document.querySelector(".items");

const appSettings = {
    databaseURL: "https://addtokartdb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsListInDB = ref(database, "items-list");

addBtn.addEventListener('click', ()=> {
    if(item.value != "") {
        let itemName = item.value;
        push(itemsListInDB, itemName);
        clearInputField();
    }
    // addItem(itemName);
});

onValue(itemsListInDB, function(snapshot) {
    if(snapshot.exists()==true) {
        let itemArray = Object.entries(snapshot.val());
        clearItemList();
        for(let i=0; i<itemArray.length; i++) {
        let currentItem = itemArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];
        addItem(currentItem);
        }
    } 
    else {
        list.innerHTML = "<p style='color: #492a04; font-size: 30px;'>No items here... yet</p>"
    }
});

function clearItemList() {
    list.innerHTML = "";
}

function clearInputField() {
    item.value = "";
}

function addItem(item) {
    let li = document.createElement("li");
    li.classList.add("item");
    let itemID = item[0];
    let itemValue = item[1];
    li.innerText = itemValue;
    list.append(li);


    li.addEventListener("dblclick", ()=> {
        let exactLocationOfItemInDB = ref(database, `items-list/${itemID}`);
        remove(exactLocationOfItemInDB);
    })
}
