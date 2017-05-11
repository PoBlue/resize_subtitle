var subtitleSize = 100;
var key = "subtitleSize";

function savaDataInChrome(){
  chrome.storage.local.set({ "subtitleSize": subtitleSize});
}

function getDataFromChrome(afterGetData){
  chrome.storage.local.get([key], function (result) {
    if (!isNaN(result[key])) {
      subtitleSize = result[key];
      afterGetData(subtitleSize);
    } else {}
  });
}

function click(e) {
  if (subtitleSize <= 10) {
    console.log("out of range");
    return;
  }

  switch (e.target.id) {
    case "plus":
      subtitleSize += 10;
      break;
    case "minus":
      subtitleSize -= 10;
      break;
    default:
      console.log("do nothing");
      break;
  }

  runResizeScript();
  savaDataInChrome();
}

function runResizeScript() {
  chrome.tabs.executeScript(null, {
    code: 'var subtitleSize = ' + subtitleSize + ';'
  }, function () {
    chrome.tabs.executeScript(null, { file: 'resize_subtitle.js' });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  getDataFromChrome(function(subtitleSize) {
    runResizeScript();
  });
  var plusBtn = document.getElementById('plus');
  var minusBtn = document.getElementById('minus');
  var closeBtn = document.getElementById('close');
  plusBtn.addEventListener('click', click);
  minusBtn.addEventListener('click', click);
  closeBtn.addEventListener('click', function() {
    window.close();
  });
});
