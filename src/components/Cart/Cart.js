import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if(total > 500){
        shipping = 0;
    } else if(total > 300){
        shipping = 30;
    } else if(total > 100){
        shipping = 20;
    } else if(total> 0){
        shipping = 10;
    } else{
        shipping = 0;
    }
    const tax = total / 10;
    const grandTotal = total + shipping + tax;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {formatNumber(shipping)}</small></p>
            <p><small>Tax & VAT: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            { props.children }
        </div>
    );
};

export default Cart;