addBtn = document.getElementsByClassName("addBtn")[0];
list = document.querySelector("ul");
x = 0.5

addBtn.addEventListener("click", newElement);


function newElement() {
  current = get_data()
  current.push({ "text": "New Task", "checked": false, "href": null })
  chrome.storage.sync.set({ todo_data: current });
  load_todo();
  setTimeout(function () {
    var checked_todos = document.getElementsByClassName("checked");
    last_unchecked = document.getElementsByTagName("li")[document.getElementsByTagName("li").length - checked_todos.length - 1]
    last_unchecked.getElementsByTagName("p")[0].focus()

  }, 10);
}

function get_data() {
  var all_li = document.getElementsByTagName("li");
  var all_data = [];
  for (i = 0; i < all_li.length; i++) {
    var li = all_li[i];
    var data = {};
    spans = li.getElementsByTagName("p")[0].getElementsByTagName('span')
    data["text"] = spans[0].innerText;
    data["checked"] = li.classList.contains("checked");
    if (spans.length == 2) {
      data["href"] = spans[1].getAttribute("data")
    }
    else {
      data["href"] = null
    }
    all_data.push(data);
  }
  return all_data
}

function update_data() {
  chrome.storage.sync.set({ todo_data: get_data() });
}

function load_todo() {
  todo_data = chrome.storage.sync.get("todo_data", function (todo_data) {
    document.getElementById("myUL").innerHTML = "";
    todo_data["todo_data"].sort(function (a, b) {
      if (a["checked"] && !b["checked"]) {
        return 1;
      } else if (!a["checked"] && b["checked"]) {
        return -1;
      } else {
        return 0;
      }
    });

    if (todo_data["todo_data"] != undefined) {
      todo_data["todo_data"].forEach((element) => {
        var li = document.createElement("li");
        var inputValue = element["text"];
        var icon = document.createElement("i");
        var p = document.createElement("p");
        icon_class = element["checked"] ? "bi bi-check2" : "bi bi-app";
        icon.className = icon_class;
        icon.style.float = "left";
        icon.addEventListener("click", function () {
          li.classList.toggle("checked");

          if (li.classList.contains("checked")) {
            //confetti with origin
            confetti({ origin: { x: x, y: 1 } })
          }

          update_data();
          load_todo();

        });
        icon.style.margin = "4px 10px";
        if (element["href"]) {
          p.innerHTML = '<span style="margin-right: 10px;outline:none">' + inputValue + '</span>' + `<span contenteditable="false" data="${element['href']}" style="background: rgba(255,255,255,0.75); border-radius: 25px; padding: 3px 8px; font-size: 12px; color: black; cursor: pointer; white-space: nowrap;"><i style="margin-right: 5px" class="bi bi-link-45deg"></i>Open Link</span>`
          span0 = p.getElementsByTagName("span")[0]
          span = p.getElementsByTagName("span")[1]
          span.addEventListener("click", function () {
            window.open(element["href"])
          })
          span0.contentEditable = true;
        } else {
          p.innerHTML = '<span>' + inputValue + '</span>';
          p.contentEditable = true;

        }
        p.style.margin = "0px";
        li.appendChild(icon);
        li.appendChild(p);
        document.getElementById("myUL").appendChild(li);
        var close = document.createElement("i");
        close.style.float = "right";
        var txt = document.createTextNode("\u00D7");
        close.className = "bi bi-x";
        close.margin = "10px";
        close.style.fontSize = "23px";
        li.appendChild(close);
        p.oninput = function () {
          if (p.innerText.trim() == "") {
            p.innerText = " ";
          }
          update_data();
        };
        if (element["checked"]) {
          li.classList.add("checked");
        }
        close.onclick = function () {
          var div = this.parentElement;
          div.remove();
          update_data();
        }
      });
    }
  });
}

load_todo();