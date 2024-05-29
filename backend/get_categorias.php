<?php
include '../conexao.php';

$id_tipo = isset($_GET['id_tipo']) ? (int) $_GET['id_tipo'] : 0;

$query_categorias = "SELECT id, nome FROM categoria WHERE id_tipo = $id_tipo";
$result_categorias = pg_query($conn, $query_categorias);

$categorias = [];
while ($row = pg_fetch_assoc($result_categorias)) {
    $categorias[] = $row;
}

header('Content-Type: application/json');
echo json_encode($categorias);

pg_close($conn);
?>
