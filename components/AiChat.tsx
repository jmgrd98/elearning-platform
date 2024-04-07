'use client'

import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const AiChat = () => {
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]); // Array to store chat history
    const [displayedMessage, setDisplayedMessage] = useState<string>(''); // Message currently being displayed
    const [typingEffectIndex, setTypingEffectIndex] = useState<number>(0); // Index for the typing effect

    useEffect(() => {
        // Start typing effect when chat history changes
        if (typingEffectIndex < chatHistory.length) {
            startTypingEffect();
        }
    }, [chatHistory, typingEffectIndex]);

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
            const newMessage = data.choices[0].message.content;
            // Update chat history with the new message
            setChatHistory(prevHistory => [...prevHistory, newMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setInputValue('');
        }
    };

    // Function to start the typing effect
    const startTypingEffect = () => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= chatHistory[typingEffectIndex].length) {
                setDisplayedMessage(chatHistory[typingEffectIndex].slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setTypingEffectIndex(prevIndex => prevIndex + 1); // Move to the next message
            }
        }, 50); // Adjust typing speed as needed
    };

    return (
        <div className='w-1/2 h-full max-h-[330px] '>
            <p className="w-full font-bold">Tire sua dúvida com a inteligência artificial.</p>
            <div className='flex flex-col gap-2 w-full h-full bg-black/10 p-2 rounded justify-between'>
                <div className="flex flex-col gap-1">
                    <p className="text-black">{displayedMessage}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <Textarea
                        placeholder='Tire sua dúvida'
                        className='bg-black/20'
                        value={inputValue}
                        onChange={() => handleInputChange}
                        onKeyPress={() => handleKeyPress}
                    />
                    <Button variant={'purple'} onClick={getMessages}>Enviar</Button>
                </div>
            </div>
        </div>
    )
}

export default AiChat;
