// popup.js

document.addEventListener('DOMContentLoaded', function () {
    const targetLanguageSelect = document.getElementById('target-language');
    const startTranslationButton = document.getElementById('start-translation');
  
    // Load initial target language setting
    chrome.storage.local.get(['targetLanguage'], (result) => {
      if (result.targetLanguage) {
        targetLanguageSelect.value = result.targetLanguage;
      }
    });
  
    // Update target language on user selection
    targetLanguageSelect.addEventListener('change', function () {
      const selectedLanguage = targetLanguageSelect.value;
      chrome.storage.local.set({ targetLanguage: selectedLanguage }, () => {
        console.log('Target Language Updated:', selectedLanguage);
      });
    });
  
    // Start translation on button click
    startTranslationButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { command: 'startTranscription' }, function (response) {
          console.log('Translation started');
        });
      });
    });
  
    // ... Other logic for your user interface
  });
//oauth login
document.querySelector('#signout-btn').addEventListener('click', function(){
  chrome.runtime.sendMessage({message: 'logout' }, function (response){
    if(response === 'success') window.close();
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userProfile') {
    const userProfile = request.user;
    const userProfileDiv = document.getElementById('userProfile');
    userProfileDiv.innerHTML = `
      <img src="${userProfile.picture}" alt="Profile Picture">
      <p>Name: ${userProfile.name}</p>
      <p>Email: ${userProfile.email}</p>
    `;
  }
});



document.getElementById('openBtn').addEventListener('click', openNav);
document.getElementById('closeBtn').addEventListener('click', closeNav);

function openNav() {
  document.getElementById("mySidebar").style.width = "170px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

// dropdown
document.addEventListener("DOMContentLoaded", function() {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownContent = document.getElementById('dropdown-content');

  dropdownBtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.letter-n')) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    }
  });
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userProfile') {
    const userProfile = request.user;
    const userProfileDiv = document.getElementById('userProfile');
    userProfileDiv.innerHTML = `
      <p>Name: ${userProfile.name}</p>
      <p>Email: ${userProfile.email}</p>
    `;
  }
});

