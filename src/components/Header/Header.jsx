import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <nav className="header-nav">
            <div className="logo">DeliveryCatalog</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Produtos</Link>
            </div>
        </nav>
    );
}
