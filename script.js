window.onload = function(e) {
  //Header
  const nav = document.querySelector('.header-nav ul');
  nav.addEventListener('click', linkChangeColor);
  nav.addEventListener('click', scrollPosition);
  let selectedLink;
 
  function linkChangeColor(e) {
    let target = e.target;
    if (target.tagName !=='A') return;
    highlightLink(target);
  }

  function highlightLink(link) {
    if (selectedLink) selectedLink.classList.remove('link-active');
    selectedLink = link;
    selectedLink.classList.add('link-active');
  }

  function scrollPosition(e) {
    let elem = document.getElementById(`${e.target.innerHTML}`);
    if (!elem) return;
    let item = elem.getBoundingClientRect();
    let start = Date.now();   
    let top = item.top - 50;
    let current = pageYOffset;
    if (elem.id === 'home') top = -pageYOffset;
    let timer = setInterval(function() {
      let time = Date.now() - start;
      if (time >= Math.abs(top*2)) {
        clearInterval(timer); 
        return;
      }
      if (top < 0) {
        document.documentElement.scrollTop = current - time/2;
      } else {
        document.documentElement.scrollTop = current + time/2;
      }      
    }, 50);
  }

  window.onscroll = function (e) {
    let target = e.target;
    Array.from(target.all).forEach(i => {
      if (i.tagName === 'SECTION') {
        let elem = i.getBoundingClientRect();
        let topPosition = elem.top + pageYOffset - 245;
        let bottomPosition = elem.bottom + pageYOffset - 245;
        let hash = '#' + i.id;
        if (pageYOffset >= topPosition && pageYOffset < bottomPosition) {
          document.querySelector(`[href="${hash}"]`).classList.add('link-active');
        } else {
          document.querySelector(`[href="${hash}"]`).classList.remove('link-active');
        }
      }
      if (i.tagName === 'HEADER') {
        let hash = '#' + i.id;
        if (pageYOffset < 300) {
          document.querySelector(`[href="${hash}"]`).classList.add('link-active');
        } else {
          document.querySelector(`[href="${hash}"]`).classList.remove('link-active');
        }
      }
    })
  }

  //Slider
  const allSlides = document.querySelectorAll('.slide').length
  const slideRow = document.querySelector('.slider')
  const slideView = document.querySelector('.slider-wrapper')
  const prevButton = document.querySelector('.prev')
  const nextButton = document.querySelector('.next')
      
  prevButton.addEventListener('click', prev)
  nextButton.addEventListener('click', next)
    
  function next() {
    slideRow.classList.add('left');
    slideRow.addEventListener('animationend', handler); 
    function handler() {
      let clone = slideRow.children[0].cloneNode(true);
      slideRow.append(clone);
      slideRow.removeChild(slideRow.children[0]);
      this.classList.remove('left');
      slideRow.removeEventListener('animationend', handler); 
    }
  }

  function prev() {
    let clone = slideRow.children[allSlides- 1].cloneNode(true);
    slideRow.prepend(clone);
    slideRow.removeChild(slideRow.children[allSlides]);      
    slideRow.classList.add('right')
    slideRow.addEventListener('animationend', handler); 
    function handler() {
       this.classList.remove('right');
       slideRow.removeEventListener('animationend', handler);
    } 
  }

  const slider = document.querySelector('.slider');
  slider.addEventListener('click', changeBackground);

  function changeBackground(e) {
    let target = e.target.previousElementSibling;
    if (!target) return;
    target.classList.toggle('screen-disabled');    
  }

  //Portfolio
  const navigation = document.querySelector('.navigation');
  let selectedButton, selectedImage;
  const portfolioLayout = document.querySelector('.layout-4-column');
  const portfolio = document.querySelector('.portfolio');
  navigation.addEventListener('click', checkButton);
  portfolio.addEventListener('click', checkImage);

  function checkButton(e) {
    let target = e.target;
    if (target.tagName !== 'BUTTON') return;
    highlightButton(target);
    imageChangePosition(e)
  }

  function highlightButton(button) {
    if (selectedButton) selectedButton.classList.remove('button-active-js');
    selectedButton = button;
    selectedButton.classList.add('button-active-js');
  }

  function imageChangePosition(e) {
    portfolioLayout.lastElementChild.after(portfolioLayout.firstElementChild);   
  }

  function checkImage(e) {
    let target = e.target;
    if (target.tagName !== 'IMG') return;
    changeBorder(target);   
  }

  function changeBorder(image) {
    if (selectedImage) selectedImage.classList.remove('img-selected-js');
    selectedImage = image;
    selectedImage.classList.add('img-selected-js');
  }

  //Get-a-Quote
  const form = document.querySelector('form');
  const getAQuote = document.querySelector('.get-a-quote')
  form.addEventListener('submit', submitHandler);
  
  function submitHandler(e) {
    e.preventDefault();
    let div = document.createElement('div');
    div.className = "alert-js";
    div.innerHTML = 'Письмо отправлено';
    Array.from(form.children).forEach(i => {
    if (i.name === 'subject' && i.value === '') {
      div.insertAdjacentHTML('beforeend', `<p class="alert-js__text">Без темы</p>`);
    } else if (i.name === 'subject') {
        div.insertAdjacentHTML('beforeend', `<p class="alert-js__text">Тема: ${i.value}</p>`);
      }
    if (i.name === 'describe' && i.value === '') {
      div.insertAdjacentHTML('beforeend', `<p class="alert-js__text">Без описания</p>`);
    } else if (i.name === 'describe') {
        div.insertAdjacentHTML('beforeend', `<p class="alert-js__text">Описание: ${i.value}</p>`);
      }
    })
    div.insertAdjacentHTML('beforeend', '<button class="alert-js__button">OK</button>');
    getAQuote.append(div); 
    const alertButton = document.querySelector('.alert-js__button');
    alertButton.addEventListener('click', closeAlert);   
    function closeAlert() {
      div.remove();
      Array.from(form.children).forEach(i => i.value = '');
    }
  }    
}