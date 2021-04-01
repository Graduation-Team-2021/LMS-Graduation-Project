export const SIGN_IN ='SIGN_IN'
export const SIGN_OUT ='SIGN_OUT'
export const SET_TOKEN ='SET_TOKEN'

export const sign_in = ()=>{
    return {
        type : SIGN_IN
    }
}
export const sign_out = ()=>{
    return {
        type : SIGN_OUT
    }
}

export const setToken = (newToken)=>{
    return {
        type : SET_TOKEN,
        value : newToken
    }
}