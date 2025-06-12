import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard'
import '../assets/css/admin.css';

const UserPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'User') {
      navigate('/user');
    }
    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  }



  // useEffect(() => {
  //   getUsers()
  //     .then((res) => {
  //       console.log("Dữ liệu từ API:", res.data);
  //       setUsers(res.data);
  //     })
  //     .catch((err) => console.error('Lỗi API:', err));
  // }, []);

  // const filteredUsers = Users.filter(user =>
  //   user.Username.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (
    <div className='container'>
      <section id="main">
        <div className="row my-4">
          {courses.map((course, index) => (
            <div className="col-3 mt-4" key={index}>
              <ProductCard
                name={course.TenKhoaHoc}
                image={course.HinhAnh}
                description={course.MoTa}
                type={course.LoaiKhoaHoc}
                price={course.Gia}
                NgayTao={course.NgayTao}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserPage;
