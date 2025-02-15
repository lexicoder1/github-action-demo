const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());



let users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" }
];

// Get the IP address of the machine
app.get('/public-ip', async (req, res) => {
    try {
        // Using ipify API to get the public IP address
        const response = await axios.get('https://api.ipify.org?format=json');
        res.json({ publicIp: response.data.ip });
    } catch (error) {
        res.status(500).send('Error fetching public IP');
    }
});


// In-memory data storage (dummy users)


// Route to fetch all users
app.get('/users', (req, res) => {
    res.status(200).json(users); // Return all users from the array
});

// Route to fetch a single user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

// Route to add a new user (for testing purposes)
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: users.length + 1, // Auto-increment ID for new users
        name,
        email
    };

    users.push(newUser); // Store the new user in the array
    res.status(201).json(newUser);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
