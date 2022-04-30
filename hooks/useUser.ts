import { useEffect, useState } from "react";
import { supabase} from "../lib/supabase-client";

export default function User() {
  const [session, setSession] = useState();

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

  return {
    session,
    signInWithPassword,
    signOut,
  }
}
