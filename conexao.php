<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$port = "5432";
$user = "postgres"; 
$password = "mysecretpassword"; 
$dbname = "gerenciador_gastos";

// Cria a conexão
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Verifica a conexão
if (!$conn) {
    die("Conexão falhou: " . pg_last_error());
}
?>
