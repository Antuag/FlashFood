import React, { useEffect, useState } from 'react';
import '../../styles/chat.css';

const API_KEY = 'AIzaSyAjCfoERXorGMNWB-Xk375XAU56rbocmj8';

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    const mouth = document.getElementById('cat-mouth');
    if (mouth) mouth.classList.add('talking');

    utterance.onend = () => {
      if (mouth) mouth.classList.remove('talking');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const nuevoChat = [...chat, { sender: 'user', text: userMessage }];
    setChat(nuevoChat);
    setUserMessage('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Eres un asistente especializado en la página web Flash Food... Usuario: ${userMessage}\nAsistente:`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude entender tu mensaje.';
      setChat((prev) => [...prev, { sender: 'bot', text: botReply }]);

      speak(botReply);
    } catch (error) {
      console.error('Error al comunicarse con Gemini:', error);
      setChat((prev) => [...prev, { sender: 'bot', text: 'Ocurrió un error al responder. Intenta nuevamente.' }]);
    }

    setLoading(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    const mouth = document.getElementById('cat-mouth');
    if (mouth) mouth.classList.remove('talking');
  };

  return (
    <div className="chat-container">
      <h2>Asistente Flash Food</h2>

      <div className="cat-avatar">
        <div className="cat-ear left-ear"></div>
        <div className="cat-ear right-ear"></div>
        <div className="cat-eyes">
          <div className="cat-eye"></div>
          <div className="cat-eye"></div>
        </div>
        <div id="cat-mouth"></div>
        <div className="cat-whiskers">
          <div className="whisker" style={{ transform: 'rotate(-20deg)' }}></div>
          <div className="whisker" style={{ transform: 'rotate(20deg)' }}></div>
          <div className="whisker" style={{ transform: 'rotate(20deg)' }}></div>
          <div className="whisker" style={{ transform: 'rotate(-20deg)' }}></div>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <br />
        <button onClick={handleSend} disabled={loading}>Hablar</button>
        <button onClick={stopSpeech}>Detener</button>
        <br />
        <select onChange={(e) => setSelectedVoice(e.target.value)} value={selectedVoice}>
          <option value="">Selecciona una voz</option>
          {voices.map((v, i) => (
            <option key={i} value={v.name}>{v.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
