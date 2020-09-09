import React from 'react';
import './favsAndBuys.css';
import { Home } from '../../Screens/Home/Home';

export const FavsAndBuys = ({history}) => {

    const redirect = (opt) => {
        history.push(`/me/${opt}`);
    }

    return (
        <>
            <div className="favs-buys-title">
                <h2>ADMIN APPS</h2>
            </div>
            <div className="cnt-favs-buys">
                <button onClick={ () => redirect('favs') }>Favorites</button>
                <button onClick={ () => redirect('buys') }>Purchases</button>
                <button onClick={ () => redirect('apps') }>All</button>
            </div>
        </>
    )
}
