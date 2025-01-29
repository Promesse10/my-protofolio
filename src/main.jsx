
import { createRoot } from 'react-dom/client'; 


import App from './App'; 
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Wrap the App component with the Provider
root.render(

    <App />

);
