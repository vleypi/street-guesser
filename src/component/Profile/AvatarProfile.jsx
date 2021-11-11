import React from 'react'
import style from '../../styles/profile.module.css'
import link from '../../image/link.svg'
import settings from '../../image/settings.svg'
import { useHistory } from 'react-router'
import Avatar from '../General/Avatar'


const AvatarProfile = ({profile,shortid}) => {
    const history = useHistory()
    const copyToClipBoard = async copyMe => {
        try{
            await navigator.clipboard.writeText(copyMe);
        }
        catch(err){
            return null
        }
    };
    return (
        <div className={style.avatar}>
            <div className={style.avatarIMG}>
                <Avatar profile={profile}/>
                {profile.shortid === shortid ? 
                    <div className={style.settings} onClick={()=>history.push('/settings')}>
                        <img src={settings}/>
                    </div> : <></>
                }
            </div>
            <div className={style.avatarNick}>
                <p>{profile.name}</p>
                <img src={link} onClick={() => copyToClipBoard('http://localhost:3000/profile/'+profile.shortid)}/> 
            </div>
        </div>
    )
}

export default AvatarProfile
