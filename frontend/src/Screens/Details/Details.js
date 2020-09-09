import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import './details.css';

export const Details = (props) => {

    const [file, setFile] = useState('')
    const [detailsApp, setDetailsApp] = useState({});
    const [price, setPrice] = useState()
    const [message, setMessage] = useState('')
    const id = props.match.params.id;
    const user = useSelector(state => state);

    useEffect(() => {

        axios(`http://localhost:8000/app/${id}`)
                 .then(({data}) => {
                     setDetailsApp(data[0]);
                     setImage(data[0].image);
                 })

    }, [])

    const setImage = (image) => {
        let img = document.getElementById('app-details-img');
        img.style.background= `url(/uploads/${image}) no-repeat center`;
        img.style.backgroundSize = 'cover';
        img.style.boxShadow = '6px 0px 10px -4px rgba(0,0,0,0.75)'
    }

    const openModifyCard = () => {
        const modify = document.getElementById('modify-card');
        modify.style.visibility = 'unset';
        modify.style.animation = 'modify-card 1s linear'
    }

    const handleChange = (e) => {
        setPrice(e.target.value);
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        console.log('entre');

        let formData = new FormData();

        
        formData.append('price', price != undefined ? price : detailsApp.price);

        if(file != '')
            formData.append('file', file);

        axios.put(`http://localhost:8000/modify/${id}`, formData, { headers: { Accept : 'multipart/form-data' } })
            .then(() => {
               window.location.reload();
            })
            .catch(error => console.log(error));

    }

    const uploadFile = (e) => {
        setFile(e.target.files[0]);
    }

    const deleteApp = () => {

        axios.delete(`http://localhost:8000/delete/${id}`)
            .then(() => {
                props.history.push('/me/apps');
            })
            .catch(error => console.log(error));
    }

    const buy = () => {

        axios.post(`http://localhost:8000/buy`, { id_application: id , id_user : user.id })
            .then(({data}) => {
                displayMsg(data.msg, 'details-msg', data.option);
            })
            .catch(error => console.log(error));
    }

    const addFavorites = () => {

        axios.post(`http://localhost:8000/favorites`, { id_application: id , id_user : user.id })
            .then(({data}) => {
                displayMsg(data.msg, 'details-msg', data.option);
            })
            .catch(error => console.log(error));
    }

    //MESSAGE OF SUCCESS OR ERROR;

    const displayMsg = (msg, id_div, option) => {
        
        setMessage(msg);
        let element = document.getElementById(id_div);
        element.removeAttribute('hidden');

        switch(option)
        {
            case 'success':
                element.style.background = 'rgb(46, 168, 175)';
                break;
            default: 
                element.style.background = 'rgb(182, 43, 43)';
                break;
        }

        setTimeout(() => {
            element.setAttribute('hidden', 'true');
        }, 2000);
    }

    return (
        <div className="cnt-details">
            <div className="details-card">
                <div className="details-grid">
                    <div className="app-details-img" id='app-details-img'></div>
                    <div className="app-details-description">
                        <div className="app-description">
                                <h3>{ detailsApp.name }</h3>
                                <p>{ detailsApp.category }</p>
                                <b>${ detailsApp.price }</b>
                        </div>
                        <div className="app-modify">
                            <form onSubmit={ handleSubmit }>
                                <div className="modify-card" id="modify-card">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="New Price"
                                        onChange={ handleChange }
                                    />
                                    
                                    <input
                                        id="image-app"
                                        name="file"
                                        className="form-control-file"
                                        type='file'
                                        onChange={ uploadFile }
                                    />

                                    <button 
                                        className="btn btn-warning"  
                                        type='submit'
                                    >Accept</button>
                                </div>
                                <div className="app-details-actions">
                                    {
                                        user.user_type == 'Desarrollador' ?
                                        <>
                                            <button className="btn btn-success" type='button' onClick={ () => openModifyCard() }>Modify</button>
                                            <button className="btn btn-danger" onClick={ deleteApp }>Delete</button>
                                        </>
                                        :
                                        <>
                                            <button className="btn btn-info" type='button' onClick={ buy }>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                                </svg>
                                            </button>
                                            <button className="btn btn-info" type='button' onClick={ addFavorites }>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                                </svg>
                                            </button>
                                        </>
                                    }

                                    <div className="details-msg" id='details-msg' hidden>
                                        <span>{ message }</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
