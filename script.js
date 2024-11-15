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
    } catch (error) {
        console.error(error);
        document.getElementById('result').innerText = 'Ocurrió un error al realizar la petición.';
    }
}