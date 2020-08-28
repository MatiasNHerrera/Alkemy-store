import React, { useState, useEffect } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import './home.css';
import { useSelector } from 'react-redux';
import { AddApp } from '../../Components/AddApp/AddApp';
import { AppList } from '../../Components/AppList/AppList';
import { Route, Switch } from 'react-router-dom';
import { Details } from '../Details/Details';

export const Home = ({history}) => {

    const user = useSelector(state => state);


    return (
        <>
            <Navbar history={history}/>
            <div className="cnt-apps">
                {
                    user.user_type == 'Desarrollador' && <AddApp user={ user }/>
                }
                <AppList user={ { user : user, history: history } } />
            </div>
        </>
    )
}
