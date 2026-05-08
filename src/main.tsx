import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('❌ #root not found!');
    throw new Error('Root element missing');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('💥 React app failed to render:', error);
  document.body.innerHTML = `
    <div style="padding: 40px; background: #1a1a1a; color: #fff; text-align: center;">
      <h1>❌ Erro ao carregar o app</h1>
      <p>${String(error)}</p>
      <p>Consulte o console (F12) para mais detalhes</p>
    </div>
  `;
}
