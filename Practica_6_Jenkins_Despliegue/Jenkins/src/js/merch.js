//Carousel slick de merch
function discoverL() {
  $(".center").slick({
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 3,
      slidesToScroll: 1
  });
}

function discoverM() {
  $(".center").slick({
      dots: true,
      infinite: true,
      centerMode: false,
      slidesToShow: 2,
      slidesToScroll: 1
  });
}

function discoverS() {
  $(".center").slick({
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1
  });
}

document.addEventListener('DOMContentLoaded', function () {
  discoverL();
});

if (window.matchMedia("(width: 768px) and (height: 1024px)").matches) {
  discoverM();
}
if (window.matchMedia("(width: 390px) and (height: 844px)").matches) {
  discoverS();
}

$.ajax({
  url: '../json/all.json',
  method: 'GET',
  dataType: 'json',
  success: function (data) {
    var dataRandom = shuffleArray(data);
    itemsHTML(dataRandom);

    $('.buscar input').on('input', function () {
      var searchTerm = $(this).val().toLowerCase();
      filterItems(dataRandom, searchTerm);
    });

    $('.list-group-item.prendas').on('click', function () {
      var category = $(this).data('category');
      if (category === 'ALL') {
        itemsHTML(dataRandom);
      } else {
        filterByCategory(dataRandom, category);
      }
    });
  },
  error: function (error) {
    console.error('Error en la solicitud:', error);
  }
});

function itemsHTML(data) {
  var contenedorall = $('#contenedorall');
  contenedorall.empty();

  data.forEach(function (all) {
    var allHTML = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card mb-2">
          <img src="${all.foto}" alt="${all.nombre}" class="tienda card-img-top">
          <div class="card-body">
            <h3 class="card-title">${all.nombre}</h3>
            <p class="card-text">$${all.precio}</p>
            <button type="button" class="btn btn-light cartb" onclick="addToCart('${all.nombre}', ${all.precio})">ADD TO CART</button>
          </div>
        </div>
      </div>
    `;
    contenedorall.append(allHTML);
  });
}

function filterItems(data, searchTerm) {
  var contenedorall = $('#contenedorall');
  contenedorall.empty();

  var nofiltro = data.filter(function (all) {
    return all.nombre.toLowerCase().includes(searchTerm);
  });

  itemsHTML(nofiltro);
}

function filterByCategory(data, category) {
  var contenedorall = $('#contenedorall');
  contenedorall.empty();

  var filtro = data.filter(function (item) {
    return itemCategoria(item) === category;
  });

  itemsHTML(filtro);
}

function itemCategoria(item) {
  return item.categoria;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//carrito
var shoppingCart = [];

function addToCart(productName, productPrice) {
  var item = {
    name: productName,
    price: productPrice
  };

  shoppingCart.push(item);

  saveCartToLocalStorage();

  alert("THIS ITEM HAS BEEN ADDED TO YOUR CART");
}

function saveCartToLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}


