import React from 'react'
import { useHistory } from 'react-router'

const DeleteAccount = ({style,profile,request}) => {
    const [password,setPassword] = React.useState('')
    const [error,setError] = React.useState('')
    const [load,setLoad] = React.useState('')
    const history = useHistory()
    const deleteAccount = async () =>{
        try{
            if(password){
                setLoad()
                const deleteAccount = await request('/api/auth/deleteAccount', 'POST',{password},{auth: 'Bearer '+profile.JWT})
                if(deleteAccount){
                    setError(deleteAccount.message)
                    setTimeout(()=>{
                        setError('')
                    },5000)
                }
                else{
                    history.replace('/')
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className={style.deleteAccount}>
            <h3>Delete Account</h3>
            <p>{error ? error : 'if you delete your account, we will not be able to return it'}</p>
            <div>
                <p>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
            </div>
            <button disabled={!password} onClick={deleteAccount} className={style.Delete}>Delete</button>
        </div>
    )
}

export default DeleteAccount
