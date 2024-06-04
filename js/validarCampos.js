export function validarCampos() {
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