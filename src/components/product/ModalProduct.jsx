import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../validation/CoursesSchema';
import '../../assets/css/admin.css';
import '../../assets/fonts/fontawesome-free-6.5.1-web/css/all.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';



function ModalProduct({ mode, CourseId, show, onHide }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (mode === 'edit' && CourseId) {
            console.log("mode", mode, "CourseId", CourseId);
            fetch(`http://localhost:3000/courses/${CourseId}`)
                .then((res) => res.json())
                .then((data) => {

                    reset({
                        TenKhoaHoc: data.TenKhoaHoc || '',
                        MoTa: data.MoTa || '',
                        Gia: data.Gia || '',
                        LoaiKhoaHoc: data.LoaiKhoaHoc || '',
                        HinhAnh: null,
                    });
                });
        } else {

            reset({
                TenKhoaHoc: '',
                MoTa: '',
                Gia: '',
                LoaiKhoaHoc: '',
                HinhAnh: null,
            });
        }
    }, [mode, CourseId, reset]);

    // Control modal show/hide dựa vào prop
    useEffect(() => {
        const modalElement = document.getElementById('myModal');

        if (!modalElement) return;

        const bootstrapModal = bootstrap.Modal.getOrCreateInstance(modalElement); // Dùng getOrCreateInstance

        if (show) {
            bootstrapModal.show();
        }

        const handleHidden = () => {
            onHide?.();
        };

        modalElement.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        };
    }, [show, onHide]);


    const onSubmit = async (formDataRaw) => {
        const formData = new FormData();
        formData.append('TenKhoaHoc', formDataRaw.TenKhoaHoc);
        formData.append('MoTa', formDataRaw.MoTa);
        formData.append('Gia', formDataRaw.Gia);
        formData.append('LoaiKhoaHoc', formDataRaw.LoaiKhoaHoc);

        console.log("mode", mode);

        if (formDataRaw.HinhAnh && formDataRaw.HinhAnh[0]) {
            formData.append('HinhAnh', formDataRaw.HinhAnh[0]);
        }

        try {
            const url = mode === 'edit' ? `http://localhost:3000/courses/${CourseId}` : 'http://localhost:3000/courses';
            const method = mode === 'edit' ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Đã xảy ra lỗi');
                return;
            }

            alert(mode === 'edit' ? 'Cập nhật thành công ' : 'Thêm mới thành công');


            if (onHide) {
                onHide();
            }

        } catch (error) {
            alert('Không thể kết nối tới server');
        }
    };

    return (
        <div className="modal fade" id="myModal" tabIndex={-1}>
            <div className="modal-dialog">
                <div style={{ height: '600px' }} className="modal-content">
                    <div className="modal-header">
                        {console.log("mode", mode)}
                        <h5 className="modal-title">{mode == 'edit' ? 'Edit Course' : 'Add Course'}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form className='form_add-products' onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-3'>
                                <label className='mb-1'>Name</label>
                                <input {...register('TenKhoaHoc')} type="text" placeholder='Name' />
                                {errors.TenKhoaHoc && <p style={{ color: 'red' }}>{errors.TenKhoaHoc.message}</p>}
                            </div>

                            <div className='mt-3'>
                                <label className='mb-1'>Description</label>
                                <textarea
                                    style={{ height: '100px', width: '100%' }}
                                    {...register('MoTa')}
                                    placeholder='Description'
                                />
                                {errors.MoTa && <p style={{ color: 'red' }}>{errors.MoTa.message}</p>}
                            </div>

                            <div className='mt-3'>
                                <div className="row">
                                    <div className="col-6">
                                        <label className='mb-1'>Price</label>
                                        <input {...register('Gia')} type="number" placeholder='Price' />
                                        {errors.Gia && <p style={{ color: 'red' }}>{errors.Gia.message}</p>}
                                    </div>
                                    <div className="col-6">
                                        <label className='mb-1'>Type</label>
                                        <select {...register('LoaiKhoaHoc')} className="form-select">
                                            <option value="">-- Chọn loại khóa học --</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                        </select>
                                        {errors.LoaiKhoaHoc && <p style={{ color: 'red' }}>{errors.LoaiKhoaHoc.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <label className='mb-1'>Picture</label>
                                <input {...register('HinhAnh')} type="file" accept="image/*" />
                                {errors.HinhAnh && <p style={{ color: 'red' }}>{errors.HinhAnh.message}</p>}
                            </div>

                            <div className="form_products-buttons">
                                <button
                                    type="button"
                                    className="form_button"
                                    onClick={onHide}
                                >
                                    Close
                                </button>
                                <button type='submit' className="form_button">
                                    {mode === 'edit' ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ModalProduct;


