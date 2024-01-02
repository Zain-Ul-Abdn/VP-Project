import React, { useRef, useState } from 'react'
import './chatSection.css'
import sendArrowlogo from '../Icons/send_arrow.png'
import gptlogo from '../Icons/gpt_logo.png'

export default function ChatsSections() {

  const [textareaHeight, setTextareaHeight] = useState('3rem');
  const [inputValue, setInputValue] = useState('');
  const [gptResponse, setGptResponse] = useState('How can I help you ');
  
  const { GoogleGenerativeAI } = require("@google/generative-ai")
  const genAI = new GoogleGenerativeAI('AIzaSyDRi2rhZ--yCVOkPnyjo2ojABr4FX5cM6M');
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });



  const [messages, setMessages] = useState([]);

  // setGptResponse(GPT())

  let textareaRef = useRef(null)
  const maxHeight = 150;

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = '3rem'
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      setTextareaHeight(textarea.scrollHeight < newHeight ? 'auto' : `${newHeight}px`);
    }
  }


const aiResponse = async (user_prompt) => {
    const prompt = user_prompt;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      try {
        aiResponse(inputValue).then((response) => {
          setGptResponse(response);
          setMessages([...messages, { userVal: inputValue, gptResponse: response }]);
          console.log("Running");
          Post_Data();
          setInputValue('');
          adjustTextareaHeight();
        });
      } catch (error) {
        console.log("Error",error);
      }
     
    }
  };

  //Send data to server and then save into a mongodb
  const Post_Data = async () => {

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Corrected typo in "Content-Type"
        },
        body: JSON.stringify({
          query: inputValue,
          response: gptResponse,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };


  return (
    <div className='Chat-container'>

      <div className="Chat-Display">

        {(messages.length !== 0) ? (
          messages.map(({ userVal, gptResponse }, index) =>
            <div key={index}>
              <div className="userChat">
                <span className="userImage">Z</span>
                <p className="userQuestion">{userVal}</p>
              </div>
              <div className="bootChat">
                <span className="bootImage">
                  <img src={gptlogo} alt="GPT Logo" />
                </span>
                <p className="bootResponse">
                  {gptResponse}
                </p>
              </div>
            </div>
          )) : (
          //Show message when there is no chats between user and gpt
          <div className='startupMessage'>
            <span>
              <img src={gptlogo} alt='GPT logo' />
            </span>
            <p>How can I help you today?</p>
          </div>
        )}

      </div>

      <div className="userInput" >
        <textarea
          id="message-box"
          placeholder='Send a message'
          ref={textareaRef}
          style={{
            height: textareaHeight,
          }}
          onInput={adjustTextareaHeight}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button>
          <img
            src={sendArrowlogo}
            alt='Arrow logo' />
        </button>
      </div>
      <footer id='gptFooter'>ChatGPT can make mistakes. Consider checking important information.</footer>

    </div >

  )
}
