import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { countriesList } from '../component/Countries/CountriesLIST'
import AvatarChange from '../component/Settings/AvatarChange'
import ChangeInfo from '../component/Settings/ChangeInfo'
import ChangePassword from '../component/Settings/ChangePassword'
import DeleteAccount from '../component/Settings/DeleteAccount'
import Signout from '../component/Settings/Signout'
import { useFetch } from '../hooks/useFetch'
import style from '../styles/settings.module.css'


const Settings = React.memo(() => {
    const profile = useSelector(({profile})=>profile)
    const {request,error} = useFetch()
    return (
        <div className={style.settings}>
            <div className={style.settingsContent}>
                <h1>Edit my profile</h1>
                <AvatarChange profile={profile} request={request} error={error}/>
                <div className={style.settingsInfo}>
                    <h2>Change Settings</h2>
                    <ChangeInfo style={style} profile={profile} request={request} error={error}/>
                    <ChangePassword style={style} profile={profile} request={request} error={error}/>
                    <DeleteAccount style={style} profile={profile} request={request} error={error}/>
                    <Signout style={style} profile={profile} request={request} error={error}/>
                    
                    {/* {serachCountry.map((it,i)=>(
                        <div key={it.name+'_'+it.id+'_'+i}>
                            <img src={it.img} />
                            <p>{it.name}</p>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
})

export default Settings
