window.addEventListener("load", (_)=> {
    let name = document.querySelector(".name");
    let intro = document.querySelector(".intro-loader");

    setTimeout(() => {
        name.style.opacity = "1";
        name.style.transform = "translateY(0)";
    },300)

    setTimeout(() => {
        intro.style.top = "-100%";
    },2000)
})

// This script above handles the introductory animation on the home page, displaying a welcome message and then sliding it up to reveal the main content. 