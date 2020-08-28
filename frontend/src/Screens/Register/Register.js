import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Register = ({history}) => {

    const [form, setForm] = useState({
        email: '',
        password: '',
        user_type: 'Cliente'
    })

    const { email, password, user_type } = form;

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:8000/register", form)

            .then((data) => {
                history.push('/login');
            })
            .catch(e)
            {

            }
    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className='cnt-register'>
            <form onSubmit={handleSubmit} id="register-form">
                <div className="form-input-cnt">
                    <label>Email</label>
                    <input
                        required
                        name='email'
                        value={ email }
                        type="email"
                        autoComplete="off"
                        className="form-control"
                        onChange={ handleChange }
                    />
                </div>
                <div className="form-input-cnt">
                    <label>Password</label>
                    <input 
                        required
                        name='password'
                        value={ password }
                        type="password"
                        autoComplete="off"
                        className="form-control"
                        onChange={ handleChange }
                    />
                </div>
                <div className="form-input-cnt">
                    <label>User</label>
                    <select required value={ user_type } name='user_type' onChange={ handleChange }>
                        <option>Cliente</option>
                        <option>Desarrollador</option>
                    </select>
                </div>
                <div className="form-input-submit-register">
                    <p>You already have an account?<Link to="/login"><span>Login</span></Link></p>
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                    > Register </button>
                </div>
            </form>
        </div>
    )
}
