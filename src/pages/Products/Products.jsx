import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const API_BASE = 'https://delivery-catalog-api-production.up.railway.app';
const ITEMS_PER_PAGE = 50; // aumentei para 50

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filterNome, setFilterNome] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterServidor, setFilterServidor] = useState('all');
    const [orderAsc, setOrderAsc] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="products-container">
            <h1 className="products-title">Produtos</h1>

            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={filterNome}
                    onChange={e => {
                        setFilterNome(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <input
                    type="text"
                    placeholder="Filtrar por categoria"
                    value={filterCategoria}
                    onChange={e => {
                        setFilterCategoria(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <select
                    value={filterServidor}
                    onChange={e => {
                        setFilterServidor(e.target.value);
                        setCurrentPage(1);
                    }}
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
                {paginated.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filtered.length > ITEMS_PER_PAGE && (
                <div className="pagination">
                    <button onClick={goToPrevious} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={goToNext} disabled={currentPage === totalPages}>Próxima</button>
                </div>
            )}
        </div>
    );
}
