import { useHistory } from "react-router"

const initialState = {
    JWT: true,
    id: null,
    name: null,
    premium: false,
    warn: null,
    isActivated: true
}

const profile = (state=initialState,action) =>{
    if(action.type === 'SET_PROFILE'){
        return{
            ...state,
            JWT: action.JWT,
            id: action.id,
            name: action.name,
            premium: action.premium,
            warn: action.warn,
            isActivated: action.isActivated
        }
    }
    else if(action.type === 'SET_WARN'){
        return{
            ...state,
            warn: action.warn
        }
    }
    return state
}

export const setProfile = (JWT,id,name,premium,warn,isActivated) =>({
    type: 'SET_PROFILE',
    JWT,
    id,
    name,
    premium,
    warn,
    isActivated
})

export const setWarn = (warn) =>({
    type: 'SET_WARN',
    warn
})

export const setProfileThunk = (JWT,id) => (dispatch) =>{
    fetch('/api/auth/profile',{
        method: 'GET',
        body: null,
        headers:{
            auth: 'Bearer ' + JWT,
            "Content-Type": "application/json"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.message == 'Unauthorized'){
            fetch('/api/auth/refresh',{method:'GET',body: null}).then((res)=>res.json())
            .then((ref)=>{
                if(ref.message === 'UnauthorizedRefresh'){
                    localStorage.removeItem('data')
                    dispatch(setProfile(null,null,null,null,null,null))
                }
                else if(!ref.message){
                    fetch('/api/auth/profile',{
                        method: 'GET',
                        body: null,
                        headers:{
                            auth: 'Bearer ' + ref.JWT,
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res)=>res.json())
                    .then((data)=>{
                        localStorage.setItem('data',JSON.stringify({
                            id: ref.id,
                            JWT: ref.JWT
                        }))
                        dispatch(setProfile(JWT,id,data.name,data.premium,data.check, data.isActivated))
                    })
                }
            })
        }
        else{
            dispatch(setProfile(JWT,id,data.name,data.premium,data.check, data.isActivated))
        }
    })
}
 
export default profile