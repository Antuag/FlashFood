// src/pages/Chatbot/Chatbot.jsx
import React, { useState } from 'react';

const API_KEY = 'AIzaSyAjCfoERXorGMNWB-Xk375XAU56rbocmj8';

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const temasPermitidos = ['precio', 'servicio', 'contacto', 'horario', 'ubicación', 'producto', 'pedido', 'entrega', 'inconveniente'];

  const esPreguntaValida = (mensaje) => {
    return temasPermitidos.some((tema) => mensaje.toLowerCase().includes(tema));
  };

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const nuevoChat = [...chat, { sender: 'user', text: userMessage }];
    setChat(nuevoChat);
    setUserMessage('');

    if (!esPreguntaValida(userMessage)) {
      setChat([...nuevoChat, { sender: 'bot', text: 'Lo siento, solo puedo ayudarte con información sobre nuestros servicios o productos.' }]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    'Eres un asistente para el sitio web de nuestra empresa. Solo debes responder preguntas relacionadas con servicios, productos, precios, horarios, contacto, entregas e inconvenientes. Si te preguntan algo fuera de eso, responde "Lo siento, solo puedo ayudarte con información sobre nuestro sitio web y servicios."',
                },
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude entender tu mensaje.';

      setChat((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error al comunicarse con Gemini:', error);
      setChat((prev) => [...prev, { sender: 'bot', text: 'Ocurrió un error al responder. Intenta nuevamente.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chatbot Inteligente</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
            <strong>{msg.sender === 'user' ? 'Tú' : 'Asistente'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Escribe tu mensaje"
        style={{ width: '70%', marginRight: '10px' }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
}
