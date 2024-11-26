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

async function fetchTableData(requiredRows = 5) {
    const url = 'https://backend-calculadora.onrender.com/api/table';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requiredRows }), // Enviar el número de filas solicitadas
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
            console.error('Error en backend:', data.error);
            alert(data.error);
            return;
        }
        if (data.dataTable && data.dataTable.length > 0) {
            createTable(data.dataTable); // Crear la tabla con los datos devueltos
        } else {
            console.warn('No hay datos en la tabla');
        }
    } catch (error) {
        console.error('Error al obtener los datos de la tabla:', error);
        alert('Ocurrió un error al obtener los datos de la tabla.');
    } finally {
        loadingScreen.style.display = 'none';
    }
}

let maxRows = 365; // Valor inicial máximo para la frecuencia diaria
const rowCountInput = document.getElementById('rowCount');

// Función para actualizar dinámicamente el título de la tabla
function updateTableTitle(frequency) {
    const columnTitle = document.querySelector('#interestTable thead th:first-child');
    let title = 'Periodo';

    switch (frequency) {
        case 'diario':
            title = 'Día';
            break;
        case 'semanal':
            title = 'Semana';
            break;
        case 'mensual':
            title = 'Mes';
            break;
        case 'trimestral':
            title = 'Trimestre';
            break;
        case 'semestral':
            title = 'Semestre';
            break;
        case 'anual':
            title = 'Año';
            break;
    }

    columnTitle.textContent = title;
}

// Mostrar pantalla de carga y ejecutar funciones al cargar la página
window.onload = () => {
    const defaultRows = 5;
    const frequency = 'diario'; // Valor predeterminado
    updateMaxRows(frequency);
    updateTableTitle(frequency);  // Actualizar título dinámicamente
    loadingScreen.style.display = 'flex';
    fetchChartImage();
    fetchTableData(defaultRows);
};

// Función para crear la tabla dinámica
function createTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Limpia la tabla antes de agregar filas

    data.forEach(row => {
        const tr = document.createElement('tr');

        const periodCell = document.createElement('td');
        periodCell.textContent = row.period; // Usa el periodo tal como se recibe del backend
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

// Función para mostrar el número limitado de filas en la tabla

function updateTableRows() {
    const numRows = parseInt(rowCountInput.value) || 5;
    if (numRows < 1 || numRows > maxRows) {
        alert(`El número de filas debe estar entre 1 y ${maxRows}`);
        rowCountInput.value = 5; // Restablecer al valor predeterminado
        return;
    }
    loadingScreen.style.display = 'flex'; // Mostrar pantalla de carga
    fetchTableData(numRows); // Solicitar el número deseado de filas
}





function updateMaxRows(frequency) {
    switch (frequency) {
        case 'diario':
            maxRows = 365;
            break;
        case 'semanal':
            maxRows = 52;
            break;
        case 'mensual':
            maxRows = 12;
            break;
        case 'trimestral':
            maxRows = 4;
            break;
        case 'semestral':
            maxRows = 2;
            break;
        case 'anual':
            maxRows = 5;
            break;
        default:
            maxRows = 365;
    }
    rowCountInput.max = maxRows; // Actualiza dinámicamente el atributo `max`
}



function goBack() {
    window.location.href = 'index.html';
}

// Mostrar pantalla de carga y ejecutar funciones al cargar la página
window.onload = () => {
    const defaultRows = 5;
    const frequency = 'diario'; // Valor predeterminado
    updateMaxRows(frequency); // Actualizar el máximo permitido según la frecuencia
    loadingScreen.style.display = 'flex';
    fetchChartImage();
    fetchTableData(defaultRows); // Solicitar 5 filas por defecto
};



