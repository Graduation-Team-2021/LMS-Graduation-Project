const initialState = {
    ID: null,
    Token: null,
    userName: null,
    role: null
}

const reducer = (state = initialState, action) =>{
    console.log(action)
    if(action.type === 'ADD'){
        return {...state,ID:state.ID+1}
    }
    if(action.type === 'SIGN_OUT'){
        return{...state,ID:null}
    }
    return state;
}
export default reducer;