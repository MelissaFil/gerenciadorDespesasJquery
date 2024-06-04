<?php
include '../conexao.php';

// Função para preencher valores com 0 caso não haja dados
function getValueOrDefault($value, $default = 0) {
    return $value !== null ? $value : $default;
}

try {
    // Verifique se $conn é uma conexão válida do PostgreSQL
    if (!$conn) {
        throw new Exception("Conexão com o banco de dados falhou.");
    }

    // Query para obter os dados do orçamento
    $query_orcamento = "SELECT renda_fixa_mensal, reserva_planejada FROM orcamento ORDER BY id DESC LIMIT 1";
    $result_orcamento = pg_query($conn, $query_orcamento);

    if ($result_orcamento && pg_num_rows($result_orcamento) > 0) {
        $orcamento = pg_fetch_assoc($result_orcamento);
    } else {
        // Se não houver dados, defina valores padrão
        $orcamento = [
            'renda_fixa_mensal' => 0,
            'reserva_planejada' => 0
        ];
    }

    // Query para obter o consumo total por tipo
    $query_consumo = "SELECT id_tipo, SUM(valor) as total_consumo FROM consumo GROUP BY id_tipo";
    $result_consumo = pg_query($conn, $query_consumo);

    $consumo_fixo = 0;
    $consumo_variavel = 0;
    $consumo_ocasional = 0;

    if ($result_consumo && pg_num_rows($result_consumo) > 0) {
        while ($row = pg_fetch_assoc($result_consumo)) {
            switch ($row['id_tipo']) {
                case 1:
                    $consumo_fixo = getValueOrDefault($row['total_consumo']);
                    break;
                case 2:
                    $consumo_variavel = getValueOrDefault($row['total_consumo']);
                    break;
                case 3:
                    $consumo_ocasional = getValueOrDefault($row['total_consumo']);
                    break;
            }
        }
    }

    $consumo_atual = $consumo_fixo + $consumo_variavel + $consumo_ocasional;

    $response = [
        'renda_cadastrada' => getValueOrDefault($orcamento['renda_fixa_mensal']),
        'consumo_atual' => $consumo_atual,
        'renda_reservada' => getValueOrDefault($orcamento['reserva_planejada']),
        'consumo_fixo' => $consumo_fixo,
        'consumo_variavel' => $consumo_variavel,
        'consumo_ocasional' => $consumo_ocasional
    ];

    echo json_encode($response);
} catch (Exception $e) {
    // Se ocorrer algum erro, defina todos os valores como 0
    $response = [
        'renda_cadastrada' => 0,
        'consumo_atual' => 0,
        'renda_reservada' => 0,
        'consumo_fixo' => 0,
        'consumo_variavel' => 0,
        'consumo_ocasional' => 0
    ];

    echo json_encode($response);
} finally {
    pg_close($conn);
}
?>