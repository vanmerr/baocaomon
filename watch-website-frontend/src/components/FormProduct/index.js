import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './FormProduct.module.scss';

const cx = classNames.bind(style);

function AddProductForm({ product, onAdd, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        category: '',
        description: '',
        quantity: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                brand: product.brand || '',
                price: product.price || '',
                category: product.category || '',
                description: product.description || '',
                quantity: product.quantity || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        if (product) onUpdate(formData);
        else onAdd(formData);
        form.reset();
    };

    return (
        <div className={cx('container')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        required
                        placeholder="Enter name product"
                    />
                </div>
                <div className={cx('form-group')}>
                    <select name="brand" onChange={handleChange} value={formData.brand} required>
                        <option value="">Select brand</option>
                        <option value="Rolex">Rolex</option>
                        <option value="Cartier">Cartier</option>
                        <option value="Audemars Piguet">Audemars Piguet</option>
                        <option value="Patek Philippe">Patek Philippe</option>
                        <option value="Jaeger-LeCoultre">Jaeger-LeCoultre</option>
                        <option value="Calvin Klein">Calvin Klein</option>
                        <option value="Longines">Longines</option>
                        <option value="Mido">Mido</option>
                        <option value="Timexr">Timexr</option>
                        <option value="Ogival">Ogival</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        required
                        placeholder="Enter price"
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <input type="file" accept="image/*" name="images" />
                </div>
                <div className={cx('form-group')}>
                    <select name="category" onChange={handleChange} value={formData.category} required>
                        <option value="">Select category</option>
                        <option value="Watch">Watch</option>
                        <option value="Smartwatch">Smartwatch</option>
                        <option value="Wall Clock">Wall Clock</option>
                        <option value="Pocket Watch">Pocket Watch</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Enter description"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        onChange={handleChange}
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm;
