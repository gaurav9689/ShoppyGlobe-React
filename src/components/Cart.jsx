import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import "../App.css";
import { calculateTotalPrice } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartList = useSelector((store) => store.cart.items);
  const totalPrice = useSelector((store) => store.cart.totalPrice);

  // Update total price whenever cart changes
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cartList, dispatch]);

  const gotoCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <Header />
      {cartList.length === 0 ? (
        <div className="empty-cart">
          Nothing in the cart. Go to home and add some items to buy
        </div>
      ) : (
        <>
          <div className="cart-item-container">
            {cartList.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateTotalPrice={() => dispatch(calculateTotalPrice())}
              />
            ))}
          </div>

          {totalPrice !== 0 && (
            <div className="total-price-container">
              <p className="total-price">Total Price: ₹{totalPrice.toFixed(2)}</p>
              <button onClick={gotoCheckout} className="place-order-btn">
                Place Order
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
