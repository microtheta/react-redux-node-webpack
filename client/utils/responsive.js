window.onload = function() {
  //Set active class for navbar menu item
  const cElem = document.querySelectorAll(".navbar a[href='"+window.location.pathname+"']");
  if(cElem && cElem.length) {
    cElem[0].classList.add('active');
  }

  //add shadow on scroll
  window.addEventListener('scroll', function(e) {
    const element = document.getElementById("topNav");
    if(!element) {
      return
    }
    if(window.pageYOffset > 10) {
      element.classList.add("nav-bar-bottom-shadow");
    } else {
      element.classList.remove("nav-bar-bottom-shadow");
    }
  });
}