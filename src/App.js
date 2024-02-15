import React from 'react'
import Weather from './components/Weather'
import { ApiProvider } from './context/ContextApi';
import { CityProvider } from './context/ContextCity';

function App() {
  return (
    <CityProvider>
      <ApiProvider>
        <Weather />
      </ApiProvider>
    </CityProvider>
  );
}

export default App;
