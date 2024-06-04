export function listarConsumos() {
    $.ajax({
        url: '../backend/get_consumos.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            let cardsCategoria = $('.cards-categoria');
            cardsCategoria.empty(); // Limpa os cards existentes

            // Objeto para mapear cores por tipo
            let tipoColors = {
                '1': 'success', // Cor verde para o tipo 1
                '2': 'warning', // Cor amarela para o tipo 2
                '3': 'danger'  // Cor azul para o tipo 3, adicione mais se necessário
            };

            // Agrupa os consumos por categoria e soma os valores
            let consumosPorCategoria = {};
            let tiposIds = new Set();

            data.forEach(function(consumo) {
                if (!consumosPorCategoria[consumo.id_categoria]) {
                    consumosPorCategoria[consumo.id_categoria] = {
                        tipo: consumo.id_tipo,
                        total: 0
                    };
                }
                consumosPorCategoria[consumo.id_categoria].total += parseFloat(consumo.valor);
                tiposIds.add(consumo.id_tipo);
            });

            // Converte o Set para um array
            let tiposArray = Array.from(tiposIds);

            // Obtém os nomes das categorias para cada tipo
            tiposArray.forEach(function(id_tipo) {
                $.ajax({
                    url: '../backend/get_categorias.php',
                    method: 'GET',
                    data: { id_tipo: id_tipo },
                    dataType: 'json',
                    success: function(categorias) {
                        categorias.forEach(function(categoria) {
                            let consumoCategoria = consumosPorCategoria[categoria.id];
                            if (consumoCategoria) {
                                let categoriaCard = $('<div class="col-12 col-md-6 col-lg-4 mb-4"></div>');
                                let cardHtml = '<a href="#" class="text-decoration-none">' +
                                    '<div class="card card-categoria border-card p-3">' +
                                    '<div class="card-header d-flex flex-row justify-content-between text-' + tipoColors[consumoCategoria.tipo] + ' header-' + tipoColors[consumoCategoria.tipo] + '">' +
                                    '<h5>' + categoria.nome + '</h5>' +
                                    '<span>•</span>' +
                                    '</div>' +
                                    '<div class="card-body">' +
                                    '<p class="card-text text-secondary-light">Gasto Total: <span class="text-primary">R$' + consumoCategoria.total.toFixed(2) + '</span></p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>';
                                categoriaCard.append(cardHtml);
                                cardsCategoria.append(categoriaCard);
                            }
                        });
                    },
                    error: function(xhr, status, error) {
                        alert('Erro ao carregar os nomes das categorias: ' + xhr.responseText);
                    }
                });
            });
        },
        error: function(xhr, status, error) {
            alert('Erro ao carregar os consumos: ' + xhr.responseText);
        }
    });
}
