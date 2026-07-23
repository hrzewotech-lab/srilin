import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes/AppRouter';
import LoadingScreen from './components/LoadingScreen';
import { SiteContentProvider } from './context/SiteContentContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HelmetProvider>
      <SiteContentProvider>
        <BrowserRouter>
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          {!isLoading && <AppRouter />}
        </BrowserRouter>
      </SiteContentProvider>
    </HelmetProvider>
  );
}

export default App;
