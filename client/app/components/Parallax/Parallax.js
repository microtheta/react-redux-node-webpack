import React, { Component } from 'react';
import _ from 'lodash';
import '../../styles/parallax';


class Parallax extends Component {
  constructor(props) {
    super(props);
    this.isFirefox = (/Firefox/i.test(navigator.userAgent));
    this.isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv:11\./i.test(navigator.userAgent));
    this.ticking = false;
    this.scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
    this.slideDurationSetting = 600; //Amount of time for which slide is "locked"
    this.currentSlideNumber = 0;
    this.totalSlideNumber = 0;
    this.delta = 0;
    this.mousewheelEvent = this.isFirefox ? "DOMMouseScroll" : "wheel";
    this.eventListener;
    this.touchStartListener;

    this.parallaxScroll = this.parallaxScroll.bind(this);
    this.slideDurationTimeout = this.slideDurationTimeout.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.previousItem = this.previousItem.bind(this);

  }

  componentDidMount() {
    this.totalSlideNumber = document.getElementsByClassName("background").length;
    // ------------- ADD EVENT LISTENER ------------- //
    this.eventListener = _.throttle(this.parallaxScroll, 60);
    this.touchStartListener = (e) => { this.delta = e.changedTouches[0].clientY };
    window.addEventListener(this.mousewheelEvent, this.eventListener, false);
    window.addEventListener("touchstart", this.touchStartListener, false);
    window.addEventListener("touchend", this.eventListener, false);
  }

  parallaxScroll(evt) {
    console.log(evt)
    if(evt.type === 'touchend') {
      this.delta = evt.changedTouches[0].clientY - this.delta;
    }
    else if (this.isFirefox) {
      //Set delta for Firefox
      this.delta = evt.detail * (-120);
    } else if (this.isIe) {
      //Set delta for IE
      this.delta = -evt.deltaY;
    } else {
      //Set delta for all other browsers
      this.delta = evt.wheelDelta;
    }

    if (this.ticking != true) {
      if (this.delta <= -this.scrollSensitivitySetting) {
        //Down scroll
        this.ticking = true;
        if (this.currentSlideNumber !== this.totalSlideNumber - 1) {
          this.currentSlideNumber++;
          this.nextItem();
        }
        this.slideDurationTimeout(this.slideDurationSetting);
      }
      if (this.delta >= this.scrollSensitivitySetting) {
        //Up scroll
        this.ticking = true;
        if (this.currentSlideNumber !== 0) {
          this.currentSlideNumber--;
        }
        this.previousItem();
        this.slideDurationTimeout(this.slideDurationSetting);
      }
    }
  }

  slideDurationTimeout(slideDuration) {
    setTimeout(() => {
      this.ticking = false;
    }, slideDuration);
  }

  nextItem() {
    var $previousSlide = document.getElementsByClassName("background")[this.currentSlideNumber - 1];
    $previousSlide.classList.remove("up-scroll");
    $previousSlide.classList.add("down-scroll");
  }

  previousItem() {
    var $currentSlide = document.getElementsByClassName("background")[this.currentSlideNumber];
    $currentSlide.classList.remove("down-scroll");
    $currentSlide.classList.add("up-scroll");
  }

  componentWillUnmount() {
    // ------------- ADD EVENT LISTENER ------------- //
    window.removeEventListener(this.mousewheelEvent, this.eventListener, false);
    window.removeEventListener("touchstart", this.touchStartListener, false);
    window.removeEventListener("touchend", this.eventListener, false);
  }

  render() {
    const { sections } = this.props;
    return (
      <div className="parallax-main">
        {
          sections.map((section, i) => (
            <section key={i} className="background" style={{
              zIndex: sections.length-i,
              backgroundColor: section.color,
              backgroundImage: `url(${section.image})`
            }}>
              <div className="content-wrapper">
                <p className="content-title">{section.title}</p>
                <p className="content-subtitle">{section.subtitle}</p>
              </div>
            </section>
          ))
        }
      </div>
    );
  }
}

Parallax.defaultProps = {
  sections: [
    {
      title: 'Full Page Parallax Effect',
      subtitle: 'croll down and up to see the effect!',
      image: 'https://s8.postimg.org/lf2udl5np/4_Aihmii.jpg',
      color: 'red'
    },
    {
      title: 'Cras lacinia non eros nec semper.',
      subtitle: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras ut massa mattis nibh semper pretium.',
      image: 'https://s8.postimg.org/ow4wgk4px/ugqti_Lg.jpg',
      color: 'green'
    },
    {
      title: 'Etiam consequat lectus.',
      subtitle: 'Nullam tristique urna sed tellus ornare congue. Etiam vitae erat at nibh aliquam dapibus.',
      image: 'https://s8.postimg.org/grwsbtiat/x_ZMOBTj.jpg',
      color: 'blue'
    }
  ],
};

export default Parallax;
