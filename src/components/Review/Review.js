import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    document.title = "Review - Ema John";
    const [cart, setCart] = useState([]);
    const [placedOrder, setPlacedOrder] = useState(false)
    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://mighty-wave-40905.herokuapp.com/productsbykeys', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const cartProducts = productKey.map( key => {
        //     const products = fakeData.find(pd => pd.key === key);
        //     products.quantity = savedCart[key];
        //     return products;
        // });
        // setCart(cartProducts);
    }, [])
    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const history = useHistory()
    const handleProcedCart = () => {
        history.push('/shipment');
    }
    let thankyou;
    if(placedOrder){
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems product={pd} key={pd.key} handleRemoveItem={handleRemoveItem}></ReviewItems>)
                }
                { thankyou }
            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProcedCart} className="main-button">Proced Cart</button>
                    </Cart>
            </div>
        </div>
    );
};

export default Review;