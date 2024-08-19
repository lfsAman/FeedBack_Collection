const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://aiman:22124004@cluster0.8sflpxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Import Feedback model
const Feedback = require(path.join(__dirname, 'models', 'Feedback'));

// POST route for form submission
app.post('/submit-feedback', (req, res) => {
    const { name, contactNumber, email, message } = req.body;

    const newFeedback = new Feedback({
        name,
        contactNumber,
        email,
        message
    });

    newFeedback.save()
        .then(() => res.send('Feedback submitted successfully'))
        .catch(err => res.status(500).send('Error submitting feedback'));
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
