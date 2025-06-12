import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ModalProduct from '../components/product/ModalProduct';
import DataTable from '../components/Datatable';
import '../assets/css/admin.css';



const AdminPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      navigate('/admin');
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

  return (
    <div className='container'>
      <section id="main">
        <div className="row justify-content-between">
          <div className="col-md-6 main_add">
            <div className="main_add-wrapper">
              <p className="main_add-title">Add Course</p>
              <span className="main_add-button">
                <a style={{ color: 'black' }} href="#" data-bs-toggle="modal" data-bs-target="#myModal">
                  <i className="fa-regular fa-square-plus main_button-icon"></i>
                </a>
              </span>
              <ModalProduct />
            </div>
            <p className="main_add-description">
              Minus placeat eligendi autem, nihil debitis velit rerum ipsa optio, accusamus, veniam cum facilis hic. Aspernatur, illum. Amet sint officia similique veniam!
            </p>
          </div>
          <div className="col-md-6 main_add">
            <div className="main_add-wrapper">
              <p className="main_add-title">History</p>
              <span className="main_add-button">
                <i className="fa-regular fa-square-plus main_button-icon"></i>
              </span>
            </div>
            <p className="main_add-description">
              Minus placeat eligendi autem, nihil debitis velit rerum ipsa optio, accusamus, veniam cum facilis hic. Aspernatur, illum. Amet sint officia similique veniam!
            </p>
          </div>
        </div>

        <ProductList products={courses} />

      </section>
    </div>
  );
};

export default AdminPage;
