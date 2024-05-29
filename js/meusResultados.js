$(document).ready(function() {
    function listarTipo() {
        // Carrega os tipos de gastos ao abrir o modal
        $('#modalRegistroGasto1').on('shown.bs.modal', function() {
            $.ajax({
                url: '../backend/get_tipos.php',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    let tipoGastoSelect = $('#tipoGasto');
                    tipoGastoSelect.empty().append('<option selected disabled>Tipo de gasto</option>');
                    data.forEach(function(tipo) {
                        tipoGastoSelect.append('<option value="' + tipo.id + '">' + tipo.nome + '</option>');
                    });
                    listarCategoria();
                }
            });
        });

        // Limpa os selects quando o modal é fechado
        $('#modalRegistroGasto1').on('hidden.bs.modal', function() {
            $('#tipoGasto').empty().append('<option selected disabled>Tipo de gasto</option>');
            $('#categoriaGasto').empty().append('<option selected disabled>Categoria</option>').prop('disabled', true);
        });

        // Bind the form submit event
        $('#registrarGasto').submit(function(e) {
            e.preventDefault();
            if (validarCampos()) {
                cadastrarGasto();
            }
        });
    }

    function listarCategoria() {
        // Atualiza as categorias quando um tipo é selecionado
        $('#tipoGasto').change(function() {
            let tipoId = $(this).val();
            let categoriaSelect = $('#categoriaGasto');

            if (tipoId) {
                $.ajax({
                    url: '../backend/get_categorias.php',
                    method: 'GET',
                    data: { id_tipo: tipoId },
                    dataType: 'json',
                    success: function(data) {
                        categoriaSelect.prop('disabled', false).empty().append('<option selected disabled>Categoria</option>');
                        data.forEach(function(categoria) {
                            categoriaSelect.append('<option value="' + categoria.id + '">' + categoria.nome + '</option>');
                        });
                    }
                });
            } else {
                categoriaSelect.prop('disabled', true).empty().append('<option selected disabled>Categoria</option>');
            }
        });
    }

    function validarCampos() {
        let valor = $('#valorGasto').val().trim();
        let data = $('#dataGasto').val().trim();
        let tipoId = $('#tipoGasto').val();
        let categoriaId = $('#categoriaGasto').val();
        let descricao = $('#descricaoGasto').val().trim();

        if (!valor) {
            Swal.fire({
                title: 'Erro!',
                text: 'O campo Valor é obrigatório.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        if (!data) {
            Swal.fire({
                title: 'Erro!',
                text: 'O campo Data é obrigatório.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        if (!tipoId) {
            Swal.fire({
                title: 'Erro!',
                text: 'O campo Tipo de gasto é obrigatório.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        if (!categoriaId) {
            Swal.fire({
                title: 'Erro!',
                text: 'O campo Categoria é obrigatório.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        if (!descricao) {
            Swal.fire({
                title: 'Erro!',
                text: 'O campo Descrição é obrigatório.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        return true;
    }

    function cadastrarGasto() {
        let valor = $('#valorGasto').val();
        let data = $('#dataGasto').val();
        let tipoId = $('#tipoGasto').val();
        let categoriaId = $('#categoriaGasto').val();
        let descricao = $('#descricaoGasto').val();

        $.ajax({
            url: '../backend/cadastrar_gasto.php',
            method: 'POST',
            data: {
                valor: valor,
                data: data,
                tipo_id: tipoId,
                categoria_id: categoriaId,
                descricao: descricao
            },
            success: function(response) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Gasto cadastrado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Limpa os campos do formulário após o cadastro
                $('#valorGasto').val('');
                $('#dataGasto').val('');
                $('#tipoGasto').val('');
                $('#categoriaGasto').val('').prop('disabled', true);
                $('#descricaoGasto').val('');

                // Fecha o modal
                $('#modalRegistroGasto1').modal('hide');
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao cadastrar gasto: ' + xhr.responseText,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
   // Função para carregar os cards de gasto
   function listarConsumos() {
    $.ajax({
        url: '../backend/get_consumos.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var cardsCategoria = $('.cards-categoria');
            cardsCategoria.empty(); // Limpa os cards existentes

            // Objeto para mapear cores por tipo
            var tipoColors = {
                '1': 'success', // Cor verde para o tipo 1
                '2': 'warning', // Cor amarela para o tipo 2
                '3': 'danger'  // Cor azul para o tipo 3, adicione mais se necessário
            };

            // Agrupa os consumos por categoria e soma os valores
            var consumosPorCategoria = {};
            var tiposIds = new Set();

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
            var tiposArray = Array.from(tiposIds);

            // Obtém os nomes das categorias para cada tipo
            tiposArray.forEach(function(id_tipo) {
                $.ajax({
                    url: '../backend/get_categorias.php',
                    method: 'GET',
                    data: { id_tipo: id_tipo },
                    dataType: 'json',
                    success: function(categorias) {
                        categorias.forEach(function(categoria) {
                            var consumoCategoria = consumosPorCategoria[categoria.id];
                            if (consumoCategoria) {
                                var categoriaCard = $('<div class="col-12 col-md-6 col-lg-4 mb-4"></div>');
                                var cardHtml = '<a href="#" class="text-decoration-none">' +
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

    function init() {
        listarTipo();
        listarConsumos() 
    }

    init();
});
