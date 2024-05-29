<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include '../conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $valor = $_POST['valor'];
    $data = $_POST['data'];
    $tipo_id = $_POST['tipo_id'];
    $categoria_id = $_POST['categoria_id'];
    $descricao = $_POST['descricao'];

    // Verifique os valores recebidos
    if (empty($valor) || empty($data) || empty($tipo_id) || empty($categoria_id) || empty($descricao)) {
        http_response_code(400);
        echo "Todos os campos são obrigatórios.";
        exit();
    }

    echo "Recebido: Valor=$valor, Data=$data, TipoID=$tipo_id, CategoriaID=$categoria_id, Descricao=$descricao\n";

    $query = "INSERT INTO consumo (id_tipo, id_categoria, descricao, valor, data) VALUES ($1, $2, $3, $4, $5)";
    $result = pg_query_params($conn, $query, array($tipo_id, $categoria_id, $descricao, $valor, $data));

    if ($result) {
        echo "Gasto cadastrado com sucesso!";
    } else {
        echo "Erro ao cadastrar gasto: " . pg_last_error($conn);
    }

    pg_close($conn);
} else {
    http_response_code(405);
    echo "Método inválido.";
}
?>
