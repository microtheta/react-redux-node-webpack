window.addEventListener('scroll', function(e) {
  const element = document.getElementById("topNav");
  if(window.pageYOffset > 10) {
    element.classList.add("nav-bar-bottom-shadow");
  } else {
    element.classList.remove("nav-bar-bottom-shadow");
  }
});