import type { NextPage } from "next";
import { useState } from "react";
import User from "../hooks/useUser";

const Home: NextPage = () => {
  const { session, messages, signOut, signInWithPassword, refreshMessage } =
    User();
  const [text, setText] = useState("");

  const handleChange = (e: any) => {
    setText(() => e.target.value);
  };

  return (
    <>
      {session ? (
        <div>
          <button onClick={() => signOut()}>サインアウト</button>

          <div>
            <p>投稿メッセージ</p>
            {console.log(JSON.stringify(messages))}
            {messages.map((item: any) => {
              {
                console.log(item.message);
              }
              return <div key={item.id}>*{item.message}*</div>;
            })}
          </div>
          <button onClick={() => refreshMessage()}>更新</button>
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
