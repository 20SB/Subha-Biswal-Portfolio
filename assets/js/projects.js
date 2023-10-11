const anchorTags = document.querySelectorAll("a");
    anchorTags.forEach((a) => {
      a.setAttribute("target", "_blank");
    });
  console.log("js loaded")