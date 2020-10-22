let root = document.documentElement;

window.addEventListener("scroll", e => {
  let deg = window.scrollY / 8;
  root.style.setProperty('--angle', deg + "deg");
  root.style.setProperty('--reverse-angle', -deg + "deg");
});


let buildRatio = size => {
  let arr = [];
  for(var i = 0; i <= size; i++) {
    arr.push(i/size);
  }
  return arr;
}

let options = {
  rootMargin: "200px 0px -200px 0px",
  threshold: buildRatio(20) // 20 steps
}

let bar = document.querySelector(".build-progress-section .bar");
let packageEls = Array.from(document.querySelectorAll(".item"));
let itemCount = packageEls.length;
let startAt = 0;


let observePackageProgress = (entries, observer) => {

  updateItems(entries, observer, packageEls, "done");

  for (let entry of entries) {
    let ratio = (startAt > 0) ? (entry.intersectionRatio - startAt) / startAt : entry.intersectionRatio;
    ratio = (ratio < 0) ? 0 : ratio;
    bar.style.width = (ratio * 100) + "%";
  }
};

let packageProgressObserver = new IntersectionObserver(observePackageProgress, options);
let target = document.querySelector('.build-progress-section');

packageProgressObserver.observe(target);


// Bundle Observer
let observeBundleProgress = (entries, observer) => {
  updateItems(entries, observer, bundleEls, "selected");
}

let bundleEls = Array.from(document.querySelectorAll(".bundle"));
let bundleProgressObserver = new IntersectionObserver(observeBundleProgress, options);
let bundleTarget = document.querySelector('.bundles-section');
bundleProgressObserver.observe(bundleTarget);


//History

let observeHistoryProgress = (entries, observer) => {
  updateItems(entries, observer, historyEls, "visible");
}

let historyEls = Array.from(document.querySelectorAll(".history-section .item"));
let historyProgressObserver = new IntersectionObserver(observeHistoryProgress, options);
let historyTarget = document.querySelector('.history-section');
historyProgressObserver.observe(historyTarget);



//Virtual Envs

let observeVirtualProgess = (entries, observer) => {
  for (let entry of entries) {
    let ratio = entry.intersectionRatio > .95 ? .95 : entry.intersectionRatio;
    root.style.setProperty('--virtual-progress', ratio);
  }
}

let virtualObserver = new IntersectionObserver(observeVirtualProgess, options);
let virtualTarget = document.querySelector('.spinner-wrapper');
virtualObserver.observe(virtualTarget);


//Dependencies

let observeDependencyProgress = (entries, observer) => {
  updateItemsTwo(entries, observer, depEls, "resolved", depTarget);
}

let depEls = Array.from(document.querySelectorAll(".dependencies-section .package:not(.first)"));
let depObserver = new IntersectionObserver(observeDependencyProgress, options);
let depTarget = document.querySelector('.dependencies-section');
depObserver.observe(depTarget);


//Environments

let observeEnvironmentsProgress = (entries, observer) => {
  updateItemsTwo(entries, observer, envEls, "activated", envTarget);
}

let envEls = Array.from(document.querySelectorAll(".environments-section .computer"));
let envObserver = new IntersectionObserver(observeEnvironmentsProgress, options);
let envTarget = document.querySelector('.environments-section');
envObserver.observe(envTarget);


const updateItemsTwo = (entries, observer, elements, className, depTarget) => {

  let itemArray = elements;
  let itemCount = itemArray.length;

  for (let el of itemArray) {
    el.classList.remove(className);
  }

  for (let entry of entries) {
    let ratio = entry.intersectionRatio;
    let finishedItemCount = Math.ceil(ratio * itemCount);
    let completedItems = itemArray.slice(0, finishedItemCount);

    if(itemCount == finishedItemCount) {
      depTarget.classList.add("finished");
    } else {
      depTarget.classList.remove("finished");
    }

    for(let el of completedItems) {
      el.classList.add(className);
    }

    if(ratio == 1) {
      // observer.disconnect();
    }
  }
}

const updateItems = (entries, observer, elements, className) => {

  let itemArray = elements;
  let itemCount = itemArray.length;

  for (let el of itemArray) {
    el.classList.remove(className);
  }

  for (let entry of entries) {

    let ratio = (startAt > 0) ? (entry.intersectionRatio - startAt) / startAt : entry.intersectionRatio;
    ratio = (ratio < 0) ? 0 : ratio;

    let finishedItemCount = Math.ceil(ratio * itemCount);
    let completedItems = itemArray.slice(0, finishedItemCount);

    for(let el of completedItems) {
      el.classList.add(className);
    }

    if(ratio == 1) {
      // observer.disconnect();
    }
  }
}