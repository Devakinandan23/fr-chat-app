import { useState, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const inputRef = useRef(null);
  const [socket, setSocket] = useState("");
  function handleSend(){
    //@ts-ignore
    let message = inputRef.current.value;
    const div = document.createElement('div');
    div.textContent = `${message}`;
    document.querySelector('.chatspace')?.appendChild(div);
    if(!socket){
      return;
    }
    socket.send(message.toString());
  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (event:any) => {
      console.log("server",event);
      const div = document.createElement('div');
      div.textContent = `${event.data}`;
      document.querySelector('.chatspace')?.appendChild(div);
      // alert(event.data);
    }
  },[])


  return (
    <>
      <input type="text" placeholder='message...' ref={inputRef}></input>
      <button onClick={handleSend}>send</button>
      <div className="chatspace"></div>
    </>
  )
}

export default App
