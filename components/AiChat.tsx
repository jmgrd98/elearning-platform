'use client'

import { useState } from "react"

const AiChat = () => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      }
    
      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          getMessages();
        }
      }

  return (
    <div>
      
    </div>
  )
}

export default AiChat
