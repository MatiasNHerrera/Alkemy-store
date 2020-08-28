import React, { useState } from 'react';
import axios from 'axios';
import './addApp.css';

export const AddApp = ({ user }) => {

    const [form, setForm] = useState({
        id: user.id,
        name: '',
        category: '',
        price: 0,
    })

    const [file, setFile] = useState(null);

    const { name, category, price } = form;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        let formData = new FormData();

        formData.append('form', JSON.stringify(form));
        formData.append('file', file);

        console.log(formData)

        axios.post("http://localhost:8000/create/app", formData, { headers: { Accept : 'multipart/form-data' } })
            .then(({data}) => {
                displayMsg('correct', data);
            })
            .catch(error => displayMsg('error', error));

    }

    const uploadFile = (e) => {
        setFile(e.target.files[0]);
    }

    const displayMsg = (option, msg) => {

        let element = document.querySelector('.msg-add-app');
        element.removeAttribute('hidden');
        document.getElementById('msg-add-app-span').innerHTML= msg;

        switch(option)
        {
            case 'error':
                element.classList.add('msg-add-app-error');
                break
            default: 
                element.classList.remove('msg-add-app-error');
                break
        }

        setTimeout(() => {
            element.setAttribute('hidden', 'true');
        }, 2000);
    }

    return (
        <div className="add-app">
            <div className="add-app-title">
                <h2>ADD NEW APP</h2>
            </div>
            <form onSubmit={ handleSubmit }>
                <input
                    value={ name }
                    onChange={ handleChange }
                    name="name"
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    maxLength="30"
                    required
                />
                <input
                    value={ category }
                    onChange={ handleChange }
                    name="category"
                    className="form-control"
                    type="text"
                    placeholder="Category"
                    maxLength="30"
                    required
                />
                <input
                    value={ price }
                    onChange={ handleChange }
                    name="price"
                    className="form-control"
                    type="number"
                    placeholder="Price"
                    required
                />
                <input
                    onChange={ uploadFile }
                    id="image-app"
                    name="file"
                    className="form-control-file"
                    type='file'
                    required
                />
                <button
                    type='submit'
                    className="btn btn-info"
                >ADD</button>
            </form>
            <div className="msg-add-app" hidden>
                <span id="msg-add-app-span"></span>
            </div>
        </div>
    )
}
