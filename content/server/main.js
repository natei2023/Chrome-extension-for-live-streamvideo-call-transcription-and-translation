 document.addEventListener('DOMContentLoaded', function () {
     document.getElementById('registerButton').addEventListener('click', register);
     document.getElementById('loginButton').addEventListener('click', login);
     document.getElementById('logoutButton').addEventListener('click', logout);
     document.getElementById('checkSubscriptionButton').addEventListener('click', checkSubscription);
     document.getElementById('googleLoginButton').addEventListener('click', googleSignIn);
 });

 function googleSignIn(googleUser) {
     const profile = googleUser.getBasicProfile();
     const idToken = googleUser.getAuthResponse().id_token;

     // Send idToken to the server for validation and user authentication
     // Perform necessary server-side actions (e.g., create a new account if not exists, log in the user)

     alert('Google login successful!\nUser ID: ' + profile.getId() + '\nUser Name: ' + profile.getName());
     document.getElementById('logoutButton').style.display = 'inline-block';
     document.getElementById('checkSubscriptionButton').style.display = 'inline-block';
 }

 function googleSignIn() {
     gapi.auth2.getAuthInstance().signIn().then(onSignIn);
 }
 
 async function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            document.getElementById('registerError').textContent = data.error;
        }
    } catch (error) {
        console.error('Registration error:', error);
        document.getElementById('registerError').textContent = 'Internal Server Error';
    }
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            document.getElementById('logoutButton').style.display = 'inline-block';
            document.getElementById('checkSubscriptionButton').style.display = 'inline-block';
        } else {
            document.getElementById('loginError').textContent = data.message;
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').textContent = 'Internal Server Error';
    }
}

async function logout() {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            alert('Logout successful');
            document.getElementById('logoutButton').style.display = 'none';
            document.getElementById('checkSubscriptionButton').style.display = 'none';
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Error during logout');
    }
}

async function checkSubscription() {
    try {
        const response = await fetch('http://localhost:3000/check-subscription/1', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('subscriptionStatus').textContent = `Subscription Status: ${data.isSubscribed ? 'Subscribed' : 'Not Subscribed'}`;
        } else {
            alert('Error checking subscription status');
        }
    } catch (error) {
        console.error('Check Subscription error:', error);
        alert('Error checking subscription status');
    }
}