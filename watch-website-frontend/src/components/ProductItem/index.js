import React from 'react';
import classNames from 'classnames/bind';
import style from './ProductItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function ProductItem({ product, onDelete, onUpdate }) {
    const handleDelete = () => {
        onDelete(product._id)
    }

    const handleUpdate = () => {
        onUpdate(product._id)
    }
    return (
        <div className={cx('container')}>
            <div className={cx('image')}>
                <img src={product.imageURL} alt={product.name} />
            </div>
            <div className={cx('name')}>
                <span>{product.name}</span>
            </div>
            <div className={cx('price')}>
                <span>{`$${product.price}`}</span>
            </div>
            <div className={cx('quantity')}>
                <span> {`Inventory: ${product.quantity}`} </span>
            </div>
            <div className={cx('category')}>
                <span>{`Category: ${product.category}`}</span>
            </div>
            <div className={cx('brand')}>
                <span>{`Brand: ${product.brand}`}</span>
            </div>
            <div className={cx('edit')}>
                <FontAwesomeIcon icon={faEdit} className={cx('icon')} onClick={handleUpdate} />
            </div>
            <div className={cx('remove')}>
                <FontAwesomeIcon icon={faTrash} className={cx('icon')} onClick={handleDelete}/>
            </div>
        </div>
    );
}

export default ProductItem;
