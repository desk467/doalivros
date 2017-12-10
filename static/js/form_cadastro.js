$(document).ready(
    function () {
        $('#estado').change(function () {
            var id_estado = $(this).val()

            $.ajax({ method: 'get', url: '/cidades/' + id_estado })
                .done(function (res) {
                    var cidades = res.cidades.map(cidade => `<option value="${cidade.id}">${cidade.nome}</option>`)

                    $('#cidade').html(cidades.join('\n'))

                    if(cidades.length)
                        $('#cidade').removeAttr('disabled')
                })
        })
    }
)