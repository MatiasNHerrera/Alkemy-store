
export const UserReducer = (state = {}, action) => {

    switch(action.type)
    {
        case 'SET_USER': 
            return action.payload;

        case 'LOGOUT_USER':
            return action.payload

        default:
            return state;
    }
}