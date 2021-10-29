import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import {useFetch} from '../../hooks/useFetch'

const ForgotForm = ({style,route,redirect}) => {
    const {request,error} = useFetch()
    const {loginAuth} = useAuth()
    const [int,setInt] = React.useState({password: '',text: '',email: ''})
    const [btnDis,setBtnDis] = React.useState(false)
    const forgotPass = async (e) =>{
        e.preventDefault()
        setBtnDis(true)
        try{
            if(int.email){
                const data = await request('/api/auth/reset','POST', {email: int.email})
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
    return (
        <form>
            <div>
                <p className={`${error && style.errorRed}`}>Email</p>
                <input value={int.email} onChange={intHandler} type="email"/>
            </div>
            <div className={style.formButtons}>
                <button disabled={btnDis} onClick={forgotPass}>Enter email</button> 
            </div>
            <p style={{color: 'red', marginTop: '10px', textShadow: '1px 3px 9px rgba(150, 150, 150, 1)'}}>{error}</p>
        </form> 
    )
}

export default ForgotForm
