export function cadastrarGasto() {
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
            listarConsumos();
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