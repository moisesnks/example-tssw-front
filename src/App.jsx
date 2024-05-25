import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export function App() {
  // Definición de estados
  const [cryptoPrices, setCryptoPrices] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [individualPrice, setIndividualPrice] = useState(null);

  // Efecto para cargar los precios de criptomonedas al montar el componente
  useEffect(() => {
    fetch('https://template-go-vercel-xi-two.vercel.app/api/cryptoprices')
      .then(response => response.json())
      .then(data => setCryptoPrices(Object.keys(data)))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  // Función para manejar cambios en la selección de símbolo
  const handleSymbolChange = (selectedOption) => {
    setSelectedSymbol(selectedOption.value);
  };

  // Función para obtener el precio individual de una criptomoneda
  const handleGetPrice = () => {
    fetch(`https://template-go-vercel-xi-two.vercel.app/api/cryptoprice/?symbol=${selectedSymbol}`)
      .then(response => response.json())
      .then(data => setIndividualPrice(data[selectedSymbol]))
      .catch(error => console.error('Error al obtener datos:', error));
  };

  // Transformar datos para React-Select
  const options = cryptoPrices && cryptoPrices.map(symbol => ({ value: symbol, label: symbol }));

  // Renderizado del componente
  return (
    <div>
      <p> Este es un ejemplo de
        cómo consumir la API, en este caso de criptomonedas,
        utilizando React.
      </p>
      <h1>Datos de Criptomonedas</h1>

      <h2>Los 10 Mejores Precios de Criptomonedas</h2>
      {cryptoPrices && (
        <ul>
          {cryptoPrices.slice(0, 10).map(symbol => (
            <li key={symbol}>{symbol}: {cryptoPrices[symbol]}</li>
          ))}
        </ul>
      )}

      <h2>Obtener Precio Individual de Criptomoneda</h2>
      <Select
        options={options}
        value={options ? options.find(option => option.value === selectedSymbol) : null}
        onChange={handleSymbolChange}
        placeholder="Seleccionar una criptomoneda"
      />
      <button onClick={handleGetPrice}>Obtener Precio</button>
      {individualPrice && (
        <p>El precio de {selectedSymbol} es: {individualPrice}</p>
      )}
    </div>
  );
}

export default App;
