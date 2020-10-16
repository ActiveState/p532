let buildRatio = size => {
  let arr = [];
  for(var i = 0; i <= size; i++) {
    arr.push(i/size);
  }
  return arr;
}

let options = {
  rootMargin: "-200px",
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


