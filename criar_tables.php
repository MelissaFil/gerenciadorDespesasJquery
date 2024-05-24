<?php
// Inclui o arquivo de conexão
include 'conexao.php';

// Criação da tabela 'tipo'
$query_create_tipo = "
CREATE TABLE IF NOT EXISTS tipo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);
";

// Executa a query para criar a tabela 'tipo'
if (pg_query($conn, $query_create_tipo)) {
    echo "Tabela 'tipo' criada com sucesso!<br>";
} else {
    echo "Erro ao criar tabela 'tipo': " . pg_last_error($conn) . "<br>";
}

// Verifica se a tabela 'tipo' está vazia
$query_check_tipo = "SELECT COUNT(*) FROM tipo";
$result_tipo = pg_query($conn, $query_check_tipo);
$count_tipo = pg_fetch_result($result_tipo, 0);

// Popula a tabela 'tipo' apenas se estiver vazia
if ($count_tipo == 0) {
    $query_insert_tipo = "
    INSERT INTO tipo (nome) VALUES
    ('Fixo'),
    ('Variável'),
    ('Ocasional');
    ";

    // Executa a query para inserir valores na tabela 'tipo'
    if (pg_query($conn, $query_insert_tipo)) {
        echo "Valores inseridos na tabela 'tipo' com sucesso!<br>";
    } else {
        echo "Erro ao inserir valores na tabela 'tipo': " . pg_last_error($conn) . "<br>";
    }
}

// Query para criar a tabela categoria
$query_create_categoria = "
CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    id_tipo INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo(id)
);
";

// Executa a query para criar a tabela categoria
if (pg_query($conn, $query_create_categoria)) {
    echo "Tabela 'categoria' criada com sucesso!<br>";
} else {
    echo "Erro ao criar tabela 'categoria': " . pg_last_error($conn) . "<br>";
}

// Verifica se a tabela 'categoria' está vazia
$query_check_categoria = "SELECT COUNT(*) FROM categoria";
$result_categoria = pg_query($conn, $query_check_categoria);
$count_categoria = pg_fetch_result($result_categoria, 0);

// Popula a tabela 'categoria' apenas se estiver vazia
if ($count_categoria == 0) {
    $query_insert_categoria = "
    INSERT INTO categoria (nome, id_tipo) VALUES
    ('Transporte', 1),
    ('Educação', 1),
    ('Casa', 1),
    ('Seguros', 1),
    ('Impostos', 1),
    ('Alimentação', 1),
    ('Saúde', 1),
    ('Outro', 1),
    ('Vestuário', 2),
    ('Entretenimento', 2),
    ('Restaurantes', 2),
    ('Hobbies', 2),
    ('Presentes', 2),
    ('Outro', 2),
    ('Manutenção da Casa', 3),
    ('Compras para Casa', 3),
    ('Viagens', 3),
    ('Eventos', 3),
    ('Tecnologia', 3),
    ('Educação Continuada', 3),
    ('Saúde (Ocasional)', 3),
    ('Outra ocasião', 3);
    ";

    // Executa a query para inserir valores na tabela 'categoria'
    if (pg_query($conn, $query_insert_categoria)) {
        echo "Valores inseridos na tabela 'categoria' com sucesso!<br>";
    } else {
        echo "Erro ao inserir valores na tabela 'categoria': " . pg_last_error($conn) . "<br>";
    }
}

// Query para criar a tabela 'consumo'
$query_create_table_consumo = "
CREATE TABLE IF NOT EXISTS consumo (
    id SERIAL PRIMARY KEY,
    id_tipo INT NOT NULL,
    id_categoria INT NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo(id),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);
";

// Executa a query para criar a tabela 'consumo'
if (pg_query($conn, $query_create_table_consumo)) {
    echo "Tabela 'consumo' criada com sucesso!<br>";
} else {
    echo "Erro ao criar tabela 'consumo': " . pg_last_error($conn) . "<br>";
}

// Query para criar a tabela 'orcamento'
$query_create_table_orcamento = "
CREATE TABLE IF NOT EXISTS orcamento (
    id SERIAL PRIMARY KEY,
    renda_fixa_mensal DECIMAL(10, 2) NOT NULL,
    reserva_planejada DECIMAL(10, 2) NOT NULL,
    mes INTEGER NOT NULL DEFAULT EXTRACT(MONTH FROM CURRENT_DATE),
    ano INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)
);
";

// Executa a query para criar a tabela 'orcamento'
if (pg_query($conn, $query_create_table_orcamento)) {
    echo "Tabela 'orcamento' criada com sucesso!<br>";
} else {
    echo "Erro ao criar tabela 'orcamento': " . pg_last_error($conn) . "<br>";
}

// Fecha a conexão
pg_close($conn);
?>
