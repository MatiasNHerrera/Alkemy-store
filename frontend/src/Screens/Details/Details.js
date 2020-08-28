import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import './details.css';

export const Details = (props) => {

    const [file, setFile] = useState('')
    const [price, setPrice] = useState(0)
    const [detailsApp, setDetailsApp] = useState({});
    const id = props.match.params.id;
    const modify = false;

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

        formData.append('price', price);

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
                                        onChange={ handleChange }
                                        type="text"
                                        className="form-control"
                                        placeholder="New Price"
                                        value={ detailsApp.price }
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
                                    <button className="btn btn-success" type='button' onClick={ () => openModifyCard() }>Modify</button>
                                    <button className="btn btn-danger" onClick={ deleteApp }>Delete</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
