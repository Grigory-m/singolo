window.onload = function(e) {
  //Header
  const nav = document.querySelector('.header-nav ul');
  nav.addEventListener('click', linkChangeColor);
  let selectedLink;
  function linkChangeColor(e) {
    let target = e.target;
    if (target.tagName !=='A') return;
    highlightLink(target);
  }

  function highlightLink(link) {
    if (selectedLink) selectedLink.classList.remove('navlink-active-js');
    selectedLink = link;
    selectedLink.classList.add('navlink-active-js');
  }

  //Slider
  let i = 1;
  const slides = document.querySelectorAll('.slide');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  next.addEventListener('click', nextArrowHandler);
  prev.addEventListener('click', prevArrowHandler);

  function nextArrowHandler(e) {
    slides[i].classList.remove('disabled-js');
    i++;
    if (i >= slides.length) i = 0;
    slides[i].classList.add('disabled-js');    
  }

  function prevArrowHandler() {
      slides[i].classList.remove('disabled-js');
      i--;
      if (i < 0) i = slides.length - 1;
      slides[i].classList.add('disabled-js');
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
  const portfolioLayouts = document.querySelectorAll('.layout-4-column');
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
    portfolioLayouts.forEach(i => i.lastElementChild.after(i.firstElementChild));   
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
    if (i.name === 'subject') {
      div.insertAdjacentHTML('beforeend', `<p class="alert-js__text">Тема: ${i.value}</p>`)
    } else if (i.name === 'subject' && i.value === '') {
        div.insertAdjacentHTML('beforeend', '<p class="alert-js__text">Без темы</p>')
      }

    if (i.name === 'describe') {
      div.insertAdjacentHTML('beforeend', `<p class="alert-js__text">Описание: ${i.value}</p>`)
    } else if (i.name === 'describe' && i.value === '') {
        div.insertAdjacentHTML('beforeend', '<p class="alert-js__text">Без описания</p>')
      }
    })
    div.insertAdjacentHTML('beforeend', '<button class="alert-js__button">OK</button>')
    getAQuote.append(div); 
    const alertButton = document.querySelector('.alert-js__button');
    alertButton.addEventListener('click', closeAlert);   
    function closeAlert() {
      div.remove();
    }
  }  
  
}