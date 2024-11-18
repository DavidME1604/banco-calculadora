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

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const imageUrl = data.chartUrl;

        const chartImage = document.getElementById('resultChartImage');
        chartImage.src = imageUrl;
        chartImage.alt = 'Gráfico de Resultados';
        console.log(`URL de la imagen obtenida: ${imageUrl}`);

    } catch (error) {
        console.error('Error al obtener la URL del gráfico:', error);
        alert('Ocurrió un error al obtener la imagen del gráfico.');
    } finally {
        loadingScreen.style.display = 'none';
    }
}

// Función para obtener los datos de la tabla desde el backend
async function fetchTableData() {
    const url = 'https://backend-calculadora.onrender.com/api/table';

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

        if (!Array.isArray(data) || data.length === 0) {
            console.error('Los datos no son válidos o están vacíos:', data);
            alert('No hay datos disponibles para mostrar en la tabla.');
            return;
        }

        if (data.error) {
            alert(data.error);
        } else {
            createTable(data.dataTable);
        }

    } catch (error) {
        console.error('Error al obtener los datos de la tabla:', error);
        alert('Ocurrió un error al obtener los datos de la tabla.');
    } finally {
        loadingScreen.style.display = 'none';
    }
}

// Función para crear la tabla dinámica
function createTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');

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

        tableBody.appendChild(tr);
    });
}

function goBack() {
    window.location.href = 'index.html';
}

// Mostrar pantalla de carga y ejecutar funciones al cargar la página
window.onload = () => {
    loadingScreen.style.display = 'flex';
    fetchChartImage();
    fetchTableData();
};
