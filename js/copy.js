function setupButtons(selector) {

    let cliCopyButtons = document.querySelectorAll(selector);

    for(var i = 0; i < cliCopyButtons.length; i++) {
      let el = cliCopyButtons[i];

      if (el.addEventListener){
        el.addEventListener("click", function() {
            copyToClipboard(el);
        });
      } else if (el.attachEvent){
        el.attachEvent('onclick', function() {
            copyToClipboard(el);
        });
      }
    }
}

function copyToClipboard(button) {
  let inputId = button.getAttribute("for");
  let input = document.getElementById(inputId);

  input.focus();
  input.select();

  try {
    var successful = document.execCommand('copy')

    if (successful) {
      button.classList.remove("success");
      setTimeout(function() {
        button.classList.add("success");
      }, 1)
    }
  } catch (err) {
    console.log('Unable to copy: ', err)
  }
}
