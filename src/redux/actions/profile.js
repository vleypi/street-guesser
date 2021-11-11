import { useHistory } from "react-router"

const initialState = {
    JWT: true,
    id: null,
    name: null,
    email: null,
    premium: false,
    warn: null,
    isActivated: true,
    shortid: null,
    statistics: {
        played: 0
    },
    language: "ru",
    country: null,
    avatar: {
        icon: null,
        back: null
    },
    views: 0,
    likes: {
        put: null,
        num: null
    }
}

const profile = (state=initialState,action) =>{
    if(action.type === 'SET_PROFILE'){
        return{
            ...state,
            JWT: action.JWT,
            id: action.id,
            name: action.name,
            email: action.email,
            premium: action.premium,
            warn: action.warn,
            isActivated: action.isActivated,
            shortid: action.shortid,
            statistics: action.statistics,
            language: action.language,
            country: action.country,
            avatar: action.avatar,
            views: action.views,
            likes: action.likes
        }
    }
    else if(action.type === 'SET_AVATAR'){
        return{
            ...state,
            avatar: {icon: action.avatar.icon, back: action.avatar.back}
        }
    }
    else if(action.type === 'SET_NAME'){
        return{
            ...state,
            name: action.name
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

export const setProfile = (JWT,id,name,email,premium,warn,isActivated,shortid,statistics,language,country,avatar,views,likes) =>({
    type: 'SET_PROFILE',
    JWT,
    id,
    name,
    email,
    premium,
    warn,
    isActivated,
    shortid,
    statistics,
    language,
    country,
    avatar,
    views,
    likes
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
                    dispatch(setProfile(null,null,null,null,null,null,null,null,null,null,null,null,null,null))
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
                        dispatch(setProfile(JWT,id,data.name,data.email,data.premium,data.check, data.isActivated,data.shortid,data.statistics,data.language,data.country,data.avatar,data.views,data.likes))

                    })
                }
            })
        }
        else{
            dispatch(setProfile(JWT,id,data.name,data.email,data.premium,data.check, data.isActivated,data.shortid,data.statistics,data.language,data.country,data.avatar,data.views,data.likes))
        }
    })
}

export const setAvatar = (avatar) =>({
    type: 'SET_AVATAR',
    avatar
})

export const setProfileName = (name) =>({
    type: 'SET_NAME',
    name
})
 
export default profile