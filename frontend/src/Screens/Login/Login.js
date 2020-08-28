import React, { useState, useReducer, useEffect } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../Actions/Actions';

export const Login = ({history}) => {

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const { email, password } = form;

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{

        e.preventDefault();

        axios.post("http://localhost:8000/login", form)
            .then(({data}) => {
                
                console.log(data);
                if(data.length > 0){
                    
                    dispatch(setUser([{
                        id: data[0].id,
                        email: data[0].email,
                        user_type: data[0].user_type,
                        isLogged: true
                    }]))
                    
                    history.push('/me/apps');
                }
                else
                {
                    document.querySelector('#login-error').removeAttribute('hidden');

                    setTimeout(() =>{
                        document.querySelector('#login-error').setAttribute('hidden', 'true');
                    },2000)
                }

            })
            .catch(error => console.log(error + "Error al conectar con la base de datos"));
    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }


    return (
            <div className='cnt-login'>
                <form id="login-form" onSubmit={ handleSubmit }>
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
                    <div className="form-input-submit-login">
                        <p>You still don’t have an account?<Link to="/register"><span>Register</span></Link></p>
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        > Login </button>
                    </div>
                    <div className="login-error" id="login-error" hidden>
                        <span>Usuario no registrado</span>
                    </div>
                </form>
            </div>
    )
}