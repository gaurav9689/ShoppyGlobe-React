import React from "react";
import { useSelector } from "react-redux";
import "../App.css"
import { useNavigate } from "react-router-dom";

function Checkout() {

    let navigate = useNavigate();

    let totalPrice = useSelector((store) => store.cart.totalPrice)

    return (
        <div className="">

            <button onClick={() => navigate("/")} className="goto-home">Go to Home Page</button>
            <div className="checkout-container">
            Order Successfully placed of total: <p>{`₹${totalPrice.toFixed(2)}`}</p></div>
            </div>
    )
}


export default Checkout;