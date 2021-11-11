import React from 'react'
import { setAvatar } from '../../redux/actions/profile'
import {useDispatch,useSelector} from 'react-redux'
import style from '../../styles/settings.module.css'
import Avatar from '../General/Avatar'
import { useFetch } from '../../hooks/useFetch'

const AvatarChange = ({profile,request}) => {
    const dispatch = useDispatch()
    const [color,setColor] = React.useState({icon: null, back:null})
    const [load,setLoad] = React.useState(false)
    const colorHandler = (e) =>{
        setColor({...color, [e.target.name]:  e.target.value})
    }
    const reset = () =>{
        setColor(profile.avatar)
    }

    React.useEffect(()=>{
        setColor(profile.avatar)
    },[profile.avatar])

    const change = async () =>{
        try{
            if(profile.avatar !== color){
                setLoad(true)
                const avatar = await request('/api/auth/avatar', 'POST',{avatar: color}, {auth: 'Bearer '+profile.JWT})
                dispatch(setAvatar(avatar.avatar))
                setLoad(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className={style.avatarSettings}>
            <Avatar profile={{avatar: {icon: color.icon, back: color.back}}}/>
            <p>Change icon</p>
            <div className={style.changeAvatarSettings}>
                <input onChange={colorHandler} type="color" name="icon" value={color.icon}/>
                <input onChange={colorHandler} type="color" name="back" value={color.back}/>
            </div>
            {profile.avatar.icon !== color.icon || profile.avatar.back !== color.back ?
                <>
                <button disabled={load} className={style.changeBtn} onClick={change}>Change</button>
                <button disabled={load} onClick={reset} className={style.cancelBtn}>Cancel</button>
                </> : <div className={style.emptyGap}></div>
            }
        </div>
    )
}

export default AvatarChange
