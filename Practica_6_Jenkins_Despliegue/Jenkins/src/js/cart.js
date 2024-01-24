document.addEventListener("DOMContentLoaded", function () {
    var storedCart = localStorage.getItem("shoppingCart");
  
    if (storedCart) {
      shoppingCart = JSON.parse(storedCart);
      displayCartItems();
    }
  });
  
  function displayCartItems() {
    var cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";
  
    if (shoppingCart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center">YOUR CART IS EMPTY</p>';
      checkoutButton.style.display = "none";
      return;
    }
  
    var table = document.createElement("table");
    table.className = "table";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
  
    thead.innerHTML = `
      <tr>
        <th></th>
        <th>NAME</th>
        <th>PRICE</th>
        <th>QUANTITY</th>
        <th>TOTAL</th>
        <th>REMOVE</th>
      </tr>
    `;
    table.appendChild(thead);
  
    var totalAmount = 0;
  
    shoppingCart.forEach(function (item, index) {
      if (isNaN(item.quantity) || item.quantity <= 0) {
        item.quantity = 1;
      }
  
      var row = document.createElement("tr");
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>
            <button onclick="decreaseQuantity(${index})">-</button>
            ${item.quantity}
            <button onclick="increaseQuantity(${index})">+</button>
          </td>
          <td>${(item.price * item.quantity).toFixed(2)}</td>
          <td>
            <button onclick="removeItem(${index})">Remove</button>
          </td>
        `;
      tbody.appendChild(row);
  
      totalAmount += item.price * item.quantity;
    });
  
    var totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="4"></td>
        <td><strong>Total:</strong></td>
        <td>${totalAmount.toFixed(2)}</td>
      `;
    tbody.appendChild(totalRow);
  
    table.appendChild(tbody);
    cartItemsContainer.appendChild(table);
  }
  
  function increaseQuantity(index) {
    shoppingCart[index].quantity++;
    updateCart();
  }
  
  function decreaseQuantity(index) {
    if (shoppingCart[index].quantity > 1) {
      shoppingCart[index].quantity--;
      updateCart();
    }
  }
  
  function removeItem(index) {
    shoppingCart.splice(index, 1);
    updateCart();
  }
  
  function updateCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    displayCartItems();
  }

  function checkout(){
    alert("THANK YOU FOR YOUR PURCHASE")
  }

  