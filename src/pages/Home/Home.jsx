import React from 'react';
import './Home.css';

const API_BASE = 'https://delivery-catalog-api-production.up.railway.app';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Delivery Catalog API</h1>
            <p className="intro">
                API pública com catálogo de produtos do <strong>Zé Delivery</strong> e <strong>iFood</strong>,
                com imagens e dados atualizados em tempo real.
            </p>

            <h2>Como usar a API</h2>
            <p>Base URL pública:</p>
            <code className="code-block">{API_BASE}</code>

            <h3>Endpoints públicos:</h3>
            <ul className="endpoint-list">
                <li><a href={`${API_BASE}/ze-delivery`} target="_blank" rel="noreferrer">GET /ze-delivery</a> — Lista todos os produtos Zé Delivery</li>
                <li><a href={`${API_BASE}/ze-delivery/1`} target="_blank" rel="noreferrer">GET /ze-delivery/:id</a> — Produto por ID</li>
                <li><a href={`${API_BASE}/ze-delivery/nome/cerveja`} target="_blank" rel="noreferrer">GET /ze-delivery/nome/:nome</a> — Buscar por nome</li>
                <li><a href={`${API_BASE}/ze-delivery/categoria/pilsen`} target="_blank" rel="noreferrer">GET /ze-delivery/categoria/:categoria</a> — Buscar por categoria</li>
                <li><a href={`${API_BASE}/ifood`} target="_blank" rel="noreferrer">GET /ifood</a> — Lista todos os produtos iFood</li>
                <li><a href={`${API_BASE}/ifood/1`} target="_blank" rel="noreferrer">GET /ifood/:id</a> — Produto por ID</li>
                <li><a href={`${API_BASE}/ifood/nome/vinho`} target="_blank" rel="noreferrer">GET /ifood/nome/:nome</a> — Buscar por nome</li>
                <li><a href={`${API_BASE}/ifood/categoria/espumante`} target="_blank" rel="noreferrer">GET /ifood/categoria/:categoria</a> — Buscar por categoria</li>
            </ul>

            <h3>Documentação Swagger:</h3>
            <a href={`${API_BASE}/docs`} target="_blank" rel="noreferrer" className="swagger-link">Acesse aqui</a>
        </div>
    );
}
