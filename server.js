const express = require('express');
const multer = require('multer');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Initialize text-to-speech client
const client = new textToSpeech.TextToSpeechClient();

app.post('/api/convert-to-audio', upload.single('file'), async (req, res) => {
    try {
        const { voice, speed, pitch } = req.body;
        
        // Read the uploaded file
        const text = await fs.readFile(req.file.path, 'utf8');
        
        // Configure the synthesis request
        const request = {
            input: { text },
            voice: { languageCode: voice, ssmlGender: 'NEUTRAL' },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: parseFloat(speed),
                pitch: parseFloat(pitch)
            },
        };

        // Perform the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);
        
        // Send the audio content back to the client
        res.set('Content-Type', 'audio/mp3');
        res.send(response.audioContent);

        // Clean up the uploaded file
        await fs.unlink(req.file.path);
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error converting text to speech');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 