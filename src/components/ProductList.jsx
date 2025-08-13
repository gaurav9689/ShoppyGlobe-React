import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProductItem from "./ProductItem";
import "../App.css";

function ProductList() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getProducts() {
        try {
            setLoading(true);
            let res = await fetch("https://dummyjson.com/products");
            let data = await res.json();
            setProductList(data.products);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function filterProduct(type) {
        try {
            setLoading(true);
            let res = await fetch("https://dummyjson.com/products");
            let data = await res.json();
            let filteredProd = data.products.filter((item) => item.category === type);
            setProductList(filteredProd);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        let query = e.target.value.trim().toLowerCase();
        if (query === "") {
            getProducts();
            return;
        }
        setProductList((prevList) =>
            prevList.filter((product) =>
                product.title.toLowerCase().includes(query)
            )
        );
    }

    return (
        <div>
            <Header />
            <div className="buttons">
                <input
                    onChange={handleChange}
                    type="text"
                    className="search-input"
                    placeholder="Search for product"
                />
                <button onClick={getProducts}>All</button>
                <button onClick={() => filterProduct("fragrances")}>Fragrances</button>
                <button onClick={() => filterProduct("beauty")}>Beauty</button>
                <button onClick={() => filterProduct("furniture")}>Furniture</button>
                <button onClick={() => filterProduct("groceries")}>Groceries</button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="products-container">
                    {productList.map((product, index) => (
                        <div
                            className="product-card"
                            key={product.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ProductItem product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
