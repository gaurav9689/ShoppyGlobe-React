import React, { useState } from "react";
import "../App.css";
import { incrementQuantity, decrementQuantity, removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

function CartItem({ item, updateTotalPrice }) {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const quantity = Math.min(item.quantity, item.stock);
  const priceAfterDiscount = item.price - item.price * (item.discountPercentage / 100);

  const handleIncrement = () => {
    if (item.stock > item.quantity) {
      dispatch(incrementQuantity(item.id));
      updateTotalPrice();
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item.id));
      updateTotalPrice();
    }
  };

  const handleDelete = () => {
    setIsRemoving(true);
    setShowToast(true);
    setTimeout(() => dispatch(removeItem(item.id)), 300); // matches fade-out
    setTimeout(() => setShowToast(false), 2000); // hide toast after 2s
  };

  return (
    <>
      {showToast && <div className="toast-message">✅ Item removed successfully</div>}

      <div className={`item-container ${isRemoving ? "fade-out" : ""}`}>
        <div className="item-info">
          <p className="item-title">{item.title || "Untitled"}</p>
          <p className="item-description">{item.description || "No description"}</p>
          <p className="item-category">Category: {item.category}</p>
          <p className="item-brand">Brand: {item.brand}</p>
          <img className="item-thumbnail" src={item.thumbnail} alt={item.title} />
        </div>

        <div className="item-pricing">
          <p>Price: ${item.price}</p>
          <p>Discount: {item.discountPercentage}%</p>
          <p>Final Price: ${priceAfterDiscount.toFixed(2)}</p>
          <p>Stock: {item.stock}</p>
        </div>

        <div className="item-details">
          <p>Weight: {item.weight} lbs</p>
          <p className="item-warranty">Warranty: {item.warrantyInformation}</p>
          <p className="item-shipping">Shipping: {item.shippingInformation}</p>
          <p className="item-policy">Return: {item.returnPolicy}</p>
        </div>

        <div className="item-meta">
          <p className="item-barcode">Barcode: {item.meta?.barcode}</p>
          {item.meta?.qrCode && <img className="item-qrcode" src={item.meta.qrCode} alt="QR Code" />}
        </div>

        <div className="item-order">
          <button onClick={handleIncrement} className="action-btn">+</button>
          <button onClick={handleDecrement} className="action-btn">-</button>
          <button onClick={handleDelete} className="remove-btn">Remove Item</button>
          <p>Quantity: {quantity}</p>
          <p className="total-price">Total Price: ${(priceAfterDiscount * quantity).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}

export default CartItem;
