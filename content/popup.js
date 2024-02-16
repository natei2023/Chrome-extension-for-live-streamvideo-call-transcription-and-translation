  // ... Google Oauth set up
  document.querySelector('#login').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'login' }, function(response) {
        if (response.message === 'success') {
            // Redirect to home.html
            window.location.href = 'home.html';
        }
    });
});

  
  document.querySelector('button').addEventListener('click', function(){
    chrome.runtime.sendMessage({message: 'isUserSignedIn' }, function (response){
    });
  });


// Login and Register System
/*const API_URL = 'http://localhost:3000'; // Change this to your backend URL

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('register-btn').addEventListener('click', register);
    document.getElementById('signout-btn').addEventListener('click', signOut);
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('login-Form').style.display = 'none';
        document.getElementById('register-Form').style.display = 'none';
        document.getElementById('signout-btn').style.display = 'block';
    }
});

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token); // Store token in localStorage
            console.log('Login successful');
            // Redirect or show logged-in content
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred';
    }
}

async function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Registration successful');
            // Redirect or show registration success message
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred';
    }
}
function signOut() {
  localStorage.removeItem('token');
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('signout-btn').style.display = 'none';
  console.log('Signed out');
}

// Listen for sign-out message from other pages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'signOut') {
      signOut();
      sendResponse({ message: 'Sign-out action received' });
  }
});*/
  