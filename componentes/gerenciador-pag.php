<section class="gerenciados-pag container d-flex flex-row justify-content-between align-items-center py-3">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" class=" text-primary text-decoration-none">Meus resultados</a></li>
            <li class="breadcrumb-item"><a href="#" class=" text-primary text-decoration-none">Maio</a></li>
            <li class="breadcrumb-item active" aria-current="page">Categoria</li>
        </ol>
    </nav>

    <div class="filtros d-flex flex-row align-items-center">
        <select class="form-select me-2" aria-label="Select de meses" id="filtroMes">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5" selected>Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </select>

        <select class="form-select me-2" aria-label="Select de tipos de gasto" id="filtroTipo">
            <option value="1" selected>Todos os tipos</option>
            <option value="F">Fixo</option>
            <option value="V">Variável</option>
            <option value="O">Ocasional</option>
        </select>
        <select class="form-select me-2" aria-label="Select de categoria de gasto" disabled id="filtroCategoria">
            <option value="1" selected>Todas as categorias</option>
        </select>
        <div class="form-group d-none">
            <input type="date" class="form-control" id="dateInput">
        </div>

        <button type="button" class="btn btn-primary text-nowrap"  data-bs-toggle="modal" data-bs-target=".modalRegistraGasto">Registrar gasto</button>
    </div>
</section>
