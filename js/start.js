setupButtons(".cli-install .cli-copy-icon");
setupToggles();
setDefaultPlatform();

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if(isIE11) {
    let sections = document.querySelectorAll(".section");
    console.log(sections);
    for(var i = 0; i < sections.length; i++) {
        sections[i].classList.add("hide-image");
    }
}