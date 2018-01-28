import { history } from '../components/App';

//Change react router state from outside of react app!!
window.ReactRouterLink = function(elem, route) {
  if(window.location.pathname != route) {

    var curActive = document.querySelector('.navbar#topMenu .nav-link.active');
    if(curActive) { curActive.classList.remove('active'); }

    var newActive = document.querySelector('.navbar#topMenu .nav-link[href="'+route+'"]');
    if(newActive) { newActive.classList.add('active'); }

    history.push(route);
  }
  return false;
}

window.onload = function() {
  //Set active class for navbar menu item
  const cElem = document.querySelectorAll(".navbar#topMenu a.nav-link[href='"+window.location.pathname+"']");
  if(cElem && cElem.length) {
    cElem[0].classList.add('active');
  }

  //add shadow on scroll
  window.addEventListener('scroll', function() {
    const element = document.getElementById("topNav") ? document.getElementById("topNav") : document.getElementById("topMenu");
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