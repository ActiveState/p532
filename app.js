let root = document.documentElement;

let bar = document.querySelector(".build-progress-section .bar");
let platformToggles = document.querySelectorAll(".platform-picker span");
let cliInputs = document.querySelectorAll(".cli-install input");
let cliCopyButtons = document.querySelectorAll(".cli-install .cli-copy-icon");
let defaultPlatform = 'Windows';
let cliCommands = {
  'Linux' : 'sh <(curl -q https://platform.activestate.com/dl/cli/install.sh)',
  'Windows' : 'powershell -- sh <(curl -q https://platform.activestate.com/dl/cli/install.sh)'
}

cliCopyButtons.forEach(el => {
  el.addEventListener("click", e => {
    copyToClipboard(el);
  });
});

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

platformToggles.forEach(el => {
  el.addEventListener("click", e => {
    switchPlatform(el.getAttribute("platform"));
  });
});

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


let buildThresholds = size => {
  let arr = [];
  for(var i = 0; i <= size; i++) {
    arr.push(i/size);
  }
  return arr;
}

let options = {
  rootMargin: "200px 0px -200px 0px",
  threshold: buildThresholds(20) // 20 steps
}

const updateItemsTwo = (entries, observer, elements, className, depTarget, callBack = false) => {

  let itemArray = elements;
  let itemCount = itemArray.length;

  for (let el of itemArray) {
    el.classList.remove(className);
  }

  for (let entry of entries) {
    let ratio = entry.intersectionRatio;
    let finishedItemCount = Math.ceil(ratio * itemCount);
    let completedItems = itemArray.slice(0, finishedItemCount);

    if(callBack) {
      callBack(ratio);
    }

    if(itemCount == finishedItemCount) {
      depTarget.classList.add("finished");
    } else {
      depTarget.classList.remove("finished");
    }

    for(let el of completedItems) {
      el.classList.add(className);
    }
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


// Generic intersection observer setup method
const createObserver = (sectionSelector, itemSelector, progressClass, callBack = false) => {

  let observerProgress = (entries, observer) => {
    updateItemsTwo(entries, observer, elements, progressClass, target, callBack);
  }

  let elements = itemSelector ? Array.from(document.querySelectorAll(itemSelector)) : [];
  let observer = new IntersectionObserver(observerProgress, options);
  let target = document.querySelector(sectionSelector);
  observer.observe(target);
}

let setBarWidth = (ratio) => {
    ratio = ratio > .95 ? 1 : ratio;
    bar.style.width = (ratio * 100) + "%";
}

let setPanelScale = (ratio) => {
    ratio = ratio > .95 ? .95 : ratio;
    root.style.setProperty('--virtual-progress', ratio);
}


// Sets up all the intersectioon observers
createObserver(".cli-section",".cli-section .line", "visible");
createObserver(".environments-section",".environments-section .computer", "activated");
createObserver(".history-section",".history-section .item", "visible");
createObserver(".virtual-env-section",false, false, setPanelScale);
createObserver(".dependencies-section",".dependencies-section .package:not(.first)", "resolved");
createObserver(".bundles-section",".bundles-section .bundle", "selected");
createObserver(".build-progress-section",".build-progress-section .item", "done", setBarWidth);

switchPlatform(getOS());

