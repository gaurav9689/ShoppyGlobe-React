import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import "../App.css";

function ProductItem({ product }) {
  const { id, images, brand, title, price, originalPrice, discountPercentage, stock } = product;
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddItem = () => {
    if (stock > 0) {
      dispatch(addItem(product));
      setIsAdded(true);
      setShowPopup(true);

      setTimeout(() => setIsAdded(false), 1500);
      setTimeout(() => setShowPopup(false), 2000);

      console.log("Item added successfully");
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="product-card">
      {/* Popup message */}
      {showPopup && (
        <div className="popup-message">
          🛒 Product added to cart!
        </div>
      )}

      <div className="product-card__image-wrapper">
        <img
          src={images || "/placeholder.jpg"}
          alt={title}
          className="product-card__image"
        />
      </div>

      <div className="product-card__info">
        <h3 className="product-card__brand">{brand}</h3>
        <p className="product-card__title">
          {title.length > 25 ? `${title.slice(0, 25)}...` : title}
        </p>

        <div className="product-card__price-section">
          <span className="product-card__price">{formatCurrency(price)}</span>
          {originalPrice && (
            <span className="product-card__original-price">
              {formatCurrency(originalPrice)}
            </span>
          )}
          <span className="product-card__discount">{discountPercentage}% off</span>
        </div>

        {stock <= 3 && stock > 0 && (
          <div className="product-card__stock-warning">
            Only {stock} left!
          </div>
        )}
        {stock === 0 && (
          <div className="product-card__out-of-stock">Out of Stock</div>
        )}
      </div>

      <div className="product-card__actions">
        <Link className="product-card__link" to={`/productDetail/${id}`}>
          View Details
        </Link>
        <button
          className={`product-card__button ${isAdded ? "added" : ""}`}
          onClick={handleAddItem}
          disabled={stock === 0}
        >
          {isAdded ? "✔ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.string,
    brand: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discountPercentage: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
