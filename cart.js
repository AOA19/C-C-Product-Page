const cart = document.getElementById("cart");
const cartContainer = document.querySelector(".cart-container");
const overlay = document.querySelector(".cart-overlay");

// Open cart and close cart:
cart.addEventListener("click", function () {
  const expand = cartContainer.getAttribute("data-visible");
  if (expand === "false") {
    cartContainer.setAttribute("data-visible", true);
    cart.setAttribute("aria-expanded", true);
    overlay.classList.toggle("overlay-open");
  } else {
    cartContainer.setAttribute("data-visible", false);
    cart.setAttribute("aria-expanded", false);
    overlay.classList.remove("overlay-open");
  }
});

// Add items to cart:
let addToCartBtns = document.getElementsByClassName("product-btn");
for (let i = 0; i < addToCartBtns.length; i++) {
  let addBtn = addToCartBtns[i];
  addBtn.addEventListener("click", addToCart);
}

function addToCart(e) {
  let addBtn = e.target;
  let product = addBtn.parentElement.parentElement;
  let productName = product.getElementsByClassName("product-name")[0].innerText;
  let productPrice =
    product.getElementsByClassName("product-price")[0].innerText;
  let productImg = product.getElementsByClassName("product-img")[0].src;
  addItemToCart(productName, productPrice, productImg);

  updateCartTotal();
}
// Add item row to cart
function addItemToCart(productName, productPrice, productImg) {
  let newRowDiv = document.createElement("div");
  newRowDiv.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];

  // Prevent duplicate items in shopping cart
  let itemTitle = cartItems.getElementsByClassName("item-title");
  for (let i = 0; i < itemTitle.length; i++) {
    if (itemTitle[i].innerText == productName) {
      alert("Item is already in your cart");
      return;
    }
  }
  // Add content from html to cart when the "Add To Cart" button is clicked
  let cartRowContents = ` 
      <img src="${productImg}" class="cart-img" />
      <div class="cart-details">
          <div class="item-title">${productName}</div>
          <div class="item-price">${productPrice}</div>
          <input type="number" value="1" class="item-quantity" />
      </div>
      <button type="button" class="remove-btn">
          <i class="fa-solid fa-trash-can remove-item"></i>
      </button>`;

  newRowDiv.innerHTML = cartRowContents;
  cartItems.append(newRowDiv); // Will add a new cart row (newRowDiv) to the end of the existing cart items
  newRowDiv
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeItem); // Remove new item added to cart when remove button is clicked
  newRowDiv
    .getElementsByClassName("item-quantity")[0]
    .addEventListener("change", quantityChanged); // Change the total price when a new item is added to cart and the quantity is changed
}

// Remove items from cart:
let removeCartItemBtns = document.getElementsByClassName("remove-item");
for (let i = 0; i < removeCartItemBtns.length; i++) {
  let trashBtn = removeCartItemBtns[i];
  trashBtn.addEventListener("click", removeItem);
}
// Function to remove items from cart when the trash button is clicked
function removeItem(e) {
  let trashBtnClicked = e.target;
  trashBtnClicked.parentElement.parentElement.remove();
  updateCartTotal(); // Will update cart total when the item is removed from cart
}

// Function to clear cart when purchase button is clicked:
document
  .getElementsByClassName("purchase-btn")[0]
  .addEventListener("click", purchaseMade);

function purchaseMade() {
  alert("Thank you for your purchase!");
  let allItems = document.getElementsByClassName("cart-items")[0];
  while (allItems.hasChildNodes()) {
    allItems.removeChild(allItems.firstChild);
  } // This loop will check to see if there is any children inside of the cart-items element,
  //  and if there is it will remove the each child element until there are none left
  updateCartTotal();
}

// Update price when quantity is changed:
let quantityInputs = document.getElementsByClassName("item-quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}
// Checks to make sure quantity isn't <= 0
function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// Update cart total:
function updateCartTotal() {
  let cartItem = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItem.getElementsByClassName("cart-row");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let row = cartRows[i];
    let itemPrice = row.getElementsByClassName("item-price")[0];
    let itemQuantity = row.getElementsByClassName("item-quantity")[0];

    let price = itemPrice.innerText.replace("$", ""); // Replace the $ with nothing so price and quantity can be calculated correctly
    let quantity = itemQuantity.value;
    total = price * quantity + total;
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
