import React, { useState, useEffect } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import './home.css';
import { useSelector } from 'react-redux';
import { AppList } from '../../Components/AppList/AppList';
import { ControlPanel } from '../../Components/ControlPanel/ControlPanel';
import { getDeveloperCategories, getDeveloperApps, getFavoritesCategories, getFavorites, getBuysCategories, getBuys, getAllCategories, getAllApps } from '../../Helpers/MySqlHelper';

export const Home = (props) => {

    const user = useSelector(state => state);
    const [appList, setAppList] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {


        if(user.user_type == 'Desarrollador')
        {
            getDeveloperCategories(user.id, setCategories);
            getDeveloperApps(user.id, setAppList);

         }
         else if(user.user_type == 'Cliente' && props.favs)
         {
            getFavoritesCategories(user.id, setCategories);
            getFavorites(user.id, setAppList);
         }
         else if(user.user_type == 'Cliente' && props.buys)
         {
            getBuysCategories(user.id, setCategories);
            getBuys(user.id, setAppList);
         }
         else if(user.user_type == 'Cliente')
         {
            getAllCategories(setCategories);
            getAllApps(setAppList);
         }

    }, []);

    return (
        <>
            <Navbar history={props.history}/>
            <div className="cnt-apps">
                <ControlPanel history={ props.history }/>
                <AppList user={ { user : user, history: props.history, list : appList, categories : categories } } />
            </div>
        </>
    )
}
