import { supabase } from "../lib/supabase-client";

export default function Messages(){
  const [messages,setMessages]=useState([]);

  async function getMessages(){
    const {data:messages,error}=await supabase.from('messages').select('*');
    setMessages(data);
  }

}