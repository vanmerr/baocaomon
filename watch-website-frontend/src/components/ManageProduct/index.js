import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ManageProduct.module.scss';
import FormProduct from '../FormProduct';
import { addProduct, deleteProduct, updateProduct } from '~/services/adminService';
import ProductItem from '../ProductItem';
import { getAllProduct } from '~/services/productService';

const cx = classNames.bind(style);

function ManageProduct() {
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await getAllProduct();
                setProducts(result.data);
            } catch (error) {}
        };

        getProducts();
    }, [products]);

    const toggleForm = () => {
        setShowForm(!showForm);
        setProduct(null);
    };

    const handleAddProduct = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const result = await addProduct(token, formData);
            if (result.data) alert('Add successfully');
            setProducts([...products, result.data]);
            setShowForm(false);
        } catch (error) {
            alert(error);
        }
    };

    const handleDeleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await deleteProduct(token, id);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {}
    };

    const handleEdit = async (id) => {
        try {
            const token = localStorage.getItem('token');
            // Tìm sản phẩm trong mảng products với id tương ứng
            const foundProduct = products.find((product) => product._id === id);
            if (foundProduct) {
                setProduct(foundProduct); // Nếu tìm thấy sản phẩm, set state product với thông tin sản phẩm tìm được
                setShowForm(true); // Hiển thị form chỉnh sửa sản phẩm
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.error('Error getting product:', error);
        }
    };

    const handleUpdateProduct = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            if (!product) {
                console.log('No product selected for update');
                return;
            }
            formData.append('id', product._id);
            const updatedProduct = await updateProduct(token, formData);
            setProducts((prevProducts) =>
                prevProducts.map((prevProduct) =>
                    prevProduct._id === updatedProduct.data._id ? updatedProduct.data : prevProduct,
                ),
            );
            setProduct(null);
            setShowForm(false);
        } catch (error) {
            alert('Error updating product:', error);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('add-product-content')}>
                <div className={cx('add-product')}>
                    <button type="button" className={cx('button')} onClick={toggleForm}>
                        <span className={cx('button__text')}>Add Product</span>
                        <span className={cx('button__icon')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="currentColor"
                                height="24"
                                fill="none"
                                className={cx('svg')}
                            >
                                <line y2="19" y1="5" x2="12" x1="12"></line>
                                <line y2="12" y1="12" x2="19" x1="5"></line>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className={cx('content')}>
                    <span>MANAGE PRODUCTS</span>
                </div>
            </div>
            <div className={cx('wapper')}>
                <div className={cx('products')}>
                    {showForm && (
                        <FormProduct product={product} onUpdate={handleUpdateProduct} onAdd={handleAddProduct} />
                    )}
                    {products.length > 0 &&
                        products.map((product) => (
                            <ProductItem
                                key={product._id}
                                product={product}
                                onUpdate={handleEdit}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ManageProduct;
