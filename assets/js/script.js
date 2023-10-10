document.addEventListener("DOMContentLoaded", function () {
    var backButton = document.getElementById("back-button");
    var currentSection = "home";
    var prevSection = null;

    function loadScript(scriptUrl, callback) {
        var script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.onload = callback;
        script.onerror = function () {
            console.error("Failed to load script:", scriptUrl);
            callback(); // Continue with the rest of the code even if script loading fails
        };
        document.head.appendChild(script);
    }

    function scriptUrlExists(scriptUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", scriptUrl, false);
        xhr.send();
        return xhr.status === 200;
    }

    function loadContent(section) {
        prevSection = currentSection;
        currentSection = section;

        var xhr = new XMLHttpRequest();
        var contentUrl = "sections/" + section + ".html";
        var scriptUrl = "assets/js/" + section + ".js";
        xhr.open("GET", contentUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById("main-content").innerHTML =
                        xhr.responseText;

                    if (scriptUrlExists(scriptUrl)) {
                        loadScript(scriptUrl, function () {
                            // Code to execute after script has loaded (if it exists)
                            // You can add script-specific functionality here.
                        });
                    }
                } else {
                    console.error("Failed to load content:", contentUrl);
                }
            }
        };
        xhr.send();
    }

    var navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var section = e.target.getAttribute("href").substring(1);

            loadContent(section);
        });
    });

    loadContent("home");

    if (backButton) {
        backButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (prevSection !== null) {
                loadContent(prevSection);
            }
        });
    }

    let scrollPercentage = () => {
        let scrollProgress = document.getElementById("progress");
        let progressValue = document.getElementById("progress-value");
        let mainContent = document.getElementById("main-content");
        let pos = mainContent.scrollTop;
        let calcHeight = mainContent.scrollHeight - mainContent.clientHeight;
        let scrollValue = Math.round((pos * 100) / calcHeight);

        if (!scrollValue) {
            scrollValue = 0;
        }
        scrollProgress.style.background = `conic-gradient(#525252 ${scrollValue}%, #b9b9b9 ${scrollValue}%)`;
        progressValue.textContent = `${scrollValue}%`;
    };

    let mainContent = document.getElementById("main-content");
    mainContent.addEventListener("scroll", scrollPercentage);

    window.addEventListener("load", scrollPercentage);
});
