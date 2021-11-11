import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import {useAuth} from '../../hooks/useAuth'
import { setProfile } from '../../redux/actions/profile'

const Signout = ({style,profile,request}) => {
    const dispatch = useDispatch()
    const [load,setLoad] = React.useState(false)
    const history = useHistory()
    const logout = async () =>{
        try{
            setLoad(true)
            await request('/api/auth/logout','POST',null,{auth: 'Bearer '+profile.JWT})
            dispatch(setProfile(null,null,null,null,null,null,null,null,null,null,null,null,null,null))
            localStorage.removeItem('data')
            history.replace('/')
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className={style.signout}>
            <h3>Signout</h3>
            <button disabled={load} onClick={logout} className={style.Delete}>Signout</button>
        </div>
    )
}

export default Signout
