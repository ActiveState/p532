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
  rootMargin: "-150px",
  threshold: buildRatio(20) // 20 steps
}

let bar = document.querySelector(".build-progress-section .bar");
let packageEls = document.querySelectorAll(".item");
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

const updateItems = (entries, observer, elements, className) => {
  console.log("we be updatin");

  let itemArray = Array.from(elements);
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

let bundleEls = document.querySelectorAll(".bundle");
let bundleProgressObserver = new IntersectionObserver(observeBundleProgress, options);
let bundleTarget = document.querySelector('.bundles-section');
bundleProgressObserver.observe(bundleTarget);


//History

let observeHistoryProgress = (entries, observer) => {
  updateItems(entries, observer, historyEls, "visible");
}

let historyEls = document.querySelectorAll(".history-section .item");
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
