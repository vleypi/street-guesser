import React from 'react'
import style from '../../styles/profile.module.css'
import { useParams } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import like from '../../image/hearth.svg'
import view from '../../image/eye.svg'

const LikesProfile = ({profile,shortid}) => {
    const {request} = useFetch()
    const params = useParams()
    const [likes,setLikes] = React.useState(null)
    const [disable,setDisable] = React.useState(false)
    const putlike = async () =>{
        try {
            const user = await request(`/api/auth/putlike/${params.id ? params.id : shortid}`,'POST',{shortid: shortid},{auth: 'Bearer '+profile.JWT})
            profile.likes.put = user.likes.put
            profile.likes.num = user.likes.num
            setLikes(user.likes.put)
            setDisable(true)
        } 
        catch (err) {
          console.log(err)
        }
    }
    React.useEffect(()=>{
        setTimeout(()=>{
            setDisable(false)
        },2000)
    },[likes])
    return (
        <div style={{pointerEvents: disable && 'none'}} className={style.likeViews}>
            <div>
                <img style={{opacity: profile.likes.put === true || likes ? 1 : ''}} onClick={putlike} className={style.like} src={like} />
                <p>{profile.likes.num}</p>
            </div>
            <div>
                <img className={style.view} src={view} />
                <p>{profile.views}</p>
            </div>
        </div>
    )
}

export default LikesProfile
