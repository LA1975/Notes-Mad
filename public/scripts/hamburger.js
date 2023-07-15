//hamburger to cross animation navigation
const hamburgerBtn = document.getElementById('hamburger');
const navList = document.getElementById('navList');
const firstBar = document.getElementById('bar-first');
const secondBar = document.getElementById('bar-second');
const thirdBar = document.getElementById('bar-third');
let menuOn=false;

function toggleButton(){
  navList.classList.toggle('show');
    if(menuOn){
    firstBar.style.transform = 'rotate(0deg)';
    firstBar.style.top = '0px';
    secondBar.style.opacity =1;
    thirdBar.style.transform = 'rotate(0deg)';
    thirdBar.style.bottom = '0px';
    menuOn=false;
    
  }else{
    firstBar.style.transform = 'rotate(45deg)';
    firstBar.style.top = '8px';
    secondBar.style.opacity =0;
    thirdBar.style.transform = 'rotate(-45deg)';
    thirdBar.style.bottom = '8px';
    menuOn=true;
  }
 }

hamburgerBtn.addEventListener('click', toggleButton);