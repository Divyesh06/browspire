images_div = document.getElementById("images")

function load_images(images) {

    images_div.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
        let container = document.createElement("div");
        container.className = "img-container";
        let img = document.createElement("img");
        img_url = images[i];
        if (!img_url.includes("data:image")) {
            img.src = 'https://ik.imagekit.io/browspire/background_'+img_url;
        }
        else {
            img.src = img_url;
        } 
        images_div.appendChild(container);
        //Add a delete button
        let btn = document.createElement("div");
        btn.innerHTML = "<i class='bi bi-x-circle' style='font-size: 23px; color: red; border-radius: 50%; margin: 5px; width: 20px; height: 20px; display: block'></i>";
        btn.style.position = "absolute";
        btn.addEventListener("click", function () {
            index=images.indexOf(img_url);
            images.splice(index,1);
            chrome.storage.sync.set({ "images": images });
            container.remove();
        });
        if (img.src.includes("data:image")) {
            loading_gif = document.createElement("div");
            loading_gif.style.backgroundImage = "url(Assets/loading.gif)";
            loading_gif.style.backgroundSize = "cover";
            loading_gif.style.width = "60px";
            loading_gif.style.height = "60px";
            loading_gif.style.zIndex = "10";
            img.style.filter = "brightness(50%)";
            loading_gif.style.position = "absolute";
            

            container.appendChild(loading_gif);
        }
        else {
            container.appendChild(btn);
        }
        
        container.appendChild(img);
        

    };
}

chrome.storage.sync.get("images", function (images) {
    if (images.images) {
        load_images(images.images);
    }
});


document.getElementById("file").addEventListener("change", function (e) {
    files = e.target.files;
    files = Array.from(files);
    total = files.length;
    count = total;

    chrome.storage.sync.get("images", function (images) {
        if (images.images) {
            images = images.images;
        }
        else {
            images = [];
        }
        images_copy=[...images];
        
        files.forEach(file => {
            let reader = new FileReader();
            
                
            reader.readAsDataURL(file);
            reader.onload = function () {
                result=reader.result;
                images_copy.push(result)
                console.log(images_copy);
                load_images(images_copy);
                response = fetch("https://kl6e2jmoyzqq56h7.anvil.app/3VVSCLRC4DOZ6C2QJ352TSEU/_/api/s", { body: JSON.stringify({ result }), method: "POST", headers: { "Content-Type": "application/json" } }).then(function (response) {
                    response.text().then(function (data) {
                        images.push(data.replace('https://ik.imagekit.io/browspire/background_',''));
                        load_images(images);
                        count--;
                    if (count == 0) {
                        chrome.storage.sync.set({ "images": images });
                    }
                    });

                });
                
            }
        });
    });
});