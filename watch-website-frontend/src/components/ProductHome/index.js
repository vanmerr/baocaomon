import React, { useState, useEffect } from 'react';
import Product from '../Product';
import Loading from '../Loading';
import style from './ProductHome.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const ProductHome = ({ products }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className={cx('text')}>
                <span>PRODUCTS</span>
            </div>
            <div className={cx('container')}>
                {loading ? (
                    <Loading />
                ) : products.length > 0 ? (
                    <div className={cx(cx('wapper'))}>
                        <div className={cx('products')}>
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default ProductHome;
