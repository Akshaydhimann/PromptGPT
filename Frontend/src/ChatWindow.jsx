import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

function ChatWindow()
{
    const {prompt, setPrompt, reply, setReply, currThreadId} = useContext(MyContext);

    const getReply = async () => {
        console.log("message", prompt, "threadId", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
                //threadId: "abc123"  // use a constant string
            })
            };

            try{
                const response = await fetch("http://localhost:8080/api/chat", options);
                console.log(response);
            //     // ....................................
            //     console.log(data);
            //     setReply(data.reply);
            //    //......................................
            } catch(err) {
                console.log(err);
            }
        };


    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>PromptGPT &nbsp; <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            
            <Chat></Chat>
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    >
                    
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    PromptGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
            );
        }


export default ChatWindow;