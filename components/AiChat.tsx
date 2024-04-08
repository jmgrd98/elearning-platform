'use client'

import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import luide from '../public/luide.jpg';
import Image from "next/image";

const AiChat = () => {
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [displayedMessage, setDisplayedMessage] = useState<string>('');
    const [typingEffectIndex, setTypingEffectIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDisplayedMessage('Fala creator! Aqui é o Luide, em que posso ajudar?');
        startTypingEffect();
    }, [])

    useEffect(() => {
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
        setIsLoading(true);
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
                        content: `Aja como o youtuber e streamer brasileiro Luide Matos.
                                 Luide ensina pessoas a criarem conteúdo na internet e desenvolver uma carreira baseada nisso, vendendo produtos digitais etc.
                                 Fale como o Luide fala, ele é bem próximo de sua audiência e às vezes um pouco sarcástico.
                                 Ele é de esquerda politicamente e gosta de cozinhar comer e tomar uma cerveja.
                                 Luide tem uma filha que ele ama bastante chamada Alice.
                                 Luide gosta de monogamia.
                                 Luide é criador de conteúdo na internet há mais de 10 anos, ele tem muita experiência na área de marketing digital.
                                 Falando como se fosse o Luide e sem sair do personagem, responda a seguinte pergunta e estruture o seu texto de resposta em parágrafos para uma melhor experiência de leitura do usuário: ${inputValue}`
                    }
                ],
                max_tokens: 500
            })
        }
    
        try {
            const response = await fetch('\n' + 'https://api.openai.com/v1/chat/completions', options);
            const data = await response.json();
            const newMessage = data.choices[0].message.content;
            setChatHistory(prevHistory => [...prevHistory, newMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setInputValue('');
            setIsLoading(false);
        }
    };

    const startTypingEffect = () => {
        if (typingEffectIndex >= chatHistory.length) {
            return;
        }
    
        let currentIndex = 0;
        const interval = setInterval(() => {
            const currentMessage = chatHistory[typingEffectIndex];
            if (!currentMessage) {
                clearInterval(interval);
                setTypingEffectIndex(prevIndex => prevIndex + 1);
                return;
            }
    
            if (currentIndex <= currentMessage.length) {
                setDisplayedMessage(currentMessage.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setTypingEffectIndex(prevIndex => prevIndex + 1);
            }
        }, 20);
    };
    

    return (
        <div className='w-full h-screen max-h-[330px] flex flex-col justify-between '>
            <div className='flex flex-col gap-2 w-full min-h-[450px] bg-black/10 p-2 rounded justify-between'>
                <div className="flex flex-col gap-1 overflow-y-scroll">
                    <div className='flex items-center gap-3 mb-2'>
                        <Image src={luide} alt="Luide" width={50} height={50} className="rounded-full" />
                        <p className='text-xl font-bold text-black'>Luide Matos</p>
                    </div>
                    <p className="text-black">{displayedMessage}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <Textarea
                        placeholder='Tire sua dúvida'
                        className='bg-black/20'
                        value={inputValue}
                        onChange={(e: any) => handleInputChange(e)}
                        onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                </div>
            </div>
            <Button className="mt-5 w-full" variant={'purple'} onClick={getMessages}>{isLoading ? 'Enviando...' : 'Enviar'}</Button>
        </div>
    )
}

export default AiChat;
