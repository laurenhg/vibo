const fetch = require('node-fetch');

// Define the endpoint URL
const url = 'https://api.datavortex.nl/vibo/users';

// Define the request headers
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'vibo:xz3hJ3IPuNIbPbg4lgce'
};

// Define the user data
const userData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword',
    info: 'Optional user info',
    authorities: [{ authority: 'USER' }]
};

// Make a POST request to create a new user
fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userData)
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        return response.json();
    })
    .then(data => {
        console.log('User created successfully:', data);
    })
    .catch(error => {
        console.error('Error creating user:', error.message);
    });
