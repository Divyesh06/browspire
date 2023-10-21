//Implement data in chrome.storage if first time
chrome.storage.sync.get("first_time", async function (first_time) {
  if (first_time.first_time != false) {
    chrome.storage.sync.set({ todo_data: [
      {
        text: "Add your first task",
        checked: false,
        href: null
      }
    ] });
    load_todo();
    images=['akEETP3ok.jpg', '1vUgQYbYb.jpg', '7DhxGMVJE.jpg', '7N0rGe1C9h.jpg', 'KUgTjNyQO.jpg', 'Gc8jdjBJA.jpg', 'PTgo9MCT5.jpg', 'vubPE3_Bo.jpg', 'h0N3RLf2w.jpg', '5CDkh2yOr.jpg', '4G2DyOzsC.jpg', 'feVkTAG8m.jpg', 'sHKz4zl4I.jpg', 'EOWvpMddA.jpg', 'clXDyHSdg.jpg', 'J4zsNrNIT.jpg', 'QxcPxRLn1.jpg']
    chrome.storage.sync.set({ images: images});
    load_images(images);
    chrome.storage.sync.set({ spotify_link: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=938c791d26c34193" });
    chrome.storage.sync.set({ first_time: false });
  
  }
  init();
});

function init() {
row = 1;
column=1;
current_scroll = 0;
block_scroll = false;
links = document.getElementsByClassName("links")[0];
total_capacity=0;
search = document.getElementById("search");
search_container = document.getElementsByClassName("search-container")[0];
clock = document.getElementById("time")
spotify_embed = document.getElementsByClassName("spotify-embed")[0];
todo_data = [];
x=0.1
spotify_input = document.getElementById("spotify-url");
weather = document.getElementById("weather");
arrow_left=document.getElementsByClassName("arrow-left")[0];
arrow_right=document.getElementsByClassName("arrow-right")[0];

arrow_left.style.marginTop=`${(links.offsetHeight)/2+17}px`
arrow_right.style.marginTop=`${(links.offsetHeight)/2+17}px`
arrow_left.style.left=`${links.offsetLeft}px`
arrow_right.style.right=`${links.offsetLeft}px`
arrow_left.style.display="block"
arrow_right.style.display="block"

chrome.storage.sync.get("spotify_link", function (spotify_link) {
  spotify_input.value = spotify_link.spotify_link;
  spotify_embed.src=spotify_input.value.replace("https://open.spotify.com","https://open.spotify.com/embed")+`&theme=0`
});

spotify_input.addEventListener("change", function () {
  chrome.storage.sync.set({ spotify_link: spotify_input.value });
  spotify_embed.src=spotify_input.value.replace("https://open.spotify.com","https://open.spotify.com/embed")+`&theme=0`
});



links.addEventListener("wheel", scroll, { passive: false });
search.addEventListener("keydown", open_google);

chrome.storage.sync.get("images", function (images) {
images=images.images
random_background = Math.floor(Math.random() * images.length)
document.body.style.backgroundImage = `url(https://ik.imagekit.io/browspire/background_${images[random_background]})`
})

function convertFormat(time) {
  let format = "PM";
  if (time <= 12) {
    format = "AM";
  }
  return format;
}

function checkTime(time) {
  if (time > 12) {
    time = time - 12;
  }
  if (time === 0) {
    time = 12;
  }
  return time;
}

function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

function showTime() {
  let date = new Date();
  let hours = date.getHours(); //0-23
  let minutes = date.getMinutes(); //0 - 59

  let formatHours = convertFormat(hours);

  hours = checkTime(hours);

  hours = addZero(hours);
  minutes = addZero(minutes);

  clock.innerHTML = `${hours} : ${minutes}  ${formatHours}`;
}

showTime();

date_div= document.getElementById("date");

function showDate() {
  //Date div innerhtml should be like this format: 1 January, 2021

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let day_name=date.getDay();
  let day_names=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  day_name=day_names[day_name]

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];

  date_div.innerHTML = `<div style="font-size: 19px; font-weight: 700;">${day_name}</div>${day} ${months[month]}, ${year}`;
   
}

showDate();

setInterval(showTime, 1000);
setInterval(showDate, 1000);

//Show Weather

function get_ip(callback) {
  fetch("https://api.ipify.org?format=json").then(function (response) {
    response.json().then(function (data) {
      callback(data.ip);
    });
  });
}

weather_api_key="e46451d9cd2d41df95c112245230710"
weather_api_url=`https://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=`

function show_weather(ip) {
  fetch(weather_api_url+ip).then(function (response) {
    response.json().then(function (data) {
      icon=document.createElement("img");
      icon.style.width="25px";
      icon.style.height="25px";
      icon.style.marginRight="12px";
      icon.src='https:'+data.current.condition.icon;
      weather.innerHTML="";
      weather.appendChild(icon);
      weather.innerHTML+= `<span style="position:relative;top:-5px">${data.current.condition.text} &nbsp;${data.current.temp_c}&#176C</span>`;
      //Store in chrome.storage
      chrome.storage.local.set({ weather: weather.innerHTML });
    });
  });
}

chrome.storage.local.get("weather", function (data) {
  if (data.weather) {
    weather.innerHTML=data.weather;
  }
  get_ip(show_weather);
  
});



function open_google(event) {
  if (event.keyCode === 13) {
    window.open(`https://www.google.com/search?q=${search.value}`);
  }
};


function scroll(event) {
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    event.deltaY = event.deltaX
  }

  event.preventDefault();
  if (block_scroll) {
    return;
  }

  else {
    block_scroll = true;
    setTimeout(function () {
      block_scroll = false;
    }, 100)
    if (event.deltaY < -10) {
      scroll_left();
    } else if (event.deltaY > 10) {
      scroll_right();
    }
  }
}

function scroll_left() {
  current_scroll -= Math.floor(total_capacity/2);

  if (current_scroll < 0) {
    current_scroll = 0;
  }

  links.children[current_scroll].scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });
}

arrow_left.addEventListener("click", scroll_left)

function scroll_right() {
  current_scroll += Math.floor(total_capacity/2);

  if (current_scroll > links.children.length - 1) {
    current_scroll = links.children.length - 1;
  }
  
  links.children[current_scroll].scrollIntoView({
    behavior: "smooth",
    inline: "start",
  });
}

arrow_right.addEventListener("click", scroll_right);

if (localStorage.getItem("date") != new Date().getDate()) {
  fetch(`https://zenquotes.io/api/today/key`)
    .then((response) => response.json())
    .then((data) => {
      quote = data[0].q;
      document.getElementsByClassName("quote_text")[0].innerHTML = quote;
      localStorage.setItem("quote", quote);
      localStorage.setItem("date", new Date().getDate());
    });
} else {
  document.getElementsByClassName("quote_text")[0].innerHTML =
    localStorage.getItem("quote");
}

async function getAllBookmarks(bookmarkTreeNode) {
  if (!bookmarkTreeNode.children) {
    return [bookmarkTreeNode];
  }

  const bookmarkPromises = bookmarkTreeNode.children.map(async (childNode) => {
    if (childNode.url) {
      return childNode;
    } else {
      return getAllBookmarks(childNode);
    }
  });

  const bookmarkNodes = await Promise.all(bookmarkPromises);
  return bookmarkNodes.flat();
}


function generate_bookmarks(bookmarks) {
  document.getElementsByClassName("links")[0].innerHTML = "";
  row = 1;
  mode=1
  column=1;
  total_columns=bookmarks.length
  total_capacity=Math.floor(links.offsetWidth/90)
  current_scroll=0
  if(total_columns<=total_capacity*2){
    mode=2
    arrow_left.style.display="none"
    arrow_right.style.display="none"
  }
  else {
    arrow_left.style.display="block"
    arrow_right.style.display="block"
  }
  links.style.width=`${Math.floor(total_capacity)*90}px`

  search_container.style.width=links.style.width
  bookmarks.forEach((bookmark) => {
    links.innerHTML += `
<a href="${bookmark.url}" style="grid-row: ${row};"target="_blank">
  <img class="card" src="https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64"/>
  <br />
  <div style="color:white">${bookmark.title}</div>
</a>`;
    if (mode==1){
    if (row==1) {
      row=2;
    }
    else {
      row=1;
    }
  }
  else {
    if (column>=total_capacity) {
      column=1;
      row+=1;
    }
    else {
      column+=1;
    }
  }
  });
}


chrome.bookmarks.getTree(async (bookmarkTreeNodes) => {
  const allBookmarks = await getAllBookmarks(bookmarkTreeNodes[0]);
  allBookmarks.sort(function (a, b) {
    if (a.dateAdded > b.dateAdded) {
      return -1;
    } else if (a.dateAdded < b.dateAdded) {
      return 1;
    } else {
      return 0;
    }
  });


  search.oninput = function () {
    if (search.value.trim() == "") {
      generate_bookmarks(allBookmarks);
    }

    else
      chrome.bookmarks.search(search.value, function (results) {
        generate_bookmarks(results);
      });
  };
  generate_bookmarks(allBookmarks);
});

settings_container = document.getElementById("settings-container");
function remove_settings() {
  document.getElementById("settings-container").style.top = "-100%";
  settings_btn.style.display = "block";
}
settings_container.getElementsByTagName("i")[0].addEventListener("click", remove_settings);

settings_btn=document.getElementsByClassName("settings")[0];

settings_btn.addEventListener("click", function () {
  settings_container.style.top = "50%";
  settings_btn.style.display = "none";
});
}
