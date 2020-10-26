export { setupButtons };

const setupButtons = selector => {
    let cliCopyButtons = document.querySelectorAll(selector);

    cliCopyButtons.forEach(el => {
        el.addEventListener("click", e => {
            copyToClipboard(el);
        });
    });
}

const copyToClipboard = button => {
  let inputId = button.getAttribute("for");
  let input = document.getElementById(inputId);

  input.focus();
  input.select();

  try {
    var successful = document.execCommand('copy')

    if (successful) {
      button.classList.remove("success");
      setTimeout(() => {
        button.classList.add("success");
      }, 1)
    }
  } catch (err) {
    console.log('Unable to copy: ', err)
  }
}
