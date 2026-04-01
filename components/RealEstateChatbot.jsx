"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const RealEstateChatbot = () => {
  // === 1. ZUSTAND (State) ===
  const [isOpen, setIsOpen] = useState(false); // Steuert, ob der Chat offen oder zu ist
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hallo! Ich bin dein digitaler KI-Assistent. Wie kann ich dir heute helfen? \n\n Hello! I am your digital AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // === 2. VERBESSERTE AUTO-SCROLL LOGIK ===
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Scrollt NUR die Chat-Box, nicht die ganze Webseite!
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Scrollt nach unten, wenn neue Nachrichten kommen ODER der Chat geöffnet wird
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // === 3. CHAT ÖFFNEN / SCHLIESSEN ===
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // === 4. NACHRICHT SENDEN ===
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

  // === 5. DAS UI (Das Aussehen) ===
  return (
    <div className="chatbot-container">
      
      {/* Der runde Button am Bildschirmrand */}
      <button className="chatbot-toggle-icon" onClick={toggleChat} title="Chatbot öffnen/schließen">
        {isOpen ? '✕' : '🗨️'}
      </button>

      {/* Das Chat-Fenster (wird nur gerendert, wenn isOpen "true" ist) */}
      {isOpen && (
        <div className="chatbot-wrapper floating">
          {/* Headerbereich */}
          <div className="chatbot-header">
            <div className="header-text-group">
              <h3 className="chatbot-title">KI-Assistent</h3>
              <p className="chatbot-subtitle">Zentara Webentwicklung & Support</p>
            </div>
            {/* Schließen-X oben rechts im Chat */}
            <button className="chatbot-close-btn" onClick={toggleChat}>✕</button>
          </div>

          {/* Chat-Verlauf (Hier sitzt jetzt die Ref für den Scroll!) */}
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
          </div>

          {/* Eingabebereich */}
          <div className="chatbot-footer">
            <button className="chatbot-upload-btn" title="Datei hochladen">📎</button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Z.B. Was kosten Ihre Dienste?"
              className="chatbot-input"
            />
            <button onClick={handleSend} className="chatbot-send-btn">Senden</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateChatbot;