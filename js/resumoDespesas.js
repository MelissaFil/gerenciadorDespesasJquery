export function resumirDespesas(){
    $.ajax({
        url: '../backend/get_resumo.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('.resumo .renda').each(function(index, element) {
                switch(index) {
                    case 0:
                        $(element).text('R$' + data.renda_cadastrada.toFixed(2));
                        break;
                    case 1:
                        $(element).text('R$' + data.consumo_atual.toFixed(2));
                        break;
                    case 2:
                        $(element).text('R$' + data.renda_reservada.toFixed(2));
                        break;
                }
            });

            // Atualiza as barras de progresso
            const consumoFixoPercent = (data.consumo_fixo / data.renda_cadastrada) * 100;
            const consumoVariavelPercent = (data.consumo_variavel / data.renda_cadastrada) * 100;
            const consumoOcasionalPercent = (data.consumo_ocasional / data.renda_cadastrada) * 100;
            const reservadoPercent = (data.renda_reservada / data.renda_cadastrada) * 100;

            $('.progress-bar.bg-success').css('width', consumoFixoPercent + '%').siblings('span').text(consumoFixoPercent.toFixed(2) + '%');
            $('.progress-bar.bg-warning').css('width', consumoVariavelPercent + '%').siblings('span').text(consumoVariavelPercent.toFixed(2) + '%');
            $('.progress-bar.bg-danger').css('width', consumoOcasionalPercent + '%').siblings('span').text(consumoOcasionalPercent.toFixed(2) + '%');
            $('.progress-bar.bg-info').css('width', reservadoPercent + '%').siblings('span').text(reservadoPercent.toFixed(2) + '%');
        },
        error: function(xhr, status, error) {
            console.error('Erro ao carregar os dados do resumo: ' + xhr.responseText);
        }
    });
}