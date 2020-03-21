// //add event listener to upload CSV button
// var downloadForm = document.getElementById('download_form');
// var csvForm = document.getElementById('csv_form');
//
// downloadForm.addEventListener('submit', event => {
//   event.preventDefault();
//   downloadImages();
// })
// csvForm.addEventListener('submit', event => {
//   event.preventDefault();
//   uploadCSV();
// })
//
//
// function downloadImages(){
//   console.log("downloadImages");
// }
// function uploadCSV(){
//   var field = csvForm.elements[0];
//   console.log("uploadCSV");
// }
//
//
//
// //example
// var fileInput = document.getElementById("csv_input"),
//
// readFile = function () {
//   var reader = new FileReader();
//   reader.onload = function () {
//     document.getElementById('output').value = reader.result;
//   };
//   // start reading the file. When it is done, calls the onload event defined above.
//   reader.readAsBinaryString(fileInput.files[0]);
// };
//
// fileInput.addEventListener('change', readFile);

var fileInput = document.getElementById("csv"),
readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {
        document.getElementById('out').innerHTML = reader.result;
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
};
fileInput.addEventListener('change', readFile);


var downloadForm = document.getElementById('download_form');
downloadForm.addEventListener('submit', event => {
  event.preventDefault();
  var output = document.getElementById('out').value;
  downloadImages(output);
  // chrome.runtime.sendMessage({data: output}, function(response) {
  //   console.log(response.response);
  // });
  // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  //   console.log(response.farewell);
  // });
})

function downloadImages(data){
  //console.log(data);
  let rows = data.split("\n");
  //console.log(rows);
  for(let r = 0; r < rows.length; r++){
    //loop through the rows
    let row = rows[r];
    let cols = row.split(",");
    //console.log(cols);
    //download from cols[0] and rename to cols[1]
    chrome.runtime.sendMessage({data: cols}, function(response) {
      if(response.error){
        console.log(response.error);
      }else{
        console.log(response.success);
      }

    });
  }
}
