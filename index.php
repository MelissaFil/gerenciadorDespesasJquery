<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciador de Tarefas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
   
</head>
<body>
    <?php include 'componentes/nav.php'; ?>
    <?php
      // Array associativo da page, file e title
      $pages = array(
        "meusResultados" => array("file" => "pages/meusResultados.html", "title" => "Meus Resultados"),
        "relatorio" => array("file" => "pages/relatorio.html", "title" => "Relatório"),
        // Adicione mais páginas conforme necessário
      );

      // Obtém a página selecionada a partir da URL
      $page = isset($_GET['page']) ? $_GET['page'] : 'meusResultados';

      // Verifica se a página é válida e existe no array
      if(array_key_exists($page, $pages)) {
        $pageInfo = $pages[$page];
        $titulo = $pageInfo['title'];
      }
    ?>

    <?php include 'componentes/title.php'; ?>
    <?php 
    //adicionar o gerenciador-pag apenas na página inicial
    if($page === 'meusResultados')
    include 'componentes/gerenciador-pag.php'; 
    ?>

    <?php
      // Inclui o arquivo correspondente se a página é válida
      if (array_key_exists($page, $pages)) {
          include $pageInfo['file'];
      } else {
          echo "<p>Página não encontrada.</p>";
      }
    ?>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-qFOQ9YFAeGj1gDOuUD61g3D+tLDv3u1ECYWqT82WQoaWrOhAY+5mRMTTVsQdWutbA5FORCnkEPEgU0OF8IzGvA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>
</html>