import React from 'react'
import { Home } from '../../Screens/Home/Home'

export const Buys = ({history}) => {
    return (
        <>
            <Home buys={true} history={history}/>
        </>
    )
}
