export { create, setBarWidth, setPanelScale };

let root = document.documentElement;


let buildThresholds = size => {
  let arr = [];
  for(var i = 0; i <= size; i++) {
    arr.push(i/size);
  }
  return arr;
}

let observerOptions = {
  rootMargin: "200px 0px -200px 0px",
  threshold: buildThresholds(20) // 20 steps
}

const updateItems = (entries, observer, elements, className, depTarget, callBack = false) => {

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


// Generic intersection observer setup method
const create = (parentSelector, itemSelector, progressClass, callBack = false) => {

  let observerProgress = (entries, observer) => {
    updateItems(entries, observer, elements, progressClass, target, callBack);
  }

  let elements = itemSelector ? Array.from(document.querySelectorAll(itemSelector)) : [];
  let observer = new IntersectionObserver(observerProgress, observerOptions);
  let target = document.querySelector(parentSelector);
  observer.observe(target);
}

let setBarWidth = (ratio) => {
    ratio = ratio > .95 ? 1 : ratio;
    root.style.setProperty('--bar-width', (ratio * 100) + "%");
}

let setPanelScale = (ratio) => {
    ratio = ratio > .95 ? .95 : ratio;
    root.style.setProperty('--virtual-progress', ratio);
}
