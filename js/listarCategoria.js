export  function listarCategoria() {
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