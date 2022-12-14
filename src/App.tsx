//lib
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from './firebase'
import { selectUser, login, logout } from './features/userSlice'
//components
import Feed from './components/Feed'
import Auth from './components/Auth'
//styles
import styles from './App.module.css'

const App: React.FC = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          })
        )
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}

export default App
