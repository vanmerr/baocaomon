import React from 'react';
import classNames from 'classnames/bind';
import style from './Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addProductToCart } from '~/services/productService';

const cx = classNames.bind(style);

const Product = ({ product }) => {
    const token = localStorage.getItem('token');
    const body = {
        productId: product._id,
        quantity: 1,
    };
    const addProduct = async () => {
        if (!token) {
            alert('Please log in');
            window.location.href = '/authen';
        }
        const result = await addProductToCart(token, body);
        if (result.data) alert('Add product to cart sucessfully');
        window.location.reload();
    };
    return (
        <div className={cx('card')}>
            <div className={cx('add-cart')} onClick={addProduct}>
                <FontAwesomeIcon icon={faCartPlus} className={cx('icon-add-cart')} />
            </div>
            <div className={cx('product')}>
                <div className={cx('product-image')}>
                    <img src={product.imageURL} alt={product.name} />
                </div>
                <div className={cx('product-name')}>
                    <span>{`${product.name}jhscjksdhfjdsfdgdfgggggggggg`}</span>
                </div>
                <div className={cx('product-price')}>
                    <span>{`$${product.price}`}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
