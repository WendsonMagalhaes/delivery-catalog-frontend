import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';
import Header from '../../components/Header/Header'


const API_BASE = 'https://delivery-catalog-api-production.up.railway.app';
const ITEMS_PER_PAGE = 50;

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filterNome, setFilterNome] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterSubcategoria, setFilterSubcategoria] = useState('');
    const [filterServidor, setFilterServidor] = useState('all');
    const [orderAsc, setOrderAsc] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Buscar produtos da API
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

    // Monta lista única de categorias dos produtos carregados
    const categoriasLista = Array.from(new Set(products.map(p => p.categoria).filter(Boolean))).sort();

    // Monta lista única de subcategorias que existem dentro da categoria selecionada
    const subcategoriasLista = filterCategoria
        ? Array.from(
            new Set(
                products
                    .filter(p => p.categoria === filterCategoria)
                    .map(p => p.subcategoria)
                    .filter(Boolean)
            )
        ).sort()
        : [];

    // Filtragem
    const filtered = products
        .filter(p => {
            const nomeMatch = filterNome === '' || p.nome.toLowerCase().includes(filterNome.toLowerCase());
            const categoriaMatch = filterCategoria === '' || p.categoria === filterCategoria;
            const subcategoriaMatch = filterSubcategoria === '' || p.subcategoria === filterSubcategoria;
            const servidorMatch = filterServidor === 'all' || p.servidor === filterServidor;

            return nomeMatch && categoriaMatch && subcategoriaMatch && servidorMatch;
        })
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
        <div className="products">
            <Header />
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

                    <select
                        value={filterCategoria}
                        onChange={e => {
                            setFilterCategoria(e.target.value);
                            setFilterSubcategoria('');
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Todas categorias</option>
                        {categoriasLista.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={filterSubcategoria}
                        onChange={e => {
                            setFilterSubcategoria(e.target.value);
                            setCurrentPage(1);
                        }}
                        disabled={!filterCategoria}
                    >
                        <option value="">Todas subcategorias</option>
                        {subcategoriasLista.map(subcat => (
                            <option key={subcat} value={subcat}>{subcat}</option>
                        ))}
                    </select>

                    <select
                        value={filterServidor}
                        onChange={e => {
                            setFilterServidor(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">Todos servidores</option>
                        <option value="Zé Delivery">Zé Delivery</option>
                        <option value="iFood">IFood</option>
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
        </div>
    );
}
