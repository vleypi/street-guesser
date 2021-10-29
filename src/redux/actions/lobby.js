
const initialState = {
    lobby: null
}

const lobby = (state=initialState,action) =>{
    if(action.type === 'SET_LOBBY'){
        return{
            ...state,
            lobby: action.lobby
        }
    }
    else if(action.type === 'USER_CONNECT'){
        const users = [...state.lobby.users] 
        users.push({_id: action.user._id, name: action.user.name, points: 0})
        return{
            ...state,
            lobby: {...state.lobby,users}
        }
    }
    else if(action.type === 'USER_LEAVE'){
        if(action.user === action.myId){
            return{
                ...state,
                lobby: null
            }
        }
        else{
            return{
                ...state,
                lobby: {...state.lobby,users: state.lobby.users.filter((it)=>{return it._id !== action.user})}
            }   
        }
    }
    return state   
}    

export const userConnect = (user) =>({
    type: 'USER_CONNECT',
    user
})

export const userLeave = (user, myId) =>({
    type: 'USER_LEAVE',
    user,
    myId
})

export const setLobby = (lobby) =>({
    type: 'SET_LOBBY',
    lobby
})


export default lobby