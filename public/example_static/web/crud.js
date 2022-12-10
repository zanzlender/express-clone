(() => {
  const sendBtn = document.getElementById("getUsersBtn");
  const btnContainer = document.getElementById("jsContainerTest");

  sendBtn.addEventListener("click", async () => {
    const url = document.getElementById("requestUrlInput").value;
    const method = document.getElementById("methodSelect").value;

    const response = await fetch(url, {
      method: method,
    });

    try {
      const newEl = document.createElement("p");
      newEl.textContent = response;
    } catch (error) {
      const newEl = document.createElement("p");
      newEl.textContent = "Error while fetching data.";

      btnContainer.appendChild(newEl);
    }
  });
})();
