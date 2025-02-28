document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');

    fileUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            fileName.textContent = `Selected file: ${e.target.files[0].name}`;
            fileName.style.animation = 'fadeInUp 0.5s ease-out';
        }
    });

    // Add hover effect to upload box
    const uploadBox = document.querySelector('.upload-box');
    uploadBox.addEventListener('dragenter', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4a90e2';
        this.style.backgroundColor = '#f8f9fa';
    });

    uploadBox.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#dee2e6';
        this.style.backgroundColor = 'white';
    });

    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileUpload.files = files;
            fileName.textContent = `Selected file: ${files[0].name}`;
            fileName.style.animation = 'fadeInUp 0.5s ease-out';
        }
        this.style.borderColor = '#dee2e6';
        this.style.backgroundColor = 'white';
    });

    // Add new audio conversion functionality
    const convertBtn = document.getElementById('convert-btn');
    const audioPlayer = document.getElementById('audio-player');
    const audioOutput = document.getElementById('audio-output');
    const downloadBtn = document.getElementById('download-btn');
    const speedRange = document.getElementById('speed-range');
    const pitchRange = document.getElementById('pitch-range');
    const speedValue = document.getElementById('speed-value');
    const pitchValue = document.getElementById('pitch-value');
    const voiceSelect = document.getElementById('voice-select');

    // Update range value displays
    speedRange.addEventListener('input', function() {
        speedValue.textContent = `${this.value}x`;
    });

    pitchRange.addEventListener('input', function() {
        pitchValue.textContent = `${this.value}x`;
    });

    convertBtn.addEventListener('click', async function() {
        if (!fileUpload.files.length) {
            alert('Please select a file first!');
            return;
        }

        try {
            convertBtn.disabled = true;
            convertBtn.textContent = 'Converting...';

            const formData = new FormData();
            formData.append('file', fileUpload.files[0]);
            formData.append('voice', voiceSelect.value);
            formData.append('speed', speedRange.value);
            formData.append('pitch', pitchRange.value);

            // Replace with your actual backend API endpoint
            const response = await fetch('/api/convert-to-audio', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            audioOutput.src = audioUrl;
            audioPlayer.style.display = 'block';
            
            // Enable download functionality
            downloadBtn.addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = audioUrl;
                a.download = 'audiobook.mp3';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

        } catch (error) {
            alert('Error converting file: ' + error.message);
        } finally {
            convertBtn.disabled = false;
            convertBtn.textContent = 'Convert to Audio';
        }
    });
}); 