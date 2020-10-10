import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    document.title = "Product Details - Ema John";
    const { productKey } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch('https://mighty-wave-40905.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
    }, [productKey])
    return (
        <div>
            <h1>{productKey} Details coming soooooooooon.</h1>
            {
                loading ? <p>Loading...</p> : <Product showAddToCart = {false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;