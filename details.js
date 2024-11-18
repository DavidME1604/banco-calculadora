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

const loadingScreen = document.getElementById('loadingScreen');
loadingScreen.style.display = 'flex';
window.onload = fetchChartImage;

// Función para obtener los datos de la tabla desde el backend
async function fetchTableData() {
    // Hacer la solicitud al backend usando fetch
    const url = 'https://backend-calculadora.onrender.com/api/table';
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
        if (data.error) {
            alert(data.error);
        } else {
            createTable(data.dataTable); // Llamar a la función para crear la tabla con los datos recibidos
        }

    } catch (error) {
        console.error('Error al obtener la URL del gráfico:', error);
        alert('Ocurrió un error al obtener la imagen del gráfico.');
    } finally {
        // Ocultar la pantalla de carga
        loadingScreen.style.display = 'none';
    }
}

// Función para crear la tabla dinámica
function createTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Limpiar el contenido existente

    // Iterar sobre los datos recibidos y crear las filas de la tabla
    data.forEach(row => {
        const tr = document.createElement('tr');

        // Crear celdas para cada columna
        const periodCell = document.createElement('td');
        periodCell.textContent = row.period;
        tr.appendChild(periodCell);

        const contributionCell = document.createElement('td');
        contributionCell.textContent = row.contribution;
        tr.appendChild(contributionCell);

        const capitalCell = document.createElement('td');
        capitalCell.textContent = row.capital;
        tr.appendChild(capitalCell);

        const gainCell = document.createElement('td');
        gainCell.textContent = row.gain;
        tr.appendChild(gainCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = row.total;
        tr.appendChild(totalCell);

        // Agregar la fila al cuerpo de la tabla
        tableBody.appendChild(tr);
    });
}



function goBack() {
    window.location.href = 'index.html';
}