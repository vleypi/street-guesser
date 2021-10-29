import React from 'react'
import { socket } from '../../../../hooks/useAuth'
import { useSelector,useDispatch } from 'react-redux'
import Notice from './Notice'
import { roundEnd } from '../../../../redux/actions/game'

const NoticeHandler = ({style}) => {
    const id = useSelector(({profile}) => profile.id)
    const dispatch = useDispatch()
    const [notice,setNotice] = React.useState([])
    React.useEffect(()=>{
        socket.on('404Country',msg=>{
            setNotice(nt => nt.concat({type: '404',info: msg}))
        })
        socket.on('guessPts',msg=>{
            setNotice(nt => nt.concat({type: 'guesspts',info: msg}))
        })
        socket.on('been',msg=>{
            setNotice(nt => nt.concat({type: 'been',info: msg}))
        })
        socket.on('correct',msg=>{
            setNotice(nt => nt.concat({type: 'correct',info: msg}))
        })
        socket.on('incorrect',msg=>{
            setNotice(nt => nt.concat({type: 'incorrect',info: msg}))
        })
    },[])
    return (
        <div className={style.notice}>
            {notice.map((it,index)=>(
                <Notice it={it} state={id} key={index+'_'+it.type}/>
            ))}
        </div>
    )
}

export default NoticeHandler
