import {useCallback,useEffect,useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {setProfile, setProfileThunk} from '../redux/actions/profile'
import {io} from 'socket.io-client'
import { userConnect, userLeave } from "../redux/actions/lobby";
import { setGame } from "../redux/actions/game";
import { useHistory } from "react-router";

export const socket = io("http://localhost:5000/", {transports: [ "websocket" ]});

export const useAuth = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const loginAuth = useCallback((JWT,id)=>{
        localStorage.setItem('data',JSON.stringify({
            id,
            JWT
        }))
        dispatch(setProfileThunk(JWT,id))
    },[])
    const logoutAuth = useCallback(()=>{
        dispatch(setProfile(null,null))
        localStorage.removeItem('data')
    },[])
    useEffect(()=>{
        let data = eval('[' + localStorage.getItem('data') + ']')[0]
        if(data && data.JWT){
            loginAuth(data.JWT,data.id)
        }
        else{
            logoutAuth()
        }
    },[])
    useEffect(()=>{
        socket.on('roundGame',msg=>{
            dispatch(setGame(msg.loc,msg.locs,msg.rd,msg.pls,msg.mode,msg.time))
            if(msg.locs){
                history.replace('/home/game')
            }
        })
        socket.on('userConnect',msg=>{
            setTimeout(()=>{
                dispatch(userConnect(msg))
            },1000)
        })
        socket.on('userLeave',msg=>{
            dispatch(userLeave(msg, JSON.parse(localStorage.getItem('data')).id))
        })
    },[])
    return {loginAuth,logoutAuth}
}
