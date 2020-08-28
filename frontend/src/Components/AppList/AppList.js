import React, { useEffect, useState } from 'react'
import './appList.css';
import axios from 'axios';

export const AppList = ({ user : { user, history } }) => {

    const [appList, setAppList] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {

        if(user.user_type == 'Desarrollador'){

            axios(`http://localhost:8000/category/${user.id}`)
                 .then(({data}) => {
                    setCategories(data);

                 })

            axios(`http://localhost:8000/apps/${user.id}`)
                 .then(({data}) => {
                     setAppList(data);
                 })
         }

    }, []);
    
    const openDetails = (id) => {
        history.push(`/details/${ id }`)
    }

    return (
        <div className="list-app">
            {
                categories.map(category => {

                        return <>
                            <h3>{ category.category }</h3>
                            <div className="list-app-category">
                                {
                                    appList.map(app => {
                                
                                        return app.category == category.category && 
                                                <div key={ app.id_application } className="app-card">
                                                    <div className="app-card-img" style={{background: `url(/uploads/${app.image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                                                    <div className="app-card-description">
                                                        <div className='name-category'>
                                                            <h3 onClick={ () => openDetails(app.id_application) }>{ app.name }</h3>
                                                            <span>{ app.category }</span>
                                                        </div>
                                                        <div className="app-price">
                                                            <b>${ app.price }</b>
                                                        </div>
                                                    </div>
                                                </div>
                                    })
                                }
                            </div>
                        </>
                    
                })
            }
        </div>
    )
}
/*

<div key={ app.id_application } className="app-card">
                        <div className="app-card-img" style={{background: `url(/uploads/${app.image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                        <div className="app-card-description">
                            <div className='name-category'>
                                <h3 onClick={ () => openDetails(app.id_application) }>{ app.name }</h3>
                                <span>{ app.category }</span>
                            </div>
                            <div className="app-price">
                                <b>${ app.price }</b>
                            </div>
                        </div>
                    </div>

                    */
