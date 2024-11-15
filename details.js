// Hacer la petición al servidor al cargar la página
document.addEventListener('DOMContentLoaded', fetchChartImage);

async function fetchChartImage() {
    const url = 'https://backend-calculadora.onrender.com/api/chart';

    try {
        const response = await fetch(url, {
            method: 'GET',
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
        chartImage.src = imageUrl;
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
