var subtitleSize = 100;

function click(e) {
  console.log("out of range");
  if (subtitleSize <= 0) {
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
}

function runResizeScript() {
  chrome.tabs.executeScript(null, {
    code: 'var subtitleSize = ' + subtitleSize + ';'
  }, function () {
    chrome.tabs.executeScript(null, { file: 'resize_subtitle.js' });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var plusBtn = document.getElementById('plus');
  var minusBtn = document.getElementById('minus');
  var closeBtn = document.getElementById('close');
  plusBtn.addEventListener('click', click);
  minusBtn.addEventListener('click', click);
  closeBtn.addEventListener('click', function() {
    window.close();
  });
});
