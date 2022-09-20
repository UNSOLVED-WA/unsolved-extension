(async () => {
  const src = chrome.runtime.getURL('contentScripts/module/main.js');
  const contentScript = await import(src);

  const stream = contentScript.main();

  stream.render();

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'hideButton') {
      stream.handleDisplay(true);
    } else if (request.message === 'rerender') {
      stream.render();
    }
  });
})();
