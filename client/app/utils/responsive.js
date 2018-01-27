import { history } from '../components/App';

//Change react router state from outside of react app!!
window.ReactRouterLink = function(elem, route) {
  if(window.location.pathname != route) {
    document.querySelector('.navbar .nav-link.active').classList.remove('active');
    document.querySelector('.navbar .nav-link[href="'+route+'"]').classList.add('active');
    history.push(route);
  }
  return false;
}

window.onload = function() {
  //Set active class for navbar menu item
  const cElem = document.querySelectorAll(".navbar a.nav-link[href='"+window.location.pathname+"']");
  if(cElem && cElem.length) {
    cElem[0].classList.add('active');
  }

  //add shadow on scroll
  window.addEventListener('scroll', function() {
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