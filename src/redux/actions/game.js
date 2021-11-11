

const initialState = {
    loc: null,
    locs: null,
    creating: false,
    API: '',
    rd: 1,
    pls: null,
    players: null
}

const game = (state=initialState,action) =>{
    if(action.type === 'SET_GAME'){
        return{
            ...state,
            loc: action.loc,
            locs: action.locs,
            creating: false,
            API: 'AIzaSyAwsENISVxRiSpCYhnhFX_dXJjFftHDHZM',
            pls: action.pls,
            mode: action.mode,
            rd: action.rd,
            time: action.time
        }
    }
    else if(action.type === 'SET_PLAYERS'){
        const mapPlayers = action.players.map((it)=>{
            return {_id: it._id, name: it.name,points: it.points, tries: [], avatar: it.avatar}
        })
        return{
            ...state,
            players: mapPlayers,
        }
    }
    else if(action.type === 'GUESS'){
        const index = state.players.findIndex((it)=>{return it._id === action.id})
        const players = [...state.players]
        players[index].tries.push({type: 'guess',img: action.img,getPts: action.getPts,dis: action.dis})
        players[index].points = action.pts
        return{
            ...state,players
        }
    }
    else if(action.type === 'NOT_GUESSED'){
        const index = state.players.findIndex((it)=>{return it._id === action.id})
        const players = [...state.players]
        players[index].tries.push({type: 'notguessed',img: action.img,getPts: action.getPts,dis: action.dis})
        players[index].points = action.pts
        return{
            ...state,players
        }
    }
    else if(action.type === 'GUESSED'){
        const index = state.players.findIndex((it)=>{return it._id === action.id})
        const players = [...state.players]
        players[index].tries.push({type: 'guessed',img: action.img,getPts: action.getPts,dis: action.dis})
        players[index].points = action.pts
        return{
            ...state,players
        }
    }
    else if(action.type === 'ROUND_END_BATTLE'){
        const mapPlayers = state.players.map((it)=>{
            return {_id: it._id, name: it.name,points: 0, tries: []}
        })
        return{
            ...state,
            players: mapPlayers,
        }
    }
    else if(action.type === 'ROUND_END_POINTS'){
        const mapPlayers = state.players.map((it)=>{
            return {_id: it._id, name: it.name,points: it.points, tries: []}
        })
        return{
            ...state,
            players: mapPlayers,
        }
    }
    else if(action.type === 'PLAYER_OUT'){
        return{
            ...state,
            players: state.players.filter((it)=>{return it._id !== action.id})
        }
    }
    else if(action.type === 'CREATING'){
        return{
            ...state,
            creating: !state.creating
        }
    }
    return state
}

export const setGame = (loc,locs,rd,pls,mode,time) =>({
    type: 'SET_GAME',
    loc,
    locs,
    pls,
    mode,
    rd,
    time
})

export const setPlayers = (players) =>({
    type: 'SET_PLAYERS',
    players
})

export const setCreating = () =>({
    type: 'CREATING'
})

export const guess = (id,img,getPts,dis,pts) => ({
    type: 'GUESS',
    id,
    img,
    getPts,
    pts,
    dis
})

export const notGuessed = (id,img,getPts,dis,pts) => ({
    type: 'NOT_GUESSED',
    id,
    img,
    getPts,
    pts,
    dis
})

export const guessed = (id,img,getPts,dis,pts) => ({
    type: 'GUESSED',
    id,
    img,
    getPts,
    pts,
    dis
})

//Battle
export const roundEndBattle = () =>({
    type: 'ROUND_END_BATTLE',
})

export const roundEndPoints = () =>({
    type: 'ROUND_END_POINTS',
})
 
export const playerOut = (id) =>({
    type: 'PLAYER_OUT',
    id
})

export const playerWin = (id) =>({
    type: 'PLAYER_WIN',
    id
})
//

export default game