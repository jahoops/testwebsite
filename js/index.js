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
  window.setInterval(function () {
    if (moveToQueue.length > 0) {
      var destLeft = 4000;
      var timeToComplete = 3000;
      var el = moveToQueue.shift();
      el.classList.remove('red');
      el.classList.remove('blue');
      var r = getRandomInt(40, 120);
      if (r % 5 === 0) el.classList.add('red');
      if (r % 40 === 0) {
        el.classList.add('blue');
        timeToComplete = 35000;
      }
      el.style.top = r + 'px';
      el.style.left = '-1000px';
      el.style.zIndex = r;
      el.style.zoom = r / 100;
      el.style.display = 'block';
      var d = new Date();
      var ticks = d.getTime();
      moveTo(
        el, {
          top: parseInt(el.style.top, 10) || 0,
          left: destLeft
        },
        ticks,
        ticks + timeToComplete,
        moveToFinished
      );
    }
  }, getRandomInt(100, 300));
  
  var div_to_insert = document.createElement('div');
  div_to_insert.classList.add('colorGrid');
  div_to_insert.style.borderRadius = '50%';
  div_to_insert.style.margin = '10px';
  var container = document.querySelector('#slide1 .content');
  container.style.height = '250px';
  fillElWith(container, div_to_insert, 3, 2);
  var grid = document.querySelectorAll('#slide1 .content .colorGrid');
  grid.forEach(function(el){
    el.style.backgroundColor = randomColor();
  });

  var itm = document.getElementsByClassName('ryu');
  itm[0].style.display = 'none';

  var moveToQueue = [];

  function moveToFinished(element) {
    moveToQueue.push(element);
  }

  for (var i = 0; i < 30; i++) {
    var cln = itm[0].cloneNode(true);
    document.getElementById("slide2").appendChild(cln);
    moveToQueue.push(cln);
  }
})();