import './normal.css';
import './App.css';
import { useState, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'

function App() {

  useEffect(() => {
    getEngines();
  },[])

  const [input, setInput] = useState("");
  const [chatlog, setChatlog] = useState([{user:"gpt",message: "how can i help you today?"}, {user:"me",message: "hhow are you?"}]);
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState("ada");

  function clearChat(){
    setChatlog([]);
  }

  function getEngines() {
    fetch("http://localhost:3080/models")
    .then(res => res.json())
    .then(data => {
      setModels(data.models.data)
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    let chatlogNew = [...chatlog, {user: "me", message: `${input}`}]
    setInput("");
    setChatlog([chatlogNew]);

    const messages = chatlogNew.map((message) => message.message).join("\n")

    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      })
    });
    const data = await response.json();
    setChatlog([...chatlogNew, {user: "gpt", message: `${data.message}`}])
  }

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="new-chat-btn" onClick={clearChat}>
          New Chat
        </div>
        <div className="models">
          <select onChange={(e) => {
            setCurrentModel(e.target.value)
          }}>
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>{model.id}</option>
            ))}
          </select>
        </div>
      </aside>
      <section className="chat-area">
        <div className="chat-log">
          {chatlog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
            className="chat-input-box" 
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
