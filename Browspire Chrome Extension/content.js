//Import bootstrap icons

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';

document.head.appendChild(link);

var popup = document.createElement('div');
popup.id = "popup";
popup.style.display = "none";
popup.style.position = "absolute";
popup.style.color = "black";
popup.style.backgroundColor = "rgba(255,255,255,.9)";
popup.style.borderRadius = "25px";
popup.style.padding = "10px";
popup.style.zIndex = "1000";
popup.style.fontSize = "15px";
popup.style.fontFamily = "Arial";
popup.innerHTML="<i class='bi bi-check2-circle' style='margin: 0 5px;'></i> Add to Tasks"
popup.style.cursor = "pointer";
popup.style.boxShadow = "0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)";
document.body.appendChild(popup);

window.addEventListener('mousedown', function (e) {
  popup.style.display = "none";
});

function close_popup() {
  alert
  popup.style.display = "none";
}

popup.onmousedown = function () {
  var selected = popup.getAttribute("data-text");
  todo_data=chrome.storage.sync.get("todo_data",function(todo_data){
    todo_data['todo_data'].push({"text":selected,"checked":false,"href":window.location.href})
    chrome.storage.sync.set({ todo_data: todo_data['todo_data']})

    })
  popup.style.display = "none";
    
  var notification = document.createElement('div');
  notification.id = "notification";
  notification.style.display = "block";
  notification.style.position = "fixed";
  notification.style.left = "50%";
  notification.style.top = "50px";
  notification.style.color = "black";
  notification.style.backgroundColor = "rgba(255,255,255,.9)";
  notification.style.borderRadius = "25px";
  notification.style.padding = "10px 20px";
  notification.style.zIndex = "1000";
  notification.style.fontSize = "20px";
  notification.style.fontFamily = "Arial";
  notification.style.textAlign = "center";
  notification.style.transform = "translate(-50%,0)";
  notification.innerHTML="<i class='bi bi-check2' style='margin: 0 5px;'></i> Added to Tasks"
  document.body.appendChild(notification);
  setTimeout(function(){notification.style.display = "none";}, 2000);
}

document.addEventListener('selectionchange', () => {
  var selected = window.getSelection().toString();
  if (selected.length < 1) {
    popup.style.display = "none";
    return;
  }
  var range = window.getSelection().getRangeAt(0);
  var rect = range.getBoundingClientRect();

  popup.style.left = rect.left+rect.width/2 + "px";
  popup.style.top = rect.top-55+ "px";

  popup.style.display = "block";
  popup.setAttribute("data-text", selected);

});
