import videojs from 'video.js';
import './style.less';

class VideoPlayer {
  constructor() {
    this.options = {
      controlBar: [],
    };
  }

  create = (element, option) => {
    return new Promise((resolve, reject) => {
      this.player = videojs(element, option || {}, () => {
        resolve('success');
      });
    });
  };

  src = (params) => {
    this.player.src(params);
  };

  play = () => {
    this.player.play();
  };

  instance = () => {
    return this.play();
  };
}

export default VideoPlayer;
