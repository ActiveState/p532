export { setDefaultPlatform, setupToggles };

let platformToggles, 
    cliInputs;

let toggleSelector = ".platform-picker span";
let inputSelector = ".cli-install input";



let defaultPlatform = 'Windows';
let cliCommands = {
  'Windows' : "powershell -Command \"& $([scriptblock]::Create((New-Object Net.WebClient).DownloadString('https://platform.activestate.com/dl/cli/install.ps1'))) -activate-default ActiveState/Perl-5.32\" ",
  'Linux' : 'sh <(curl -q https://platform.activestate.com/dl/cli/install.sh) --activate-default ActiveState/Perl-5.32'
}

const setupToggles = () => {

  cliInputs = document.querySelectorAll(inputSelector);
  platformToggles = document.querySelectorAll(toggleSelector);

  platformToggles.forEach(el => {
    el.addEventListener("click", e => {
      switchPlatform(el.getAttribute("platform"));
    });
  });
}

const switchPlatform = platform => {

  platform = cliCommands[platform] ? platform : defaultPlatform;

  platformToggles.forEach(el => {
    let thisPlatform = el.getAttribute("platform");
    
    if(thisPlatform == platform) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  });

  cliInputs.forEach(el => {
    el.value = cliCommands[platform];
  })
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

const setDefaultPlatform = () =>{
  switchPlatform(getOS());
}
