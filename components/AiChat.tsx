'use client'

import { useState } from "react"

const AiChat = () => {

    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      }
    
      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          getMessages();
        }
      }

      const getMessages = async () => {
        const apiKey = process.env.OPENAI_API_KEY
    
        const options = {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              model: 'gpt-4',
              messages: [
                  {
                      role: 'user',
                      content: inputValue
                  }
              ],
              max_tokens: 100
          })
      }
    
      try {
            const response = await fetch('\n' + 'https://api.openai.com/v1/chat/completions', options);
            const data = await response.json();
            setMessage(data.choices[0].message);
            setValue(inputValue);
          } catch (error) {
              console.error(error);
            } finally {
              setInputValue('');
            }
      };

  return (
    <div className='w-[100px] h-[300px] '>
      <p>Tire sua dúvida com a inteligência artificial.</p>

      <div className='w-full h-full bg-black/10'>

      </div>
    </div>
  )
}

export default AiChat
