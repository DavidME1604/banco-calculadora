async function calculateInterest() {
    const initialCapital = document.getElementById('initialCapital').value;
    const periodicContribution = document.getElementById('periodicContribution').value;
    const finalCapital = document.getElementById('finalCapital').value;
    const numPeriods = document.getElementById('numPeriods').value;

    const url = 'https://backend-calculadora.onrender.com//api/calculate';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initialCapital: initialCapital,
                periodicContribution: periodicContribution,
                finalCapital: finalCapital,
                numPeriods: numPeriods
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('result').innerText = `Resultado: ${data.result}`;

        const detailsButton = document.getElementById('detailsButton');
        detailsButton.style.display = 'inline-block';

    } catch (error) {
        console.error(error);
        document.getElementById('result').innerText = 'Ocurrió un error al realizar la petición.';
    }
}

// Función para obtener la URL del gráfico y actualizar la imagen
async function fetchChartImage() {
    const url = 'https://backend-calculadora.onrender.com/api/chart';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Obtener los datos JSON de la respuesta
        const data = await response.json();

        // Extraer la URL de la imagen del gráfico
        const imageUrl = data.chartUrl;

        // Obtener el elemento <img> y actualizar el atributo src



        console.log(`URL de la imagen obtenida: ${imageUrl}`);

    } catch (error) {
        console.error('Error al obtener la URL del gráfico:', error);
        alert('Ocurrió un error al obtener la imagen del gráfico.');
    }
    const chartImage = document.getElementById('resultChartImage');
    chartImage.src = 'https://backend-calculadora.onrender.com/static/grafico_funcion.png';
    chartImage.alt = 'Gráfico de Resultados';
}


function goBack() {
    window.location.href = 'index.html';
}

function showDetails() {
    fetchChartImage()
    window.location.href = 'details.html';
}