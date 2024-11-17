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


function showDetails() {
    fetchChartImage()
    window.location.href = 'details.html';
}