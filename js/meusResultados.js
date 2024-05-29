$(document).ready(function() {
    // Carrega os tipos de gastos ao abrir o modal
    $('#modalRegistroGasto1').on('shown.bs.modal', function() {
    $.ajax({
        url: '../backend/get_tipos.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tipoGastoSelect = $('#tipoGasto');
            tipoGastoSelect.append('<option selected>Tipo de gasto</option>');
            data.forEach(function(tipo) {
                tipoGastoSelect.append('<option value="' + tipo.id + '">' + tipo.nome + '</option>');
            });
        }
    });

    // Atualiza as categorias quando um tipo é selecionado
    $('#tipoGasto').change(function() {
        var tipoId = $(this).val();
        var categoriaSelect = $('#categoriaGasto');
        categoriaSelect.empty().append('<option selected>Categoria</option>');
        if (tipoId) {
            $.ajax({
                url: '../backend/get_categorias.php',
                method: 'GET',
                data: { id_tipo: tipoId },
                dataType: 'json',
                success: function(data) {
                    categoriaSelect.prop('disabled', false);
                    data.forEach(function(categoria) {
                        categoriaSelect.append('<option value="' + categoria.id + '">' + categoria.nome + '</option>');
                    });
                }
            });
        } else {
            categoriaSelect.prop('disabled', true);
        }
    });
    })

    // Limpa os selects quando o modal é fechado
    $('#modalRegistroGasto1').on('hidden.bs.modal', function() {
        $('#tipoGasto').empty().append('<option selected>Tipo de gasto</option>');
        $('#categoriaGasto').empty().append('<option selected>Categoria</option>').prop('disabled', true);
    });
});