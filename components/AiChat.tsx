'use client'

import { useState } from "react";
import { Typewriter } from 'react-simple-typewriter';
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const AiChat = () => {

    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState<string>('');
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
            setMessage(data.choices[0].message.content);
            setValue(inputValue);
        } catch (error) {
            console.error(error);
        } finally {
            setInputValue('');
        }
    };

    return (
        <div className='w-1/2 h-full max-h-[330px] '>
            <p className="w-full font-bold">Tire sua dúvida com a inteligência artificial.</p>
            <div className='flex flex-col gap-2 w-full h-full bg-black/10 p-2 rounded justify-between'>
            <Typewriter 
                words={[message]}
                typeSpeed={20}
            />
                <div className='flex flex-col gap-2'>
                    <Textarea
                        placeholder='Tire sua dúvida'
                        className='bg-black/20'
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <Button variant={'purple'} onClick={getMessages}>Enviar</Button>
                </div>
            </div>
        </div>
    )
}

export default AiChat;
