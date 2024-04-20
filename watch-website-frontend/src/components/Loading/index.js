// Loading.js
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles)

const Loading = () => {
  return (
    <div className={cx('loader')}>
      <div className={cx('loaderBar')}></div>
      <div className={cx('loaderBox')}></div>
    </div>
  );
};

export default Loading;
