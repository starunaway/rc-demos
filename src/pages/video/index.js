import React, {Component} from 'react';
import './style.less';
import 'video.js/dist/video-js.css';

import VideoPlayer from './VideoPlayer';
class Video extends Component {
  constructor(props) {
    super(props);
    this.player = new VideoPlayer();
  }

  async componentDidMount() {
    const create = await this.player.create('video');
    if (create === 'success') {
      this.player.src({
        src: 'https://view.vzaar.com/21655639/video/gong',
        type: 'video/mp4',
      });
      this.player.play();
    }
  }

  render() {
    return (
      <div className='video-wrapper'>
        <video id='video'></video>
      </div>
    );
  }
}
export default Video;
