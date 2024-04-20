import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Authen.module.scss'; // Import file css/scss
import Login from '~/components/Login';
import Register from '~/components/Register';
import { isAdmin, Login as login, Register as register } from '~/services/authenService';

const cx = classNames.bind(style); // Sử dụng classNames để kết hợp css module với scss

const Authen = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = async (data) => {
        const result = await login(data);
        if (result.token) {
            localStorage.setItem('token', result.token);
            if (await isAdmin(result.token)) window.location.href = '/admin';
            else {
                window.location.href = '/';
            }
        } else alert(result.error);
    };

    const handleRegister = async (data) => {
        const result = await register(data);
        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.href = '/user';
        } else alert(result.error);
    };

    return (
        <div className={cx('auth-container')}>
            {isLogin ? <Login onLogin={handleLogin} /> : <Register onRegister={handleRegister} />}
            <p>
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button onClick={handleToggleForm}>{isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}</button>
            </p>
        </div>
    );
};

export default Authen;
