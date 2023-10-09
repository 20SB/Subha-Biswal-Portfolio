document.addEventListener("DOMContentLoaded", function () {
    // Function to load content via AJAX
    var backButton = document.getElementById("back-button");
    var currentSection = "home"; // Initialize current section to 'home'
    var prevSection = null; // Initialize previous section to null

    // Define the loadScript function to load JavaScript files dynamically
    function loadScript(url) {
        var script = document.createElement("script");
        script.src = url;
        document.head.appendChild(script);
    }

    function loadContent(section) {
        if (section == "home") {
            backButton.classList.add("disp-none");
        } else {
            backButton.classList.remove("disp-none");
        }
        prevSection = currentSection; // Store the current section as the previous section
        currentSection = section; // Update the current section

        var xhr = new XMLHttpRequest();
        var contentUrl = "sections/" + section + ".html"; // Include the folder path
        var scriptUrl = "assets/js/" + section + ".js"; // Include the folder path
        xhr.open("GET", contentUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("main-content").innerHTML =
                    xhr.responseText;
                loadScript(scriptUrl); // Call the loadScript function to load the JavaScript file
            }
        };
        xhr.send();
    }

    // Handle clicks on navigation links
    var navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var section = e.target.getAttribute("href").substring(1);
            
            loadContent(section);
        });
    });

    // Load initial content
    loadContent("home");

    // Handle back button click
    if (backButton) {
        backButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (prevSection !== null) {
                loadContent(prevSection); // Load the previous section when the back button is clicked
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

    // Use the "scroll" event on the #main-content div
    let mainContent = document.getElementById("main-content");
    mainContent.addEventListener("scroll", scrollPercentage);

    // Call scrollPercentage on page load
    window.addEventListener("load", scrollPercentage);
});
