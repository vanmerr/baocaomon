import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './AdminLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPager, faFolderClosed, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { isAdmin } from '~/services/authenService';
import Loading from '~/components/Loading';

const cx = classNames.bind(style);

const AdminLayout = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return window.location.href = '/'
            if (token) {
                try {
                    if ((await isAdmin(token)) === false){
                        window.location.href = '/';
                        return alert('Insufficient access rights')
                    } 
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser(); // Call the async function
    }, []);
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    return (
        <div className={cx('admin-layout')}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('admin-sidebar')}>
                        <h2>Admin Panel</h2>
                        <ul>
                            <li>
                                <Link to="/admin/manage-product">
                                    <FontAwesomeIcon icon={faPager} className={cx('icon')} />
                                    <span>Manage Prodcts</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/manage-order">
                                    <FontAwesomeIcon icon={faFolderClosed} className={cx('icon')} />
                                    <span>Manage Orders</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/manage-user">
                                    <FontAwesomeIcon icon={faUsers} className={cx('icon')} />
                                    <span>Manage Users</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={logout}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('admin-content')}>{children}</div>
                </>
            )}
        </div>
    );
};

export default AdminLayout;
