import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import {useFetch} from '../../hooks/useFetch'

const NewPassword = ({style,route,redirect,params}) => {
    const {request,error} = useFetch()
    const {loginAuth} = useAuth()
    const [int,setInt] = React.useState({password: '',text: '',email: ''})
    const [btnDis,setBtnDis] = React.useState(false)
    const resetPassword = async (e) =>{
        e.preventDefault()
        setBtnDis(true)
        try{
            if(int.password){
                const data = await request('/api/auth/newpassword','PATCH', {password: int.password, token: params.link})
                if(!data.message){
                    redirect.replace('/auth')
                }
            }
        }
        catch(err){
            setTimeout(()=>{
                setBtnDis(false)
            },2000)
            setInt({password: '',text: '',email: ''})
        }
    }
    const intHandler = (e) =>{
        setInt({...int,[e.target.type]: e.target.value})
    }
    React.useEffect(()=>{
        const checkToken = async () =>{
            await request('/api/auth/newpassword/'+params.link,'GET')
        }
        checkToken()
    },[])
    React.useEffect(()=>{
        if(error === 'Unexpected token'){
            redirect.replace('/auth')
        }
    },[error])
    return (
        <form>
            <div>
                <p className={`${error && style.errorRed}`}>New Password</p>
                <input value={int.password} onChange={intHandler} type="password"/>
            </div>
            <div className={style.formButtons}>
                <button disabled={btnDis} onClick={resetPassword}>Enter</button> 
            </div>
            <p style={{color: 'red', marginTop: '10px', textShadow: '1px 3px 9px rgba(150, 150, 150, 1)'}}>{error}</p>
        </form> 
    )
}

export default NewPassword
