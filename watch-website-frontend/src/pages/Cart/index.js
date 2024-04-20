import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import CartItem from '~/components/CartItem';
import { getCart, updateCart, deleteCart } from '~/services/cartService';
import { orderProduct } from '~/services/orderService';

const cx = classNames.bind(style);

function Cart() {
    const [carts, setCarts] = useState([]);
    const [totalAll, setTotalAll] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            const token = localStorage.getItem('token');
            try {
                const response = await getCart(token);
                setCarts(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        }

        fetchCart();
    }, []);

    const handleUpdate = async (id, quantity) => {
        try {
            const token = localStorage.getItem('token');
            const body = {
                id,
                quantity,
            };
            const response = await updateCart(token, body);

            if (response && response.data) {
                const updatedCart = response.data;
                setCarts((prevCarts) =>
                    prevCarts.map((cart) => {
                        if (cart._id === updatedCart._id) {
                            return updatedCart;
                        } else {
                            return cart;
                        }
                    }),
                );
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await deleteCart(token, id);
            setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    const handleCheck = async (bol, id) => {
        const selectedCart = carts.find((cart) => cart._id === id);
        if (bol) {
            setTotalAll((prevTotal) => prevTotal + selectedCart.quantity * selectedCart.productId.price);
            setSelectedItems((prevItems) => [
                ...prevItems,
                { productId: selectedCart.productId._id, quantity: selectedCart.quantity },
            ]);
        } else {
            setTotalAll((prevTotal) => prevTotal - selectedCart.quantity * selectedCart.productId.price);
            setSelectedItems((prevItems) => prevItems.filter((item) => item.productId !== selectedCart.productId._id));
        }
    };

    const handleOrder = async () => {
        const token = localStorage.getItem('token');
        const body = {
            items: selectedItems,
        };
        try {
            const result = await orderProduct(token, body);
            if (result.data) window.location.href = '/user/order'
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                {carts &&
                    carts.length > 0 &&
                    carts.map((cart) => (
                        <CartItem
                            key={cart._id}
                            cart={cart}
                            onUpdate={handleUpdate}
                            onRemove={handleDelete}
                            onCheck={handleCheck}
                        />
                    ))}
            </div>
            <div className={cx('fooder-cart')}>
                <div className={cx('check-all')}>
                    <input type="checkbox" name="check-all" />
                    <span>Select all</span>
                </div>
                <div className={cx('total-all')}>
                    <span>{`Total all : $${totalAll}`}</span>
                </div>
                <div className={cx('order')}>
                    <button onClick={handleOrder}>Order</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
