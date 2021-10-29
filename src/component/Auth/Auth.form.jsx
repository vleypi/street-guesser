import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import {useFetch} from '../../hooks/useFetch'

const AuthForm = ({style,route,redirect}) => {
    const {request,error} = useFetch()
    const {loginAuth} = useAuth()
    const [int,setInt] = React.useState({password: '',text: '',email: ''})
    const [btnDis,setBtnDis] = React.useState(false)
    const sign = async (e) =>{
        e.preventDefault()
        setBtnDis(true)
        try{
            if(int.password && int.text && int.email){
                const data = await request('/api/auth/sign','POST',{password: int.password,name: int.text,email: int.email})
                loginAuth(data.JWT,data.id)
                setInt({password: '',text: '',email: ''})
                redirect.replace('/home')
            }
        }
        catch(err){
            setTimeout(()=>{
                setBtnDis(false)
            },2000)
            setInt({password: '',text: '',email: ''})
        }
    }
    const log = async (e) =>{
        e.preventDefault()
        setBtnDis(true)
        try{
            if(int.password && int.email){
                const data = await request('/api/auth/log','POST',{password: int.password,email: int.email})
                loginAuth(data.JWT,data.id)
                setInt({password: '',text: '',email: ''})
                redirect.replace('/home')
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
        setInt({password: '',text: '',email: ''})
    },[route])
    return (
        <form>
            <div>
                <p className={`${error && style.errorRed}`}>Email</p>
                <input value={int.email} onChange={intHandler} type="email"/>
            </div>
            {route === 'sign' &&
            <div>
                <p className={`${error && style.errorRed}`}>Name</p>
                <input value={int.text} onChange={intHandler} type="text"/>
            </div>
            }
            <div>
                <p className={`${error && style.errorRed}`}>Password</p>
                <input value={int.password} onChange={intHandler} type="password"/>
            </div>
            <div className={style.formButtons}>
                <button disabled={btnDis} onClick={route === 'sign' ? sign : log}>{route === 'sign' ? 'Sing up' : 'Log in'}</button>
                {route === 'log' && <p onClick={()=>redirect.push('/auth/resetpassword')}>forgot your password?</p>}
            </div>
            <p style={{color: 'red', marginTop: '10px', textShadow: '1px 3px 9px rgba(150, 150, 150, 1)'}}>{error}</p>
        </form> 
    )
}

export default AuthForm
