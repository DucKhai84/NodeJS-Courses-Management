import React, { useEffect, useState } from 'react';
import '../assets/css/admin.css';
import '../assets/fonts/fontawesome-free-6.5.1-web/css/all.min.css';
import dayjs from 'dayjs';

function ProductCard({ name, image, description, type, price, NgayTao, courseId, onEdit }) {
    return (
        <div className="card" style={{
            maxHeight: '450px',
            height: '100%',
            width: '100%',
            boxShadow: '0 2px 5px rgba(0,0,0,.5)',
            borderRadius: '18px'
        }}>
            <img
                style={{ borderRadius: '18px', maxHeight: '200px' }}
                src={`http://localhost:3000/uploads/${image}`}
                className="card-img-top"
                alt={name}
            />
            <div className="card-body">
                <h4 style={{ maxHeight: '60px' }} className="card-title">{name}</h4>
                <p style={{ marginBottom: '8px', maxHeight: '100px' }} className="card-text">{description}</p>
                <p style={{ marginBottom: '8px' }} className="card-text">
                    Price:<span className="ms-2"></span>{price} VND
                </p>
                <p style={{ marginBottom: '8px' }} className="card-text">
                    Tag:<span className="ms-2"></span>{type}
                </p>
                <p className="card-text">
                    Created:
                    <span className="ms-2"></span>
                    {dayjs(NgayTao).format('DD/MM/YYYY')}
                </p>
                <div className="buttons_wrapper">
                    <a href="#" className="btn btn-primary">Học Ngay</a>
                    <div className="buttons_wrapper-edit">
                        <button
                            onClick={() => onEdit(courseId)}
                            className="btn btn-warning"
                            type="button"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className="btn btn-danger" type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;