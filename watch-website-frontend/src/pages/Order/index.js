import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Order.module.scss';
import OrderItem from '~/components/OrderItem';
import { cancelOrder, getOrderByUser } from '~/services/orderService';

const cx = classNames.bind(style);

function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            const token = localStorage.getItem('token');
            try {
                const result = await getOrderByUser(token);
                setOrders(result.data);
            } catch (error) {}
        };
        getOrder();
    }, [orders]);

    const handleCancel = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await cancelOrder(token, id);
            setOrders([]);
        } catch (error) {}
    };
    return (
        <div className={cx('container')}>
            <div className={cx('wapper')}>
                {orders &&
                    orders.length > 0 &&
                    orders.map((order) => <OrderItem order={order} onCancel={handleCancel} />)}
            </div>
        </div>
    );
}

export default Order;
