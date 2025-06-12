import * as yup from 'yup';

const schema = yup.object().shape({
    TenKhoaHoc: yup.string().min(2).required('Tên khóa học là bắt buộc, không quá ngắn (*) '),
    MoTa: yup.string().required('Mô tả là bắt buộc (*)'),
    Gia: yup
        .number()
        .typeError('Giá phải là số  (*)')
        .positive('Giá phải lớn hơn 0 (*)')
        .required('Giá là bắt buộc (*)'),
    LoaiKhoaHoc: yup.string().required('Loại khóa học là bắt buộc (*)'),
    HinhAnh: yup.mixed().required('Vui lòng chọn hình ảnh'),
});


export default schema;