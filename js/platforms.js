// export { setDefaultPlatform, setupToggles };

let platformToggles, 
    cliInputs,
    cliHeadings;

let toggleSelector = ".platform-picker span";
let inputSelector = ".cli-install input";
let cliHeadingSelector = ".cli-header .terminal-type";

let defaultPlatform = 'Windows';
let cliCommands = {
  "Windows" : 
      {
        "prompt" : "Command Prompt",
        "command" : "powershell -Command \"& $([scriptblock]::Create((New-Object Net.WebClient).DownloadString('https://platform.activestate.com/dl/cli/install.ps1'))) -activate-default ActiveState/Perl-5.32\"",
      },  
  "Linux" : 
      {
        "prompt" : "command line",
        "command" : "sh <(curl -q https://platform.activestate.com/dl/cli/install.sh) --activate-default ActiveState/Perl-5.32"
      }
  
}

function setupToggles() {

  cliInputs = document.querySelectorAll(inputSelector);
  cliHeadings = document.querySelectorAll(cliHeadingSelector);
  platformToggles = document.querySelectorAll(toggleSelector);

  for(var i = 0; i < platformToggles.length; i++) {
    let el = platformToggles[i];

    if (el.addEventListener){
      el.addEventListener("click", function() {
        switchPlatform(el.getAttribute("platform"));
      });
    } else if (el.attachEvent){
      el.attachEvent('onclick', function() {
        switchPlatform(el.getAttribute("platform"));
      });
    }
  }
  
}

function switchPlatform(platform) {

  platform = cliCommands[platform] ? platform : defaultPlatform;

  for(var i = 0; i < platformToggles.length; i++) {
    let el = platformToggles[i];
    let thisPlatform = el.getAttribute("platform");
    
    if(thisPlatform == platform) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  }

  for(var i = 0; i < cliInputs.length; i++) {
    let el = cliInputs[i];
    el.value = cliCommands[platform]["command"];
  }

  for(var i = 0; i < cliHeadings.length; i++) {
    let el = cliHeadings[i];
    
    el.innerText = cliCommands[platform]["prompt"];
  }
}

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

function setDefaultPlatform() {
  switchPlatform(getOS());
}
