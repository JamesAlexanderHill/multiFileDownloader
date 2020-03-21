

// chrome.runtime.onMessage.addListener(
//   function(args, sender, sendResponse) {
//     downloadImages(args.data);
//     sendResponse({response: "done"});
//   }
// );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let options = {
    url: request.data[0],
    filename: request.data[1]
  };
  chrome.downloads.download(options, function(downloadId) {
    if(downloadId == null){
      sendResponse({error: "URL is not valid: " + request.data[0]});
    }else{
      sendResponse({success: true});
    }
  });
  return true; // keeps the message channel open until `sendResponse` is executed
});
