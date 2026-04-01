"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const RealEstateChatbot = () => {
    // 1. STATE (Zustand)
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hallo! Ich bin dein digitaler KI-Assistent. Wie kann ich dir heute helfen? Hello! I am your digital AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 2. AUTO-SCROLL LOGIK (Muss zwingend hier oben stehen!)
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // 3. NACHRICHT SENDEN
    const handleSend = async () => {
        if (!input.trim()) return;

        const newUserMessage = { role: 'user', content: input };
        const uiUserMessage = { sender: 'user', text: input };

        setMessages((prev) => [...prev, uiUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiMessages = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));
            apiMessages.push(newUserMessage);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server hat unerwartet geantwortet (Kein JSON).");
            }

            const data = await response.json();

            if (response.ok) {
                const botMessage = { sender: 'bot', text: data.reply };
                setMessages((prev) => [...prev, botMessage]);
            } else {
                const errorMessage = { sender: 'bot', text: 'Ups, Fehler: ' + data.error };
                setMessages((prev) => [...prev, errorMessage]);
            }

        } catch (error) {
            console.error("Fetch-Fehler:", error);
            const errorMessage = { sender: 'bot', text: 'Netzwerkfehler oder Backend-Absturz. Bitte schau ins VS Code Terminal.' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // 4. DAS UI (Das Aussehen)
    return (
        <div className="chatbot-wrapper">
            {/* Headerbereich */}
            <div className="chatbot-header">
                <h3 className="chatbot-title">KI-Assistent</h3>
                <p className="chatbot-subtitle">Objektsuche, Dokumenten-Check & Termine</p>
            </div>

            {/* Chat-Verlauf */}
            <div className="chatbot-body" ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-row ${msg.sender === 'user' ? 'row-user' : 'row-bot'}`}>
                        <div className={`chat-message ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>

                            {msg.sender === 'bot' ? (
                                <div className="markdown-content">
                                    <ReactMarkdown>{msg.text || ""}</ReactMarkdown>
                                </div>
                            ) : (
                                msg.text
                            )}

                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="chat-row row-bot">
                        <div className="chat-message msg-bot italic">Der Assistent tippt...</div>
                    </div>
                )}

                {/* Unser unsichtbarer Anker für den Auto-Scroll */}
            </div>

            {/* Eingabebereich */}
            <div className="chatbot-footer">
                <button className="chatbot-upload-btn" title="PDF hochladen">📎</button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Z.B. welche Dienstleistungen bieten Sie an?"
                    className="chatbot-input"
                />
                <button onClick={handleSend} className="chatbot-send-btn">Senden</button>
            </div>
        </div>
    );
};

export default RealEstateChatbot;