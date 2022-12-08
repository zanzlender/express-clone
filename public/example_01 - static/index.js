(() => {
  const btn = document.getElementById("jsBtnTest");
  const btnContainer = document.getElementById("jsContainerTest");

  btn.addEventListener("click", () => {
    ChangeColorOnClick();
  });

  function ChangeColorOnClick() {
    btnContainer.style.backgroundColor = "rgb(21, 102, 223)";

    let newText = document.createElement("p");
    newText.textContent = "JavaScript loaded successfully!";
    btnContainer.append(newText);
  }
})();
