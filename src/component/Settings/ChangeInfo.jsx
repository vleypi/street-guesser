import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { countriesList } from '../Countries/CountriesLIST'
import {useFetch} from '../../hooks/useFetch'
import { setProfileName } from '../../redux/actions/profile'

const errors = ['Max size of name is 8 symbols','Min size of name is 3 symbols','You already have this name','This name already exist']

const ChangeInfo = ({style,profile,request,error}) => {
    const dispatch = useDispatch()
    const [name,setName] = React.useState('')
    const [load,setLoad] = React.useState('')
    React.useEffect(()=>{
        setName(profile.name)
    },[profile.name])
    const updateName = async  () =>{
        try{
            if(name !== profile.name){
                setLoad('Loading...')
                const update = await request('/api/auth/name', 'POST',{name},{auth: 'Bearer '+profile.JWT})
                if(update){
                    setLoad('Success')
                    dispatch(setProfileName(update.name))
                    setTimeout(()=>{
                        setLoad('')
                    },5000)
                }
                else{
                    setLoad('Failure')
                    setTimeout(()=>{
                        setLoad('')
                    },5000)
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className={style.changeInfo}>
            <div className={style.changeContent}>
                <div>
                    {errors.includes(error) ? <p style={{color: 'red'}}>{error}</p> : <p>Change Name</p> }
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <button style={{pointerEvents: errors.includes(error) && 'none', color: errors.includes(error) && 'red' || load === 'Success' && '#00ff00'}} onClick={updateName} disabled={!!error || !!load} className={`${style.changeBtn}`}>
                        {load ? load : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeInfo
