import React from 'react';
import classNames from 'classnames/bind';
import style from './OrderItem.module.scss';

const cx = classNames.bind(style);

function OrderItem({ order, onCancel }) {
    const handleCancel = () => {
        onCancel(order._id);
    };

    return (
        <div className={cx('container')}>
            <ul className={cx('listProduct')}>
                <ul className={cx('listProduct')}>
                    {order.items.map((item) => (
                        <li className={cx('itemProduct')} key={item._id}>
                            <div className={cx('image')}>
                                <img src={item.productId.imageURL} alt={item.productId.name} />
                            </div>
                            <span className={cx('name')}>{item.productId.name}</span>
                            <span className={cx('price')}>{`$${item.productId.price * item.quantity}`}</span>
                        </li>
                    ))}
                </ul>
            </ul>
            <span className={cx('failed')} style={{ display: order.status === 'Failed' ? 'flex' : 'none' }}>
                Failed
            </span>
            <span className={cx('completed')} style={{ display: order.status === 'Completed' ? 'flex' : 'none' }}>
                Completed
            </span>
            <div
                style={{ display: order.status === 'Pending' ? 'flex' : 'none' }}
                className={cx('cancel')}
                onClick={handleCancel}
            >
                <span>Cancel</span>
            </div>
        </div>
    );
}

export default OrderItem;
