import React, { useEffect, useState } from 'react';
import style from './Slider.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(style);

function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1); // Declare direction as a state variable
    const totalSlides = 5;
    const slideWidth = 20; // Chiều rộng của mỗi slide (20%)
    const slideInterval = 2000; // Thời gian giữa mỗi lần chuyển đổi slide (2 giây)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => {
                let nextSlide = prevSlide + direction;
                
                // Đảo ngược hướng nếu đến slide cuối cùng hoặc đầu tiên
                if (nextSlide >= totalSlides) {
                    setDirection(-1); // Set direction state to -1
                    return totalSlides - 1;
                } else if (nextSlide < 0) {
                    setDirection(1); // Set direction state to 1
                    return 0;
                }
                
                return nextSlide;
            });
        }, slideInterval);
    
        return () => clearInterval(intervalId);
    }, [direction]); // Chạy lại khi direction thay đổi
     // Không cần phụ thuộc vào currentSlide nữa

    return (
        <div className={cx('wrapper')}>
            <div className={cx('radio_img')}>
                {[...Array(totalSlides)].map((_, index) => (
                    <span
                        key={index}
                        className={cx({ activated: index === currentSlide })}
                    ></span>
                ))}
            </div>
            <div className={cx('slider')} style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}>
                <img src={images.slider1} alt='slider1'/>
                <img src={images.slider2} alt='slider2'/>
                <img src={images.slider3} alt='slider3'/>
                <img src={images.slider4} alt='slider4'/>
                <img src={images.slider5} alt='slider5'/>
            </div>
        </div>
    );
}

export default Slider;
