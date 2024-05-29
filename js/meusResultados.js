$(document).ready(function() {
    function listarTipo() {
        // Carrega os tipos de gastos ao abrir o modal
        $('#modalRegistroGasto1').on('shown.bs.modal', function() {
            $.ajax({
                url: '../backend/get_tipos.php',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    var tipoGastoSelect = $('#tipoGasto');
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
            var tipoId = $(this).val();
            var categoriaSelect = $('#categoriaGasto');

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
        var valor = $('#valorGasto').val().trim();
        var data = $('#dataGasto').val().trim();
        var tipoId = $('#tipoGasto').val();
        var categoriaId = $('#categoriaGasto').val();
        var descricao = $('#descricaoGasto').val().trim();

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
        var valor = $('#valorGasto').val();
        var data = $('#dataGasto').val();
        var tipoId = $('#tipoGasto').val();
        var categoriaId = $('#categoriaGasto').val();
        var descricao = $('#descricaoGasto').val();

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

    function init() {
        listarTipo();
    }

    init();
});
