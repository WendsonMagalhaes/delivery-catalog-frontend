# Delivery Catalog Frontend

Aplicacao React que consome a **API publica de produtos** dos servicos **Ze Delivery** e **iFood**, exibindo um catalogo filtravel com imagens, nomes, categorias e servidor de origem.

---

## 📦 Funcionalidades

* ✅ Listagem de produtos com imagens
* 🔎 Filtros por nome, categoria e servidor
* ⬇️ Ordenacao alfabetica crescente/decrescente
* 📷 Exibicao de imagens hospedadas externamente
* 🌐 Consumo de API publica com Axios
* 💅 Interface responsiva e estilizada

---

## 🚀 Tecnologias utilizadas

* [React](https://reactjs.org/)
* [Axios](https://axios-http.com/)
* [CSS Modules](https://reactjs.org/docs/faq-styling.html)
* [Railway](https://railway.app/) (API hospedada)

---

## 🔧 Instalacao

### 1. Clone o repositorio

```bash
git clone https://github.com/seu-usuario/delivery-catalog-frontend.git
cd delivery-catalog-frontend
```

### 2. Instale as dependencias

```bash
npm install
```

### 3. Inicie o servidor local

```bash
npm start
```

A aplicacao sera iniciada em:

```
http://localhost:3000
```

---

## 🌐 API utilizada

A aplicacao consome os dados da seguinte API publica:

```
https://delivery-catalog-api-production.up.railway.app
```

### Principais endpoints:

* `/ze-delivery`
* `/ze-delivery/:id`
* `/ze-delivery/nome/:nome`
* `/ze-delivery/categoria/:categoria`
* `/ifood`
* `/ifood/:id`
* `/ifood/nome/:nome`
* `/ifood/categoria/:categoria`

📄 Acesse a [documentacao Swagger](https://delivery-catalog-api-production.up.railway.app/docs) para mais detalhes.

---

## 📁 Estrutura basica de pastas

```
src/
├── components/
│   └── ProductCard
│       ├── ProductCard.jsx
│       └── ProductCard.css
├── pages/
│   ├── Home
│   │   ├── Home.jsx
│   │   └── Home.css
│   └── Product
│        ├── Product.jsx
│        └── Product.css
│
├── App.js
└── index.js
```

---

## 📜 Licenca

Este projeto esta sob a licenca MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🙋‍♂️ Autor
Desenvolvido por **Wendson Silva**

Entre em contato: [wendson.silva@ccc.ufcg.edu.br](mailto:wendson.silva@ccc.ufcg.edu.br)
