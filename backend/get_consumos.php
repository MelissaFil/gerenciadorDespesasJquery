<?php
include '../conexao.php';

$query_consumo = "SELECT * FROM consumo";
$result_consumo = pg_query($conn, $query_consumo);

$consumos = [];
while ($row = pg_fetch_assoc($result_consumo)) {
    $consumos[] = $row;
}

header('Content-Type: application/json');
echo json_encode($consumos);

pg_close($conn);
?>
