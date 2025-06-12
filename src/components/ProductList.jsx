import React from 'react';
import { useState } from 'react';
import ProductCard from './ProductCard';
import ModalProduct from './product/ModalProduct';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ProductList({ products }) {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [mode, setMode] = useState('add');
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (courseId) => {
        setMode('edit');
        setSelectedCourseId(courseId);
        setShowModal(true);
    };

    const handleAdd = () => {
        setMode('add');
        setSelectedCourseId(null);
        setShowModal(true);
    };

    return (
        <>
            {/* Nút thêm mới */}
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleAdd}>
                    Thêm khóa học mới
                </button>
            </div>

            <div className="row my-4">
                {products.map((product, index) => (
                    <div className="col-3 mt-4" key={product.id || index}>
                        <ProductCard
                            name={product.TenKhoaHoc}
                            image={product.HinhAnh}
                            description={product.MoTa}
                            type={product.LoaiKhoaHoc}
                            price={product.Gia}
                            NgayTao={product.NgayTao}
                            courseId={product.id}
                            onEdit={handleEdit}
                        />
                    </div>
                ))}
            </div>


            {showModal && (
                <ModalProduct
                    mode={mode}
                    CourseId={selectedCourseId}
                    show={showModal}
                    onHide={() => setShowModal(false)}
                />
            )}
        </>
    );
}
export default ProductList;