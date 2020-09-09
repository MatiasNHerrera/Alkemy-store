import React from 'react';
import './controlPanel.css';
import { useSelector } from 'react-redux';
import { AddApp } from '../AddApp/AddApp';
import { FavsAndBuys } from '../FavsAndBuys/FavsAndBuys';

export const ControlPanel = ({ history }) => {

    const user = useSelector(state => state);

    return (
        <div className="control-panel">
            {
               user.user_type == 'Desarrollador' ? <AddApp user={ user }/> : <FavsAndBuys history={ history }/>
            }
        </div>
    )
}
