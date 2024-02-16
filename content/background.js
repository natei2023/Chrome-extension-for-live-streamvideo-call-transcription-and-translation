// background.js

let translationTargetLanguage = 'en';
const googleTranslateApiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.transcript) {
    translateAndProcess(message.transcript);
  }
});

function translateAndProcess(transcript) {
  // Example: Translate using Google Translate API
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${googleTranslateApiKey}`;
  const sourceLanguage = 'auto'; // Auto-detect source language

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: transcript,
      target: translationTargetLanguage,
      source: sourceLanguage,
    }),
  })
    .then(response => response.json())
    .then(data => {
      const translatedText = data.data.translations[0].translatedText;
      console.log('Original Transcript:', transcript);
      console.log('Translated Transcript:', translatedText);

      // TODO: Implement further processing with the translated text
    })
    .catch(error => {
      console.error('Translation Error:', error);
    });
}


// Example: Listen for changes in user settings
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.targetLanguage) {
    translationTargetLanguage = changes.targetLanguage.newValue;
    console.log('Target Language Updated:', translationTargetLanguage);
  }
});

// Example: Set default translation target language
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ targetLanguage: 'en' }, () => {
    console.log('Default Target Language Set to English');
  });
});

// login
let user_signed_in = false;
const CLIENT_ID = encodeURIComponent('851044735878-l46f0pdff5m05gh607odkn4efuslvvrm.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://jeobegadeebjkfinlicfjgdjhanfbdnj.chromiumapp.org');
const STATE = encodeURIComponent('jfkls3n');
const SCOPE = encodeURIComponent('openid');
const PROMPT = encodeURIComponent('consent');


function create_oauth2_url(){
  let nonce = encodeURIComponent(Math.random.toString(36).substring(2, 15) + Math.random.toString(36).substring(2, 15));

  let url = 
  `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&state=${STATE}
&scope=${SCOPE}+openid+profile+email
&prompt=${PROMPT}
&nonce=${nonce}
  `;
  
  
  return url;
}



function is_user_signed_in(){
  return user_signed_in;
}

function fetchUserProfile(idToken) {
  const base64Url = idToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  console.log("Decoded Payload:", jsonPayload);

  const profile = JSON.parse(jsonPayload);
  
  // Check if 'name' and 'email' fields exist in the profile
  const name = profile.name || "";
  const email = profile.email || "";

  return { name, email };
}



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    if (is_user_signed_in()) {
      console.log("User is already signed in.");
    } else {
      chrome.identity.launchWebAuthFlow({
        url: create_oauth2_url(),
        interactive: true
      }, function(redirect_url) {
        console.log("Redirect URL:", redirect_url);
        if (redirect_url) {
          let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
          id_token = id_token.substring(0, id_token.indexOf('&'));
          console.log("ID Token:", id_token);

          // Extract user profile information
          const { name, email } = fetchUserProfile(id_token);

          if (name !== "" && email !== "") {
            console.log("Authentication successful.");
            
            // Send the user profile information to the popup script
            chrome.action.setPopup({ popup: './home.html' }, function(){
              user_signed_in = true;
              sendResponse({ message: 'success', user: { name, email } });
            });
          } else {
            console.log("Could not extract user information from the ID token.");
          }
        } else {
          console.log("Authentication process did not return a valid redirect URL.");
        }
      });
      
      return true;
    }
  } else if (request.message === 'logout') {
    chrome.action.setPopup({ popup: './signin_popup.html' }, function(){
      user_signed_in = false;
      sendResponse('success');
    });
    return true;
  } else if (request.message === 'isUserSignedIn') {
    sendResponse(is_user_signed_in);
  }
});





// Login system 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'authenticateUser') {
    const email = request.email;
    const password = request.password;

    fetch('https://accounts.google.com/o/oauth2/v2/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      sendResponse(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      sendResponse({ success: false, message: 'An error occurred during authentication' });
    });

    return true; // Indicate that we will send a response asynchronously
  }
  else if (request.action === 'registerUser') {
    const email = request.email;
    const password = request.password;

    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      sendResponse(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      sendResponse({ success: false, message: 'An error occurred during registration' });
    });

    return true; // Indicate that we will send a response asynchronously
  }
});

