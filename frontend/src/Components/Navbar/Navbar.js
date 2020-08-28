import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './navbar.css';
import { logOutUser } from '../../Actions/Actions';

export const Navbar = ({history}) => {

    const user = useSelector(state => state);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOutUser);
        history.push('/login');
    }

    return (
        <nav>
            <ul>
                <Link to="/me/home"><h1>Alkemy Store</h1></Link>
                <div>
                    <span>{ user.email }</span>
                    <button
                        className="btn btn-danger"
                        onClick={ logout }
                    >Log Out</button>
                </div>
            </ul>
        </nav>
    )
}
