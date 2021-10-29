import React from 'react'
import AuthForm from '../component/Auth/Auth.form'
import style from '../styles/auth.module.css'
import { useHistory,useParams } from 'react-router'
import ForgotForm from '../component/Auth/Forgot.form'
import NewPassword from '../component/Auth/New.form.password'

const Auth = () => {
    const [route,setRoute] = React.useState('log')
    const redirect = useHistory()
    const params = useParams()
    const routesHandler = (route) =>{
        setRoute(route)
    }
    return (
        <div className={style.auth}>
            <div className={style.content}>
                <div className={style.box}>
                    {redirect.location.pathname === '/auth' &&
                        <>
                        <div className={style.routes}>
                            <button className={`${route === 'log' ? style.active : ''}`} onClick={()=>routesHandler('log')}>Log in</button>
                            <button className={`${route === 'sign' ? style.active : ''}`} onClick={()=>routesHandler('sign')}>Sign up</button>
                        </div>
                        <AuthForm redirect={redirect} route={route} style={style}/>
                        </>
                    }
                    {redirect.location.pathname === '/auth/resetpassword' &&
                        <ForgotForm redirect={redirect} route={route} style={style}/>
                    }
                    {redirect.location.pathname === '/auth/newpassword/'+params.link  &&
                        <NewPassword redirect={redirect} route={route} style={style} params={params}/>
                    }
                </div>
                <div onClick={()=>redirect.push('/')} className={style.authMap}>
                    <div>
                        <h2>MapsGuesser</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
