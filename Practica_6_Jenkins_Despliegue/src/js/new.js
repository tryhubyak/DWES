//seccion NEW
$.ajax({
    url: '../json/tour_bundle.json',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        itemsHTML(data);
    },
    error: function (error) {
        console.error('Error en la solicitud:', error);
    }
  });
  
  function itemsHTML(data) {
    var contenedorbundle = $('#contenedorbundle');
  
    data.forEach(function (bundle) {
        var bundleHTML = `
        <div class="col-12 col-md-6 col-lg-6">
        <div class="card mb-2">
          <img src="${bundle.foto}" alt="${bundle.nombre}" class="bundleimg card-img-top">
          <div class="card-body">
            <h3 class="card-title">${bundle.nombre}</h3>
            <p class="card-text">$${bundle.precio}</p>
          </div>
        </div>
      </div>
        `;
        contenedorbundle.append(bundleHTML);
    });
  }
