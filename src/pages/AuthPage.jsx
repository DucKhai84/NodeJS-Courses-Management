import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/login.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ Username: '', Password: '', Role: 'User' });
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    // Khi component mount, kiểm tra nếu đã có token trong localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setMessage('Đã đăng nhập trước đó.');
        }
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register';

        const payload = isLogin
            ? { Username: formData.Username, Password: formData.Password }
            : formData;

        try {
            const res = await axios.post(url, payload);
            if (isLogin) {
                const { token } = res.data;
                setMessage('Login successful!');
                setToken(token);
                localStorage.setItem('token', token);

                const response = await fetch('http://localhost:3000/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userInfo = await response.json();

                if (userInfo.role === 'Admin') {
                    if (window.location.pathname !== '/admin') {
                        window.location.href = '/admin';
                    }
                } else {
                    if (window.location.pathname !== '/user') {
                        window.location.href = '/user';
                    }
                }

            } else {
                setMessage('Congratulations! You have successfully registered.');
                setFormData({ Username: '', Password: '', Role: 'User' });
                setIsLogin(true);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Lỗi máy chủ');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setMessage('Đã đăng xuất.');
    };

    return (
        <div className='login_wrapper'>
            <div className='login_form'>
                {!token ? (
                    <>
                        <h2 className='login_title' style={{ textAlign: 'center' }}>{isLogin ? 'Sign in' : 'Sign Up'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="Username"
                                placeholder="Username"
                                value={formData.Username}
                                onChange={handleChange}
                                required
                                className='login_input'

                            />
                            <input
                                type="password"
                                name="Password"
                                placeholder="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                required
                                className='login_input'
                            />

                            {!isLogin && (
                                <>
                                    <input
                                        type="text"
                                        name="HoTen"
                                        placeholder="Full Name"
                                        value={formData.HoTen}
                                        onChange={handleChange}
                                        required
                                        className='login_input'
                                    />
                                    <input
                                        type="tel"
                                        name="SDT"
                                        placeholder="Phone Number"
                                        value={formData.SDT}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10,11}"
                                        className='login_input'
                                    />
                                </>
                            )}

                            <div className='login_wrapper-buttons'>
                                <button className='login_buttons' type="submit">
                                    {isLogin ? 'Login' : 'Sign up'}
                                </button>
                            </div>

                        </form>

                        <p style={{ marginTop: 10, textAlign: 'center' }}>
                            {isLogin ? 'Have not already account?' : 'Have already account?'}
                            <a className='login_link'
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h2 style={{ textAlign: 'center' }}>Chào mừng bạn!</h2>
                        {token && (
                            <p style={{ fontSize: '0.8em', wordBreak: 'break-word', color: '#555' }}>
                                Token: {token}
                            </p>
                        )}
                        <button
                            onClick={handleLogout}
                            style={{ width: '100%', padding: 10, marginTop: 10 }}
                        >
                            Đăng xuất
                        </button>
                    </>
                )}

                {message && (
                    <p style={{ color: 'green', marginTop: 10, textAlign: 'center' }}>{message}</p>
                )}
            </div>
        </div>

    );

};

export default AuthForm;
