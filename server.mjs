import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import axios from 'axios';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware setup
app.use(cors());
app.use(express.json());

// Track WebSocket connections
const connections = new Map();

// WebSocket connection
wss.on('connection', (ws) => {
    const requestId = Math.random().toString(36).substring(7);
    connections.set(requestId, ws);

    // Handle connection close
    ws.on('close', () => {
        connections.delete(requestId);
    });

    // Handle WebSocket errors
    ws.on('error', (err) => {
        console.error(`WebSocket error for ${requestId}:`, err);
        connections.delete(requestId);
    });

    // Send the requestId to the client
    ws.send(JSON.stringify({ type: 'requestId', requestId }));
});

// Route for testing the server
app.get('/', (req, res) => {
    res.send('Hello World');
});

// /chat endpoint to handle chat requests
app.post('/chat', async (req, res) => {
    const { input_value, requestId } = req.body;
    const ws = connections.get(requestId);

    if (!ws) {
        console.error(`WebSocket connection not found for requestId: ${requestId}`);
        return res.status(400).json({ error: 'WebSocket connection not found' });
    }

    try {
        // Sending the request to the external API
        const response = await axios.post(
            'https://api.langflow.astra.datastax.com/lf/f26ad8b1-b0ce-44f4-8810-cae6a787cbbf/api/v1/run/4580c05e-a327-4e27-b733-5ccbcfa2eb22?stream=false',
            {
                input_value,
                output_type: 'chat',
                input_type: 'chat',
                tweaks: {
                    "ParseData-bU2Lk": {},
                    "SplitText-s45X9": {},
                    "OpenAIModel-Bunci": {},
                    "ChatOutput-8sI0F": {},
                    "AstraDB-66x6b": {},
                    "File-j3YRd": {},
                    "ChatInput-iAwEu": {},
                    "CombineText-1kBZ6": {},
                    "TextInput-upHmt": {}
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer AstraCS:mcHhJHJOFFfeXEaAmMTXCRcC:9618af21b849fd22f5ebf570716fa0387b3ff7b37f7659783189f738d52d8071`
                }
            }
        );

        // Extract message from the response
        const message = response.data.outputs[0].outputs[0].results.message.text;

        // Send message back to the WebSocket client
        ws.send(JSON.stringify({ type: 'response', message }), (error) => {
            if (error) {
                console.error('Error sending WebSocket message:', error);
                return res.status(500).json({ error: 'Failed to send WebSocket message' });
            }
            // Respond with success after WebSocket message is sent
            res.json({ status: 'Processed' });
        });
        
    } catch (error) {
        // Handle errors from the external API
        console.error('API request failed:', error);
        ws.send(JSON.stringify({ type: 'error', message: error.message }));
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
