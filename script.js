function calculateInterest() {
    const frequency = document.getElementById('frequency').value;

    if ((frequency === 'diario' &&  numPeriods<=365)||(frequency === 'semanal' &&  numPeriods<=52)||(frequency === 'mensual' &&  numPeriods<=12)||(frequency === 'timestral' &&  numPeriods<=4)||(frequency === 'semestral' &&  numPeriods<=2)||(frequency === 'anual' &&  numPeriods<=1)){
        fetchInterest();
    }else{
        alert('El número de períodos debe ser igual al número de períodos de la frecuencia de aporte');
    }

}

async function fetchInterest() {
    const url = 'https://backend-calculadora.onrender.com//api/calculate';
    const initialCapital = document.getElementById('initialCapital').value;
    const periodicContribution = document.getElementById('periodicContribution').value;
    const finalCapital = document.getElementById('finalCapital').value;
    const numPeriods = document.getElementById('numPeriods').value;
    const loadingScreen = document.getElementById('loadingScreen');
    const frequency = document.getElementById('frequency').value;
    loadingScreen.style.display = 'flex';
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
                numPeriods: numPeriods,
                frequency: frequency
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
        loadingScreen.style.display = 'none';
        alert('Ocurrió un error al hacer la petición')
    } finally {
        // Ocultar la pantalla de carga
        loadingScreen.style.display = 'none';
    }
}



loadingScreen.style.display = 'none';


function showDetails() {
    window.location.href = 'details.html';
}