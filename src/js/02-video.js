const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on(
  'timeupdate',
  throttle(function () {
    player.getCurrentTime().then(function (sec) {
      console.log('current-time:', sec);
      localStorage.setItem('videoplayer-current-time', JSON.stringify(sec));
    });
  }, 1000),
);

const currentTime = JSON.parse(localStorage.getItem('videoplayer-current-time')) || 0;
player.setCurrentTime(currentTime);
