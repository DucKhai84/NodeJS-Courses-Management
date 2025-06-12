import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/admin.css';
import '../assets/fonts/fontawesome-free-6.5.1-web/css/all.min.css';

function Slidebar() {
    const [dateInfo, setDateInfo] = useState({
        dayOfWeek: '',
        day: '',
        month: '',
        year: ''
    });

    useEffect(() => {
        const today = new Date();
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

        setDateInfo({
            dayOfWeek: daysOfWeek[today.getDay()],
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
        });
    }, []);

    return (
        <section id="slideBar">
            <div className="slideBar_wrapper container">
                <h1 className="slideBar_title">Xin chào</h1>
                <p style={{ fontSize: "18px" }}>{dateInfo.dayOfWeek}, ngày {dateInfo.day} tháng {dateInfo.month} năm {dateInfo.year}</p>
            </div>
        </section>
    );
}

export default Slidebar;