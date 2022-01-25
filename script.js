const imgContainer = document.querySelector(".images");

const createImage = function(imgPath) {
    return new Promise(function(resolve, reject) {
        const img = document.createElement("img");
        img.src = imgPath;
        imgContainer.append(img);
        img.addEventListener("load", function() {
            resolve(img);
        });
        img.addEventListener("error", function() {
            reject(new Error("Image not found"));
        });
    });
};

const waitFor = function(second) {
    return new Promise(function(resolve) {
        console.log("wait for 2 seconds");
        setTimeout(resolve, second * 1000);
    });
};

let currentImg;

createImage("images/img-1.jpg")
    .then((img) => {
        currentImg = img;
        console.log("Image 1 loaded");
        return waitFor(2);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage("images/img-2.jpg");
    })
    .then((img) => {
        currentImg = img;
        console.log("Image 2 loaded");
        return waitFor(2);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage("images/img-3.jpg");
    })
    .then((img) => {
        currentImg = img;
        console.log("Image 3 loaded");
        return waitFor(2);
    })
    .then(() => {
        currentImg.style.display = "none";
        console.log("START AGAIN");
    })
    .catch((err) => console.error(err));