document.getElementById('signout-btn').addEventListener('click', signOut);

function signOut() {
    chrome.runtime.sendMessage({ action: 'signOut' }, function(response) {
        console.log(response.message);
    });
}