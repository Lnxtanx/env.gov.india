const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve static files from specific directories
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes for each page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/environmental', (req, res) => {
    res.sendFile(path.join(__dirname, 'environmental.html'));
});

app.get('/economic', (req, res) => {
    res.sendFile(path.join(__dirname, 'economic.html'));
});

app.get('/social', (req, res) => {
    res.sendFile(path.join(__dirname, 'social.html'));
});

app.get('/sdg', (req, res) => {
    res.sendFile(path.join(__dirname, 'sdg.html'));
});

app.get('/technology', (req, res) => {
    res.sendFile(path.join(__dirname, 'technology.html'));
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! Please try again later.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
}); 