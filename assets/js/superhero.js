console.log('javascript funciona T_T');

$('document').ready(() => {
    const btn = $('#btn');
    const inputId = $('#inputId');
    const inputError = $('#inputError');
    const apiError = $('#apiError');
    const card = $('#result__card');
    const chart = $('#result__chart');
    const resultImg = $('#result__img');
    const resultName = $('#result__name');
    const resultConnections = $('#result__connections');
    const resultPublish = $('#result__publish');
    const resultOcupation = $('#result__ocupation');
    const resultFirstAppearance = $('#result__first_appearance');
    const resultHeight = $('#result__height');
    const resultWeight = $('#result__weight');
    const resultAlianses = $('#result__alianses');
    const url ='https://www.superheroapi.com/api.php/210567848525529';

    const getData = (id) =>
        $.ajax({
            url: `${url}/${id}`,
            success: (data) => {
                return data;
            },
            error: (error) => {
                return error;
            },
        });

    const renderCard = (data) => {
        const {
            image: { url: imgUrl },
            name,
            connections: { relatives },
            biography: { ['first-appearance']: firstAppearance, publisher, aliases },
            work: { occupation },
            appearance: { height, weight },
        } = data;
        resultImg.html(`<img src="${imgUrl}" alt="super img" width="100%" />`);
        resultName.html(`Nombre: ${name}`);
        resultConnections.html(`Conexiones: ${relatives}`);
        resultPublish.html(`Publicado por: ${publisher}`);
        resultOcupation.html(`Ocupacion: ${occupation}`);
        resultFirstAppearance.html(`Primera aparicion: ${firstAppearance}`);
        resultHeight.html(`Altura: ${height[0]} - ${height[1]}`);
        resultWeight.html(`Peso: ${weight[0]} - ${weight[1]}`);
        resultAlianses.html(`Alianzas: ${aliases}`);
        card.removeClass('d-none');
    };

    const renderChart = (data) => {
        const { name, powerstats } = data;

        console.log(data);

        const powerstatsToDataPoints = Object.entries(powerstats).map((p) => ({
            y: p[1],
            label: p[0],
        }));

        const options = {
            title: {
                text: `Estadisticas de Poder para ${name}`,
            },
            animationEnabled: true,
            data: [
                {
                    type: 'pie',
                    showInLegend: 'true',
                    legendText: '{label}',
                    indexLabel: '{label} ({y})',
                    dataPoints: powerstatsToDataPoints,
                },
            ],
        };
        chart.CanvasJSChart(options);
        chart.removeClass('d-none');
    };

    const isValid = (id) => {
        if (isNaN(id) || id === '') {
            return false;
        } else if (id < 1 || id > 731) {
            return false;
        } else {
            return true;
        }
    };

    inputId.on('focus', () => {
        inputError.html('').addClass('d-none');
        apiError.html('').addClass('d-none');
    });

    btn.on('click', async () => {
        card.addClass('d-none');
        chart.addClass('d-none');
        const id = inputId.val();
        if (!isValid(id)) {
            inputError
                .html(
                    'El campo es requerido, debe ser numerico y debe estar entre 1 y 731.',
                )
                .removeClass('d-none');
        } else {
            const data = await getData(id);
            if (data.response === 'error') {
                apiError
                    .html(`Error al consultar a la api: ${data.error}`)
                    .removeClass('d-none');
            } else {
                renderCard(data);
                renderChart(data);
            }
        }
    });
});