const clearBtn = document.querySelector("#clear");
const addItemBtn = document.querySelector("#add-item");
const showListBtn = document.querySelector("#show-list");

const taxPercentageIn = document.querySelector("#tax-percentage");

const itemNameInput = document.querySelector("#item-name");
const itemPriceInput = document.querySelector("#item-price");
const itemQuantityInput = document.querySelector("#item-quantity");

const itemCount = document.querySelector("#item-count");

const resultDiv = document.querySelector("#result");

var list = [
  {
    name: "laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop laptop",
    price: 1000.37,
    quantity: 1,
  },
  { name: "gamboy", price: 250.76, quantity: 2 },
];

itemCount.innerText = `Item Count: ${list.length}`;

clearBtn.addEventListener("click", clearList);
addItemBtn.addEventListener("click", addItem);
showListBtn.addEventListener("click", showResult);
taxPercentageIn.addEventListener("change", calculateTotal);

function showResult(show = false) {
  //   add active class to #result

  resultDiv.classList.toggle("active");

  if (show) {
    resultDiv.className = "active";
  }

  updateItemCount();

  const itemList = document.querySelector("#item-list");
  itemList.innerHTML = "";

  list.forEach((l, index) => {
    itemList.innerHTML += `
      <li>
         <span>${l.name} (${l.quantity})</span>
         <span>$(${l.price})</span>
         <span class="del-button"></span>
      </li>
    `;
  });

  //   addeventlistener for delete buttons
  const delItems = document.querySelectorAll(".del-button");
  delItems.forEach((i, index) =>
    i.addEventListener("click", () => deleteItem(i, index))
  );

  const result = getResult(document.querySelector("#tax-percentage").value);
  outputResultDetail(result);
  //
}

function outputResultDetail(obj) {
  const subTotalIn = document.querySelector("#subtotal");
  const taxPerIn = document.querySelector("#tax-percentage");
  const taxTotalIn = document.querySelector("#tax-total");
  const totalIn = document.querySelector("#total");

  subTotalIn.value = `${obj.subTotal}`;
  taxTotalIn.value = `${obj.taxTotal}`;
  totalIn.value = `${obj.total}`;
}

function getResult(taxPercentage = 6) {
  //   calculate subtotal of items;
  var subTotal = 0;
  list.forEach((l) => (subTotal += parseFloat(l.price) * parseInt(l.quantity)));
  const taxTotal = (subTotal * taxPercentage) / 100;
  var total = subTotal + taxTotal;
  //
  return {
    subTotal: subTotal.toFixed(2),
    taxTotal: taxTotal.toFixed(2),
    total: total.toFixed(2),
  };
}

function calculateTotal(e) {
  e.preventDefault();

  const taxPercentage = taxPercentageIn.value;
  const result = getResult(taxPercentage);
  outputResultDetail(result);
}

// ultilities

function addItem(e) {
  e.preventDefault();
  const isValid = itemNameInput.value && itemPriceInput.value ? true : false;
  if (isValid) {
    list.push({
      name: itemNameInput.value,
      price: parseFloat(itemPriceInput.value),
      quantity: parseInt(itemQuantityInput.value),
    });

    itemNameInput.value = "";
    itemPriceInput.value = "";
    itemQuantityInput.value = "";
    //
    itemCount.innerText = `Item Count: ${list.length}`;
    console.log(list);
  } else {
    alert("Item Name or Item Price is empty!!");
  }
}
//
function clearList(e) {
  e.preventDefault();
  const itemNameInput = document.querySelector("#item-name");
  const itemPriceInput = document.querySelector("#item-price");
  itemNameInput.value = "";
  itemPriceInput.value = "";

  list = [];
  const resultDiv = document.querySelector("#result");
  resultDiv.classList.remove("active");
  updateItemCount();
}

function updateItemCount() {
  itemCount.innerText = `Item Count: ${list.length}`;
}

// delete item
function deleteItem(item, index) {
  list.splice(index, 1);
  showResult(true);

  if (list.length === 0) {
    resultDiv.className = "";
  }
}
