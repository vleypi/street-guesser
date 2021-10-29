import React from 'react'


const Users = ({style,it}) => {
    return (
        <div className={style.lobbyPlayer}>
            <p>{it.name}</p>
        </div>
    )
}

export default Users
