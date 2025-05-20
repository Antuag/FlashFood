import React, { useEffect, useState } from 'react';
import '../../styles/chat.css';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';

const API_KEY = 'AIzaSyAjCfoERXorGMNWB-Xk375XAU56rbocmj8';
const BACKEND_URL = 'http://127.0.0.1:5000';

const KNOWLEDGE = `
🟢 Clientes:
¡Claro! Para crear o editar un cliente en Flash Food, solo sigue estos pasos:
1. Ve al panel de clientes desde el menú principal.
2. Haz clic en el botón "Agregar cliente" o selecciona uno existente para editar.
3. Ingresa: 🪪 Nombre, 📧 Correo, 📞 Teléfono, 📍 Dirección.
4. Revisa que todo esté bien escrito y haz clic en Guardar.

🟢 Pedidos:
1. Ve a la sección de pedidos y haz clic en "Agregar pedido".
2. Selecciona un cliente, productos o menús, conductor y dirección.
3. Revisa y guarda.

🟢 Restaurantes:
1. Ve a la sección de restaurantes.
2. Haz clic en "Agregar restaurante".
3. Llena nombre, dirección y teléfono.

🟢 Conductores:
1. Entra a conductores.
2. Haz clic en "Agregar conductor".
3. Ingresa nombre, teléfono, licencia y moto asignada.

🟢 Motos:
1. Accede al panel de motos.
2. Haz clic en "Agregar moto".
3. Llena modelo, placa y año.

🟢 Turnos:
1. Entra a turnos.
2. Haz clic en "Agregar turno".
3. Selecciona día, hora y conductor.
`;

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [backendData, setBackendData] = useState('');

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

  useEffect(() => {
    const endpoints = [
      'restaurants', 'products', 'menus', 'customers', 'orders',
      'addresses', 'motorcycles', 'drivers', 'shifts', 'issues', 'photos'
    ];

    const fetchAllData = async () => {
      try {
        const results = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`${BACKEND_URL}/${endpoint}`)
              .then(res => res.json())
              .then(data => ({ endpoint, data }))
          )
        );

        const resumen = results.map(r =>
          `Datos de ${r.endpoint}:\n${JSON.stringify(r.data, null, 2)}`
        ).join('\n\n');

        setBackendData(resumen);
      } catch (error) {
        console.error('Error al obtener datos del backend:', error);
      }
    };

    fetchAllData();
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
      const prompt = `
Eres un asistente especializado en la página Flash Food. Tu tarea es responder en español preguntas sobre restaurantes, productos, menús, clientes, pedidos, direcciones, motos, conductores, turnos, inconvenientes y fotos.

Conocimiento base:
${KNOWLEDGE}

Información actual del sistema:
${backendData}

Pregunta del usuario: ${userMessage}
Respuesta del asistente:
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
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
    <Box
      className="chat-container"
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 20,
        mb: 3,
        p: 3,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Asistente Flash Food
      </Typography>

      <Box className="cat-avatar" sx={{ mb: 2 }}>
        <div className="cat-eyes">
          <div className="cat-eye"><div className="pupil"></div></div>
          <div className="cat-eye"><div className="pupil"></div></div>
        </div>
        <div id="cat-mouth"></div>
      </Box>

      <Paper
        elevation={2}
        className='customers-scrollbar'
        sx={{
          width: '100%',
          minHeight: 180,
          maxHeight: 260,
          overflowY: 'auto',
          mb: 2,
          mt: 4,
          p: 2,
          bgcolor: '#23272f', // Fondo oscuro
          color: '#fff',      // Letra blanca
        }}
      >
        {chat.length === 0 ? (
          <Typography color="grey.400" align="center">
            ¡Hola! ¿En qué puedo ayudarte hoy?
          </Typography>
        ) : (
          chat.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 1.5,
                display: 'flex',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Paper
                sx={{
                  p: 1.2,
                  bgcolor: msg.sender === 'user' ? 'primary.main' : '#343a40', // Fondo diferente para usuario y bot
                  color: '#fff',
                  borderRadius: 2,
                  maxWidth: '80%',
                  minWidth: 80,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#fff' }}>
                  {msg.text}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={24} color="inherit" />
          </Box>
        )}
      </Paper>

      <Stack direction="row" spacing={1} width="100%" alignItems="center" mb={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Escribe tu mensaje..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={loading || !userMessage.trim()}
        >
          Hablar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={stopSpeech}
        >
          Detener
        </Button>
      </Stack>

      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
        <InputLabel>Selecciona una voz</InputLabel>
        <Select
          value={selectedVoice}
          label="Selecciona una voz"
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <MenuItem value="">Predeterminada</MenuItem>
          {voices.map((v, i) => (
            <MenuItem key={i} value={v.name}>{v.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
