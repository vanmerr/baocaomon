import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './CartItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function CartItem({ cart, onUpdate, onRemove, onCheck }) {
    const [quantityInput, setQuantityInput] = useState(cart.quantity);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setQuantityInput(cart.quantity);
    }, [cart.quantity]);

    const remove = () => {
        onRemove(cart._id);
    };
    const update = (e) => {
        if (quantityInput < 1) {
            setTimeout(() => {
                if (e.target.value < 1){
                    setQuantityInput('1');
                    return alert('Minimum is 1');
                } 
            }, 5000);
        }
        if (e.target.value > cart.productId.quantity) {
            alert('Insufficient product inventory');
            setQuantityInput('1');
            return;
        } else {
            setQuantityInput(e.target.value);
            onUpdate(cart._id, e.target.value);
        }
    };

    const check = (e) => {
        setIsChecked(e.target.checked);
        onCheck(e.target.checked, cart._id);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('check')}>
                <input type="checkbox" name="check-cart" onChange={check} checked={isChecked} />
            </div>
            <div className={cx('image')}>
                <img src={cart.productId.imageURL} alt={cart.productId.name} />
            </div>
            <div className={cx('name')}>
                <span>{cart.productId.name}</span>
            </div>
            <div className={cx('price')}>
                <span>{`$${cart.productId.price}`}</span>
            </div>
            <div className={cx('quantity')}>
                <span>Count</span>
                <input
                    type="number"
                    disabled={isChecked}
                    value={quantityInput}
                    min={1}
                    max={cart.productId.quantity}
                    onChange={update}
                />
                <span> {`Inventory ${cart.productId.quantity}`} </span>
            </div>
            <div className={cx('total')}>
                <span>{`Total $${cart.quantity * cart.productId.price}`}</span>
            </div>
            <div className={cx('remove')} onClick={remove}>
                <FontAwesomeIcon icon={faTrash} className={cx('icon')} />
            </div>
        </div>
    );
}

export default CartItem;
