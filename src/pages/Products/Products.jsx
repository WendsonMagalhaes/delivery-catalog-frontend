import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const API_BASE = 'https://delivery-catalog-api-production.up.railway.app';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filterNome, setFilterNome] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterServidor, setFilterServidor] = useState('all');
    const [orderAsc, setOrderAsc] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const [zeRes, ifoodRes] = await Promise.all([
                axios.get(`${API_BASE}/ze-delivery`),
                axios.get(`${API_BASE}/ifood`),
            ]);

            const zeProducts = zeRes.data.map(p => ({ ...p, servidor: 'Zé Delivery' }));
            const ifoodProducts = ifoodRes.data.map(p => ({ ...p, servidor: 'iFood' }));

            setProducts([...zeProducts, ...ifoodProducts]);
        } catch (err) {
            setError('Erro ao carregar produtos');
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filtered = products
        .filter(p =>
            (filterNome === '' || p.nome.toLowerCase().includes(filterNome.toLowerCase())) &&
            (filterCategoria === '' || (p.categoria && p.categoria.toLowerCase().includes(filterCategoria.toLowerCase()))) &&
            (filterServidor === 'all' || p.servidor === filterServidor)
        )
        .sort((a, b) => {
            if (a.nome.toLowerCase() < b.nome.toLowerCase()) return orderAsc ? -1 : 1;
            if (a.nome.toLowerCase() > b.nome.toLowerCase()) return orderAsc ? 1 : -1;
            return 0;
        });

    return (
        <div className="products-container">
            <h1 className="products-title">Produtos</h1>

            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={filterNome}
                    onChange={e => setFilterNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filtrar por categoria"
                    value={filterCategoria}
                    onChange={e => setFilterCategoria(e.target.value)}
                />
                <select
                    value={filterServidor}
                    onChange={e => setFilterServidor(e.target.value)}
                >
                    <option value="all">Todos servidores</option>
                    <option value="Zé Delivery">Zé Delivery</option>
                    <option value="iFood">iFood</option>
                </select>
                <button onClick={() => setOrderAsc(!orderAsc)}>
                    Ordenar: {orderAsc ? 'A → Z' : 'Z → A'}
                </button>
            </div>

            {loading && <p>Carregando produtos...</p>}
            {error && <p className="error">{error}</p>}

            <div className="products-grid">
                {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
