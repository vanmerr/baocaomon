import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '../../components/Header';
import Home from '~/pages/Home';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {/* {isHomeChild && React.cloneElement(children, { searchKeyword: searchKeyword })} */}
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
