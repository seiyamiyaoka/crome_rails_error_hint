chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: 'black'}, function() {
    console.log("The color is greenffffff.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "localhost"},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});