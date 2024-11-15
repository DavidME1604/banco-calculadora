async function calculate() {
    const inputValue = document.getElementById('inputValue').value;

    // URL de tu backend desplegado en Render
    const url = 'https://https://backend-calculadora.onrender.com/api/calculate';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: Number(inputValue) }),
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
