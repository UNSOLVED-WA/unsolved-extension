const hideButton = document.getElementById('unsolved-hide');
const updateButton = document.getElementById('unsolved-update');

hideButton.addEventListener('click', handleHideButton);
updateButton.addEventListener('click', handleUpdateButton);

function handleHideButton() {
  chrome.runtime.sendMessage({ message: 'userStatus' }, (response) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'hideButton' });
    });
  });
}

function handleUpdateButton() {
  chrome.runtime.sendMessage({ message: 'userStatus' }, (response) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'rerender' });
    });
  });
}
