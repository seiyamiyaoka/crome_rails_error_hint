// var script = document.createElement("script");
// script.textContent = "testFunc();";
// document.body.appendChild(script);

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  document.body.style.backgroundColor = 'white'
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      // tabs[0].id,
        {
          // code: 'document.querySelector("p").innerText = "fsdf";'
          file: 'testFunc.js'
        }
    );
  });
 
  // var btn = document.createElement("BUTTON")
  // var t = document.createTextNode("CLICK ME");
  // btn.appendChild(t);
  // //Appending to DOM 
  // document.body.appendChild(btn);
};

// 色を戻す
let resetColor = document.getElementById('resetColor');
resetColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
}

