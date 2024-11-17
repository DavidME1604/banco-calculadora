// Función para obtener la URL del gráfico y actualizar la imagen
async function fetchChartImage() {
    const url = 'https://backend-calculadora.onrender.com/api/chart';
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';
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
        const chartImage = document.getElementById('resultChartImage');
        chartImage.src = 'https://backend-calculadora.onrender.com/static/grafico_funcion.png';
        chartImage.alt = 'Gráfico de Resultados';
        console.log(`URL de la imagen obtenida: ${imageUrl}`);

    } catch (error) {
        console.error('Error al obtener la URL del gráfico:', error);
        alert('Ocurrió un error al obtener la imagen del gráfico.');
    } finally {
        // Ocultar la pantalla de carga
        loadingScreen.style.display = 'none';
    }
}

window.onload = fetchChartImage;
function goBack() {
    window.location.href = 'index.html';
}