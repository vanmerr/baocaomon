import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './UserLayout.module.scss';
import Info from '~/components/InfoUser';
import Loading from '~/components/Loading';
import Header from '~/components/Header';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function UserLayout({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        const token = localStorage.getItem('token');
        if(!token) window.location.href = '/authen'
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cx('container')}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Header />
                    <div className={cx('wrapper')}>
                        <Info />
                        <div className={cx('content')}>
                            <div className={cx('nav')}>
                                <div className={cx('cart-order')}>
                                    <Link to="/user/cart">
                                        <span>Cart</span>
                                    </Link>
                                </div>
                                <div className={cx('cart-order')}>
                                    <Link to="/user/order">
                                        <span>History Order</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('children')}>{children}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserLayout;
