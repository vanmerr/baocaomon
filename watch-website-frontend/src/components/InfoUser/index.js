import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './InfoUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilSquare, faCheck, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '~/services/userService';

const cx = classNames.bind(style);

const ManageAccount = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [editMode, setEditMode] = useState({
        fullName: false,
        email: false,
        phone: false,
        address: false,
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const result = await getUser(token);
                    setUserData(result.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };
        fetchUser();
    }, []);

    const handleEdit = (field) => {
        setEditMode({
            ...editMode,
            [field]: true,
        });
    };

    const handleSave = async (field) => {
        const token = localStorage.getItem('token');
        setEditMode({
            ...editMode,
            [field]: false,
        });
        const result = await updateUser(token, userData);
        if (result.data) alert('Update successfully');
        else alert('Failed');
    };

    const handleChange = (e, field) => {
        setUserData({
            ...userData,
            [field]: e.target.value,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className={cx('container-fluid')}>
            <div className={cx('row', 'justify-content-center')}>
                <div className={cx('col-md-6', 'login-container')}>
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h3 className={cx('text-center')}>Manage Account</h3>
                        </div>
                        <div className={cx('card-body')}>
                            <div className={cx('group-btn')}>
                                <form className={cx('editable-field')} onSubmit={(e) => e.preventDefault()}>
                                    <span id="nameValue" className={cx('text-value')}>
                                        Name
                                    </span>
                                    <input
                                        id="nameEdit"
                                        type="text"
                                        className={cx('edit-input')}
                                        style={{ width: '100%' }}
                                        value={userData.fullName}
                                        onChange={(e) => handleChange(e, 'fullName')}
                                        disabled={!editMode.fullName}
                                    />
                                    <FontAwesomeIcon
                                        icon={editMode.fullName ? faCheck : faPencilSquare}
                                        className={cx('edit-icon')}
                                        onClick={() =>
                                            editMode.fullName ? handleSave('fullName') : handleEdit('fullName')
                                        }
                                    />
                                </form>
                            </div>
                            <div className={cx('group-btn')}>
                                <form className={cx('editable-field')} onSubmit={(e) => e.preventDefault()}>
                                    <span id="emailValue" className={cx('text-value')}>
                                        Email
                                    </span>
                                    <input
                                        id="emailEdit"
                                        type="email"
                                        className={cx('edit-input')}
                                        style={{ width: '100%' }}
                                        value={userData.email}
                                        onChange={(e) => handleChange(e, 'email')}
                                        disabled={!editMode.email}
                                    />
                                    <FontAwesomeIcon
                                        icon={editMode.email ? faCheck : faPencilSquare}
                                        className={cx('edit-icon')}
                                        onClick={() => (editMode.email ? handleSave('email') : handleEdit('email'))}
                                    />
                                </form>
                            </div>
                            <div className={cx('group-btn')}>
                                <form className={cx('editable-field')} onSubmit={(e) => e.preventDefault()}>
                                    <span id="phoneValue" className={cx('text-value')}>
                                        Phone
                                    </span>
                                    <input
                                        id="phoneEdit"
                                        type="text"
                                        className={cx('edit-input')}
                                        style={{ width: '100%' }}
                                        value={userData.phoneNumber}
                                        onChange={(e) => handleChange(e, 'phone')}
                                        disabled={!editMode.phone}
                                    />
                                    <FontAwesomeIcon
                                        icon={editMode.phone ? faCheck : faPencilSquare}
                                        className={cx('edit-icon')}
                                        onClick={() => (editMode.phone ? handleSave('phone') : handleEdit('phone'))}
                                    />
                                </form>
                            </div>
                            <div className={cx('group-btn')}>
                                <form className={cx('editable-field')} onSubmit={(e) => e.preventDefault()}>
                                    <span id="addressValue" className={cx('text-value')}>
                                        Address
                                    </span>
                                    <input
                                        id="addressEdit"
                                        type="text"
                                        className={cx('edit-input')}
                                        style={{ width: '80%' }}
                                        value={userData.address}
                                        onChange={(e) => handleChange(e, 'address')}
                                        disabled={!editMode.address}
                                    />
                                    <FontAwesomeIcon
                                        icon={editMode.address ? faCheck : faPencilSquare}
                                        className={cx('edit-icon')}
                                        onClick={() =>
                                            editMode.address ? handleSave('address') : handleEdit('address')
                                        }
                                    />
                                </form>
                            </div>
                            <div className={cx('group-btn')}>
                                <button className={cx('btn', 'btn-primary')} onClick={handleLogout}>
                                    Đăng xuất
                                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('text-danger')} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAccount;
