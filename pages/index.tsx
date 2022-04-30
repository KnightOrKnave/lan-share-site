import type { NextPage } from 'next'
import { useState } from 'react'
import User from '../hooks/useUser'

const Home: NextPage = () => {
  const {session,signOut,signInWithPassword}=User()
  const [text,setText]=useState('');

  const handleChange=(e:any)=>{
    setText(()=>e.target.value);
  }

  return (
    <>
    {session?(
      <button onClick={()=>signOut()}>サインアウト</button>
    ):(
      <div>
      <input id='mail' type={'text'} onChange={handleChange}></input><br/>
      <button onClick={()=>signInWithPassword(text,'')}>サインイン</button>
      </div>
    )}
    </>
  )
}

export default Home
