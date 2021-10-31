import React from 'react'
import { useAuth } from './hooks/useAuth'
import {  useSelector } from 'react-redux'
import { Redirect, useHistory} from 'react-router'
import {Switch,Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Header from './component/General/Header'
import Warn from './component/General/Warn'
import Game from './component/Game/Game'
import Lobby from './pages/Lobby'
import Mode from './pages/Mode'
import ConfirmWarn from './component/General/ConfirmWarn'
import ErrorPage from './component/General/404'
import Test from './pages/Test'

const AppTest = () => {
  useAuth()
  const state = useSelector(state => state)
  const history = useHistory()
  React.useEffect(()=>{
    window.addEventListener('keyup',(e)=>{
      if(e.key === 'Escape'){
        history.goBack()
      }
    })
  },[history])
  return (
    <>
    <Header />
    {state.profile.isActivated === false && <ConfirmWarn />}
    <Switch>
      <Route path="/" exact component={Home} />
      {state.profile.JWT ?
        <Switch>
          {!state.profile.isActivated && <Redirect to="/" />}
          <Route path="/create/:mode/:option" exact component={Mode} />}
          <Route path="/lobby" exact component={Lobby}/>
          {/* <Route path="/test" component={Test}/> */}
          <Route path="/rules" exact component={Rules} />
          {state.game.locs && <Route path="/game" component={Game}/>}
        </Switch> :
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/auth/resetpassword" exact component={Auth} />
          <Route path="/auth/newpassword/:link" exact component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      }

    </Switch>
    </>
  )
}

export default AppTest

const Rules = () =>{
  return(
    <div>rules</div>
  )
}