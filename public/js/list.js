new ClipboardJS("#share");

document.getElementById("tooltip").onclick = () => {
  document.getElementById("tooltip").setAttribute("data-tip", "Copied link");
};

document.getElementById("tooltip").addEventListener("mouseout", () => {
  document
    .getElementById("tooltip")
    .setAttribute("data-tip", "Copy link to clipboard");
});
