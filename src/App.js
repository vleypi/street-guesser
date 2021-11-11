import React from 'react'
import { useAuth } from './hooks/useAuth'
import {  useSelector } from 'react-redux'
import { Redirect, useHistory} from 'react-router'
import {Switch,Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Header from './component/General/Header'
import Game from './component/Game/Game'
import Lobby from './pages/Lobby'
import Mode from './pages/Mode'
import ConfirmWarn from './component/General/ConfirmWarn'
import ErrorPage from './component/General/404'
import Test from './pages/Test'
import Countries from './pages/Countries'
import Profile from './pages/Profile'
import ViewProfile from './pages/ViewProfile'
import Settings from './pages/Settings'

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
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/:id" exact component={ViewProfile} />
          <Route path="/countries" exact component={Countries} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/rules" exact component={Rules} />
          {!state.profile.isActivated && <Redirect to="/" />}
          <Route path="/create/:mode/:option" exact component={Mode} />
          <Route path="/lobby" exact component={Lobby}/>
          {state.game.locs && <Route path="/game" component={Game}/>}
          <Route path="*" component={ErrorPage} />
        </Switch> :
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/auth/resetpassword" exact component={Auth} />
          <Route path="/auth/newpassword/:link" exact component={Auth} />
          <Route path="/countries" exact component={Countries} />
          <Route path="/profile/:id" exact component={ViewProfile} />
          <Route path="*" component={ErrorPage} />
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