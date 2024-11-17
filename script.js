document.getElementById('calculateButton').addEventListener('click', calculateInterest);

async function calculateInterest() {
    const initialCapital = Number(document.getElementById('initialCapital').value);
    const periodicContribution = Number(document.getElementById('periodicContribution').value);
    const finalCapital = Number(document.getElementById('finalCapital').value);
    const numPeriods = Number(document.getElementById('numPeriods').value);

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

function showDetails() {
    // Redirigir a otra página HTML (details.html)
    fetchChartImage()
    window.location.href = 'details.html';
}

async function fetchChartImage() {
    const url = 'https://backend-calculadora.onrender.com/api/chart';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Obtener la URL de la imagen del gráfico
        const imageUrl = data.chartUrl;
        const chartImage = document.getElementById('resultChartImage');
        //chartImage.src = imageUrl;
        chartImage.alt = 'Gráfico de Resultados';

    } catch (error) {
        console.error(error);
        alert('Ocurrió un error al obtener la imagen del gráfico.');
    }
}

// Función para volver a la página anterior
function goBack() {
    window.location.href = 'index.html';
}