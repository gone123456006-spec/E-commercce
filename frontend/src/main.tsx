import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { hydrateSiteContentFromServer } from './app/services/siteContentService';
import { fetchApiProducts, hydrateApiProductsFromSession } from './app/services/productService';
import './styles/index.css';

hydrateApiProductsFromSession();
void fetchApiProducts();
void hydrateSiteContentFromServer();

createRoot(document.getElementById('root')!).render(<App />);
  