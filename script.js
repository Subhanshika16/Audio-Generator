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
}); 