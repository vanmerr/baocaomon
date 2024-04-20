import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ManageOrder.module.scss';
import { getAllOrderByAdmin } from '~/services/adminService';
import OrderItem from '../OrderItem';

const cx = classNames.bind(style);

function ManageOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrderAll = async () => {
            const token = localStorage.getItem('token');
            try {
                const result = await getAllOrderByAdmin(token);
                setOrders(result.data);
                console.log(result.data);
            } catch (error) {}
        };

        getOrderAll();
    }, []);

    const handleCancel = (id) => {
        alert('Đang hoàn thiện');
    };
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <span>MANAGE ORDERS</span>
            </div>
            <div className={cx('wapper')}>
                <div className={cx('orders')}>
                    {orders &&
                        orders.length > 0 &&
                        orders.map((order) => <OrderItem order={order} onCancel={handleCancel} />)}
                </div>
            </div>
        </div>
    );
}

export default ManageOrder;
