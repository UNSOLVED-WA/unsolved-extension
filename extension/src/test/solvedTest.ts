if (window.location.pathname.includes("/submit")) {
  const button = document.querySelector("#submit_button");
  if (button) {
    button.addEventListener("click", () => {
      const problemNumber = window.location.href.split("/").pop();
      chrome.storage.local.set({ submit: problemNumber });
    });
  }
}

if (window.location.pathname.includes("/status")) {
  chrome.runtime.sendMessage(
    { message: "submit", type: "async" },
    (response) => {
      console.log(response);
    }
  );
}
