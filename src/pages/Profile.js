import React from 'react'
import { useSelector } from 'react-redux'
import style from '../styles/profile.module.css'
import AvatarProfile from '../component/Profile/AvatarProfile'
import StatProfile from '../component/Profile/StatProfile'
import { NavLink } from 'react-router-dom'

const Profile = () => {
    const profile = useSelector(({profile})=>profile) 
    return (
        <div className={style.profile}>
            <div className={style.profileContent}>
                <AvatarProfile  shortid={profile.shortid} profile={profile}/>
                <StatProfile shortid={profile.shortid} profile={profile}/>
            </div>
        </div>
    )
}

export default Profile
