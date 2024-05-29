<?php
include '../conexao.php';

$query_tipos = "SELECT id, nome FROM tipo";
$result_tipos = pg_query($conn, $query_tipos);

$tipos = [];
while ($row = pg_fetch_assoc($result_tipos)) {
    $tipos[] = $row;
}

header('Content-Type: application/json');
echo json_encode($tipos);

pg_close($conn);
?>
