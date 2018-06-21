var body = document.getElementsByTagName("BODY")[0];

function scrollSlide(id) {
  document.querySelector('.active').classList.remove('active');
  var targetDiv = document.querySelector(id);
  targetDiv.classList.add('active');
  var y = targetDiv.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: y,
    behavior: 'smooth'
  });
  return false;
}

(function () {
  var moveToQueue = [];
  // window.setInterval(function () {
  //   if (moveToQueue.length > 0) {
  //     var destLeft = 4000;
  //     var timeToComplete = 3000;
  //     var el = moveToQueue.shift();
  //     el.classList.remove('red');
  //     el.classList.remove('blue');
  //     var r = getRandomInt(40, 120);
  //     if (r % 5 === 0) el.classList.add('red');
  //     if (r % 40 === 0) {
  //       el.classList.add('blue');
  //       timeToComplete = 35000;
  //     }
  //     el.style.top = r + 'px';
  //     el.style.left = '-1000px';
  //     el.style.zIndex = r;
  //     el.style.zoom = r / 100;
  //     el.style.display = 'block';
  //     var d = new Date();
  //     var ticks = d.getTime();
  //     moveTo(
  //       el, {
  //         top: parseInt(el.style.top, 10) || 0,
  //         left: destLeft
  //       },
  //       ticks,
  //       ticks + timeToComplete,
  //       moveToFinished
  //     );
  //   }
  // }, getRandomInt(100, 300));
  
  var div_to_insert = document.createElement('div');
  div_to_insert.classList.add('colorGrid');
  div_to_insert.classList.add('button');
  div_to_insert.style.margin = '10px';
  div_to_insert.style.opacity = '.1';
  div_to_insert.style.transition = 'all ease 2s';
  var container = document.querySelector('#slide1 .content');
  var cWidth = container.clientWidth;
  container.style.height = '250px';
  fillElWith(container, div_to_insert, 3, 2);
  var grid = document.querySelectorAll('#slide1 .content .colorGrid');
  var colors = ['#DA3F35','#FD6136','#FF9050','#FAA852','#F0BC53','#F0D057'];
  grid.forEach(function(el,idx){
    el.style.borderRadius = '0%';
    el.style.backgroundColor = colors[idx];
    setTimeout(function(){
      el.style.opacity = '.5';
      el.style.position = 'absolute';
      el.style.top = (idx * 30) + 'px';
      el.style.left = cWidth/12 + 'px';
      el.style.borderRadius = '50%';
      finalSizePosition(el,idx);
    },2500);
  });
  
  function finalSizePosition(el,idx){
    setTimeout(function(){
      el.style.opacity = '.6';
      el.style.top = (idx * 10) + '%';
      el.style.left = cWidth/30 + 'px';
      el.style.height = '10%';
      el.style.width = '10%';
      finalShapeSpacing(el,idx);
    },3500);
  }
  function finalShapeSpacing(el,idx){
    setTimeout(function(){
      el.style.opacity = '.8';
      el.style.top = -70 + (idx * cWidth/16) + (idx * 5) + 'px';
      el.style.height = cWidth/16 + 'px';
      el.style.border = 'solid 0.5px ' + lighten(colors[idx],0.15);
    },500);
  }

  var itm = document.getElementsByClassName('ryu');
  itm[0].style.display = 'none';

  function moveToFinished(element) {
    moveToQueue.push(element);
  }

  // for (var i = 0; i < 30; i++) {
  //   var cln = itm[0].cloneNode(true);
  //   document.getElementById("slide2").appendChild(cln);
  //   moveToQueue.push(cln);
  // }

  //logoShowByLetter('svglogo');
  //logoAnimate('svglogo');

})();