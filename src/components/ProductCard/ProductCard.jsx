import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <h4 className="product-id">ID: {product.id}</h4>

            {product.url_imagem_hospedada && (
                <img
                    src={product.url_imagem_hospedada}
                    alt={product.nome}
                    className="product-image"
                />
            )}
            <h3 className="product-title">{product.nome}</h3>
            <p className="product-description">{product.descricao || 'Sem descrição'}</p>
            <p className="product-category">
                Categoria: <span>{product.categoria || '-'}</span>
            </p>
            <p className="product-subcategory">
                Subcategoria: <span>{product.subcategoria || '-'}</span>
            </p>
            <p className="product-servidor">Servidor: {product.servidor}</p>
        </div>
    );
}
