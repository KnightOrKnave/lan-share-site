import { useEffect, useState } from "react";
import { supabase} from "../lib/supabase-client";

export default function User() {
  const [session, setSession] = useState<any>();
  const [messages,setMessages] = useState<any>([]);

  useEffect(() => {
    const { data: authListenner } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if(session!=null){
          setSession(session);
        }
      }
    );
    return () => {
      authListenner?.unsubscribe();
    };
  }, []);

  async function signInWithPassword(email:string,password:string){
    console.log(email);
    const r=await supabase.auth.signIn({email});
    console.log(r);
  }

  async function signOut(){
    await supabase.auth.signOut();
  }
  

  useEffect(()=>{
    const setupMessages=async()=>{
      if(session){
        const res=await supabase.from('messages').select('*');
        setMessages(res.data);
      };
    };
    setupMessages();
  },[session])

  async function refreshMessage(){
    const res=await supabase.from('messages').select('*');
    setMessages(res.data);
  }

  async function postMessage(msg:string){
    console.log(msg);
    await supabase.from('messages')
    .insert([{message:msg,user_id:supabase.auth.user()?.id,is_public:true}]);
  }

  return {
    session,
    messages,
    signInWithPassword,
    signOut,
    refreshMessage,
    postMessage
  }
}
