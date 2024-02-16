// content.js

// Check if the SpeechRecognition API is available
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript;
      }
    }

    chrome.runtime.sendMessage({ transcript: transcript });
  };

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'startTranscription') {
      recognition.start();
    } else if (message.command === 'stopTranscription') {
      recognition.stop();
    }
  });
} else {
  console.error('SpeechRecognition API not supported');
}


// Login System
