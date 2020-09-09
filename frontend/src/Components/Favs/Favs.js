import React from 'react'
import { Home } from '../../Screens/Home/Home'

export const Favs = ({ history }) => {

    return (
        <>
            <Home favs={true} history={history}/>
        </>
    )
}
