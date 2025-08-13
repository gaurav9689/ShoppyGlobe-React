import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function ProductDetail() {
  const [product, setProduct] = useState(null); // null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  async function getProduct() {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      let prod = await response.json();
      setProduct(prod);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading)
    return (
      <div className="productDetails-container">
        <div className="skeleton-title"></div>
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
        <div className="skeleton-description"></div>
      </div>
    );

  if (error)
    return (
      <div className="productDetails-container">
        <p className="error">Error: {error}</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Products
        </button>
      </div>
    );

  if (!product) return null;

  return (
    <div className="productDetails-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      <div className="productDetails">
        <h2>{product.title}</h2>
        <img
          height="400"
          src={product.images ? product.images[0] : ""}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
          <p>
            <strong>Discount:</strong> {product.discountPercentage}%
          </p>
          <p>
            <strong>In Stock:</strong> {product.stock}
          </p>
        </div>
        <p className="description">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
