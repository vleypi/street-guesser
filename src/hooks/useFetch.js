import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setWarn } from "../redux/actions/profile"
import {setProfile} from '../redux/actions/profile'

export const useFetch = () =>{
    const dispatch = useDispatch()
    const [error,setError] = React.useState()
    React.useEffect(()=>{
        if(error){
            setTimeout(()=>{
                setError('')
            },5000)
        }
    },[error])
    const request = React.useCallback(async (url,method="GET",body=null,headers={})=>{
        try{
            if(body){
                body=JSON.stringify(body)
            }
            headers["Content-Type"]="application/json"
            const response = await fetch('https://street-guesser.herokuapp.com' + url,{method,body,headers})
            const data = await response.json()
            if(data.check){
                dispatch(setWarn(data.check))
            }
            if(!response.ok){
                throw new Error(data.message || "something went wrong")
            }
            return data
        }
        catch(err){
            setError(err.message)
            if(err.message === 'Unauthorized'){
                const refresh = await request('/api/auth/refresh', 'GET')
                if(refresh.message === 'UnauthorizedRefresh'){
                    localStorage.removeItem('data')
                    dispatch(setProfile(null,null,null,null,null,null))
                }
                else if(!refresh.message){
                    localStorage.setItem('data',JSON.stringify({
                        id: refresh.id,
                        JWT: refresh.JWT
                    }))
                    const data = request(url,method,JSON.parse(body),headers={auth: 'Bearer '+refresh.JWT})
                    return data
                }
            }
            if(err.message === 'UnauthorizedRefresh'){
                localStorage.removeItem('data')
                dispatch(setProfile(null,null,null,null,null,null))
            }
            return error
        }
    },[])
    return {request,error}
}