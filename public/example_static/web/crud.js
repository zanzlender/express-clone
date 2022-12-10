(() => {
  const sendBtn = document.getElementById("getUsersBtn");
  const usersContainer = document.getElementById("jsContainerTest");

  sendBtn.addEventListener("click", async () => {
    const url = document.getElementById("requestUrlInput").value;
    const method = document.getElementById("methodSelect").value;

    const response = await fetch(url, {
      method: method,
    });

    try {
      const body = await response.json();

      usersContainer.childNodes.forEach((x) => {
        usersContainer.removeChild(x);
      });

      if (Array.isArray(body)) {
        body.forEach((x) => {
          const newEl = document.createElement("p");
          const textToDisplay = `Name: ${x?.name}\nEmail: ${x?.email}`;

          newEl.textContent = textToDisplay;
          usersContainer.appendChild(newEl);
        });
      } else {
        const newEl = document.createElement("p");
        const textToDisplay = `Name: ${body?.name}\nEmail: ${body?.email}`;

        newEl.textContent = textToDisplay;
        usersContainer.appendChild(newEl);
      }
    } catch (error) {
      const newEl = document.createElement("p");
      newEl.textContent = "Error while fetching data.";

      usersContainer.appendChild(newEl);
    }
  });
})();
