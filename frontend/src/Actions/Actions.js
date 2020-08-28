import { useEffect } from "react"

export const setUser = (user) => (dispatch) => {

        dispatch({
            type: 'SET_USER',
            payload: user[0]
        }) 
} 

export const logOutUser = (dispatch) => {

        dispatch({
            type: 'LOGOUT_USER',
            payload:  {
                isLogged: false
            }
        })
} 