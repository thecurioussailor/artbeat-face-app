const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Route to handle file upload
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  console.log(`File uploaded: ${filePath}`);
  
  res.json({
    message: 'File uploaded successfully',
    file: req.file
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
