import React from 'react'

const ChangePassword = ({style,profile,request,error}) => {
    const [password,setPassword] = React.useState({oldPass: '', newPass: ''})
    const [load,setLoad] = React.useState('')
    const changepass = async () =>{
        try{
            if(password.oldPass && password.newPass){
                setPassword({oldPass: '', newPass: ''})
                setLoad('Loading...')
                const newpass = await request('/api/auth/changepassword', 'POST',{password},{auth: 'Bearer '+profile.JWT})
                if(newpass){
                    setLoad('Success')
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

    const inputHandler = (e) =>{
        setPassword({...password, [e.target.name]: e.target.value})
    }
    return (
        <div className={style.changePass}>
            <div className={style.changeContent}>
                <div>
                    <p style={{color: error && 'red'}}>{error ? error : 'Old Password'}</p>
                    <input type="password" onChange={inputHandler} name="oldPass" value={password.oldPass}/>
                </div>
                <div>
                    <p>New Password</p>
                    <input type="password" onChange={inputHandler} name="newPass" value={password.newPass}/>
                </div>
            </div>
            <button style={{pointerEvents: error && 'none', color: error && 'red' || load === 'Success' && '#00ff00'}} onClick={changepass} className={style.changeBtn} disabled={!!error}>
                {load ? load : 'Update'}
            </button>
        </div>
    )
}
export default ChangePassword
