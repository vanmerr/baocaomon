import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import style from './Header.module.scss';

import Search from '~/components/Search';
import Navbar from '../Navbar';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

import { getUser } from '~/services/userService';
import { getCart } from '~/services/cartService';
import { isAdmin } from '~/services/authenService';

const cx = classNames.bind(style);

function Header() {
    const [user, setUser] = useState(null);
    const [quantityCart, setQuantityCart] = useState(0);

    const search = (value) => {
        window.location.href = `/search?searchKey=${value}`;
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    if (await isAdmin(token)) window.location.href = '/admin'
                    const result = await getUser(token);
                    const num = await getCart(token);
                    setQuantityCart(num.data.length);
                    setUser(result.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser(); // Call the async function
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('logo')}>CLOCK'S</div>
                <Navbar />
            </div>
            <div className={cx('right')}>
                <Search onSearch={search} />
                <Link to="/user/cart" className={cx('cart')}>
                    <FontAwesomeIcon icon={faShoppingCart} className={cx('icon')} />
                    <span className={cx('quantity')}>{quantityCart}</span>
                </Link>
                <Link to={user ? '/user' : '/authen'} className={cx('authen')}>
                    <img src={user ? user.avartarURL : images.dongho} alt={user ? user.fullName : ''} />
                    <span className={cx('fullname')}> {user ? user.fullName : 'Account'} </span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
