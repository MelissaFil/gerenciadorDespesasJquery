import {cadastrarGasto } from './cadastrarGasto.js';
import {listarCategoria } from './listarCategoria.js';
import {validarCampos } from './validarCampos.js';
import {listarConsumos } from './listarConsumos.js';

$(document).ready(function() {
    // Carrega os tipos de gastos ao abrir o modal
    $('#modalRegistroGasto1').on('shown.bs.modal', function() {
        $.ajax({
            url: '../backend/get_tipos.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                let tipoGastoSelect = $('#tipoGasto');
                tipoGastoSelect.empty().append('<option selected disabled>Tipo de gasto</option>');
                data.forEach(function(tipo) {
                    tipoGastoSelect.append('<option value="' + tipo.id + '">' + tipo.nome + '</option>');
                });
                listarCategoria();
            }
        });
    });

    // Limpa os selects quando o modal é fechado
    $('#modalRegistroGasto1').on('hidden.bs.modal', function() {
        $('#tipoGasto').empty().append('<option selected disabled>Tipo de gasto</option>');
        $('#categoriaGasto').empty().append('<option selected disabled>Categoria</option>').prop('disabled', true);
    });

    // Bind the form submit event
    $('#registrarGasto').submit(function(e) {
        e.preventDefault();
        if (validarCampos()) {
            cadastrarGasto();
            listarConsumos()
            
        }
    });



    function init() {
        listarConsumos() 
    }

    init();
});
