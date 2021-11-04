import React from 'react'
import { useAuth } from './hooks/useAuth'
import {  useSelector } from 'react-redux'
import { useHistory, useLocation} from 'react-router'
import {Switch,Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Main from './pages/Main'
import Home from './pages/Home'
import Header from './component/General/Header'
import Warn from './component/General/Warn'
import Game from './component/Game/Game'
import Lobby from './pages/Lobby'
import Mode from './pages/Mode'
import ConfirmWarn from './component/General/ConfirmWarn'
import game from './redux/actions/game'

const App = () => {
  useAuth()
  const state = useSelector(state => state)
  const history = useHistory()
  const location = useLocation()
  React.useEffect(()=>{
    window.addEventListener('keyup',(e)=>{
      if(e.key === 'Escape'){
        history.goBack()
      }
    })
  },[])
  React.useEffect(()=>{
    if(state.game.locs && location !== '/game'){
      history.replace('/game')
    }
  },[location])
  return (
    <>
      <Switch>
        <Route path="/"  exact component={Main}/>
        {state.profile.JWT ?
          <>
            <Header />
            {!state.profile.isActivated && <ConfirmWarn />}
              {
                !state.profile.warn ?
                <Switch>
                  {!state.game.locs ?  
                    <>
                      <Route path="/home" exact component={Home} />
                      {state.profile.isActivated &&
                        <>
                          <Route path="/home/create/:mode/:option" exact component={Mode} />
                          <Route path="/home/lobby" component={Lobby}/>
                        </>
                      }
                      <Route path="/rules" exact component={Rules} />
                      <Route path="*" exact component={ErrorComp} />
                    </> :
                    <>
                      <Route path="/home/game" exact component={Game}/>
                    </>
                  }
                </Switch>:
                <Warn />
              } 
          </> :
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <Route path="/auth/resetpassword" exact component={Auth} />
            <Route path="/auth/newpassword/:link" exact component={Auth} />
          </Switch>
        }
        
      </Switch>
    </>
  )
}

export default App

const ErrorComp = () =>{
  return(
    <div>
      ffsdfdsfds
    </div>
  )
}
const Rules = () =>{
  return(
    <div>rules</div>
  )
}