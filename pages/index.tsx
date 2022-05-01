import type { NextPage } from "next";
import { useState } from "react";
import User from "../hooks/useUser";

const Home: NextPage = () => {
  const { session, messages, signOut, signInWithPassword, refreshMessage, postMessage } =
    User();
  const [text, setText] = useState("");
  const [newMessage,setMessage]=useState({value:''});

  const handleChange = (e: any) => {
    setText(() => e.target.value);
  };

  const handlePost=()=>{
    console.log(newMessage)
    postMessage(newMessage.target.value)
    refreshMessage();
  }

  return (
    <>
      {session ? (
        <div>
          <button onClick={() => signOut()}>サインアウト</button>

          <div>
            <p>投稿メッセージ</p>
            {messages.map((item: any) => {
              return <div key={item.id}>*{item.message}*</div>;
            })}
          </div>
          <button onClick={() => refreshMessage()}>更新</button>
          <textarea name="value" id="value" cols={80} rows={3} value={newMessage.value} onChange={(e)=>setMessage(e)}></textarea>
          <button id={"submit"} onClick={() => handlePost()}>Submit</button>
        </div>
      ) : (
        <div>
          <input id="mail" type={"text"} onChange={handleChange}></input>
          <br />
          <button onClick={() => signInWithPassword(text, "")}>
            サインイン
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
