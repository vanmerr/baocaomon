import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss'; // Import file css/scss

const cx = classNames.bind(style); // Sử dụng classNames để kết hợp css module với scss

const Register = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi yêu cầu đăng ký đến server hoặc xử lý logic đăng ký ở đây
    // Ở đây chỉ là ví dụ đơn giản, bạn cần thay đổi phần này để phù hợp với ứng dụng của bạn
    if (fullName && email && phoneNumber && password) {
      // Gửi thông tin đăng ký đến nơi phù hợp (ví dụ: server)
      onRegister({ fullName, email, phoneNumber, password });
    } else {
      // Xử lý trường hợp người dùng không nhập đủ thông tin
      alert('Vui lòng nhập đủ thông tin.');
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('heading')}>Register</div>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <input
          required=""
          className={cx('input')}
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <input
          required=""
          className={cx('input')}
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          required=""
          className={cx('input')}
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <input
          required=""
          className={cx('input')}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className={cx('register-button')} type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
