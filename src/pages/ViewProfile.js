import React from 'react'
import style from '../styles/profile.module.css'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import AvatarProfile from '../component/Profile/AvatarProfile';
import StatProfile from '../component/Profile/StatProfile';
import { useFetch } from '../hooks/useFetch';

const ViewProfile = () => {
    const {request} = useFetch()
    const params = useParams()
    const history = useHistory()
    const shortid = useSelector(({profile})=>profile.shortid)
    const [profile,setProfile] = React.useState(false)
    const users = async () => {
        try {
            const user = await request('/api/auth/profile/'+params.id,'POST',{shortid: shortid})
            setProfile(user)
            if(!user){
                history.replace('/404')
            }         
        } 
        catch (err) {
            history.push('/404')
        }
    };
    const [incognita,setIncognita] = React.useState(false)
    React.useEffect(async ()=>{
        if(params.id && shortid && !incognita){
            users()
        }
        else if(incognita && !shortid){
            users()
        }
        else{
            setIncognita(true)
        }
     },[shortid,incognita])
    return (
        <div className={style.profile}>
            <div className={style.profileContent}>
                {profile &&
                    <>
                        <AvatarProfile shortid={shortid} profile={profile} />
                        <StatProfile shortid={shortid} profile={profile} />
                    </>
                }
            </div>
        </div>
    )
}

export default ViewProfile
