import icon from './icons8-play-48.png';
import previousimage from './previous.png';
import pause from './pause.png';
import next_img from './next.png';
import logo from './icons8-music-64.png';
import menu_logo from './hamburger.png';
import close_logo from './icons8-close-window-50.png';
import './App.css';
import './Devices.css';
import track from './tracks';
import React,{useState,useRef} from 'react';

function App() {
  let [currTrack,setTrack] = useState(0);
  // let sound = new Audio(track[currTrack].src);
  const audioRef = useRef(new Audio(track[currTrack].src));
  const sound = audioRef.current;

  const playing = () => {
    document.getElementById('play').style.display='none';
    document.getElementById("pause").style.display="block";
    console.log(sound);
    sound.play();
    sound.ontimeupdate = function() {
      document.getElementById('progress').style.width = Math.floor(100*sound.currentTime/sound.duration)+"%";
      document.getElementById('startTime').innerHTML = formatTime(sound.currentTime);
      document.getElementById('endTime').innerHTML = formatTime(sound.duration);
    };
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0':''}${seconds}`;
  }

  const pausing = () => {
    document.getElementById('play').style.display='block' ;
    document.getElementById("pause").style.display="none";
    sound.pause();
  }

  const next = () => {
    document.getElementById('play').style.display='block';
    document.getElementById("pause").style.display="none";
    currTrack+=1;
    setTrack(currTrack);
    sound.src = track[currTrack].src;
    console.log(sound.src);
    sound.pause();
  }

  const previous = () => {
    document.getElementById('play').style.display='block' ;
    document.getElementById("pause").style.display="none";
    currTrack-=1;
    setTrack(currTrack);
    sound.src = track[currTrack].src;
    sound.pause();
  }
  const bar = (e) => {
    console.log(e);
    console.log(e.nativeEvent.offsetX*100 / document.getElementById('progressed_bar').offsetWidth * sound.duration);
    sound.currentTime = (e.nativeEvent.offsetX / document.getElementById('progressed_bar').offsetWidth) * sound.duration;
  }

  const musicPlay = (indexVal) => {
    currTrack = indexVal;
    setTrack(currTrack);
    sound.src = track[currTrack].src;
    playing();
  }

  const open_menu = () => {
    const x = document.getElementById("pop-menu");
    x.style.display = 'block';

    const y = document.getElementById("menu");
    y.style.display = 'none';

    const z = document.getElementById("close");
    z.style.display = 'flex';
  }

  const close_menu = () => {
    const x = document.getElementById("close");
    x.style.display = 'none';

    const y = document.getElementById("menu");
    y.style.display = 'flex';

    const z = document.getElementById("pop-menu");
    z.style.display = 'none';
  
  }
  return (
      <>
        <div id="section1">
        <nav className="navbar">
            <header className="head">
                <div className="left">
                  <span style={{width:'fit-content',margin:'auto 5px'}}><img src={logo} alt='' className='logo_img'/></span>
                  <h2>Music Tech</h2>
                </div>
                <div className="right">
                    <ul className="opts">
                      <li>Podcasts</li>
                      <li>Categories</li>
                      <li>About Us</li>
                      <li>Support</li>
                    </ul>
                    <ul id='all_menu_btn'>
                      <li onClick={open_menu} id="menu"><img src={menu_logo} alt=''/></li>
                    </ul>
                </div>
            </header>
        </nav>
      </div>

      <div id='displaying'>
        <div className='music_list'>
          <div style={{display: 'block',width: '100%',padding: '10px'}}>
            <div className='common' onClick={()=>musicPlay(0)}>
              <h4 className='heading_style'>{track[0].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(1)}>
              <h4 className='heading_style'>{track[1].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(2)}>
              <h4 className='heading_style'>{track[2].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(3)}>
              <h4 className='heading_style'>{track[3].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(4)}>
              <h4 className='heading_style'>{track[4].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(5)}>
              <h4 className='heading_style'>{track[5].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(6)}>
              <h4 className='heading_style'>{track[6].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(7)}>
              <h4 className='heading_style'>{track[7].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
            <div className='common' onClick={()=>musicPlay(8)}>
              <h4 className='heading_style'>{track[8].title}</h4>
              <img src={icon} alt='icon' id='first' />
            </div>
          </div>
        </div>
        <div className='right_player'>
          <div style={{width:'fit-content',margin:'auto'}}>
            <div style={{width:'fit-content', margin:'1rem auto', backgroundColor:'transparent'}}>
              <img src={track[currTrack].thumbnail} alt='passori song' className='song' id='image'/>
            </div>
            <div style={{width:'100%'}}>
              <h2 id='title' style={{textAlign: 'center', fontSize:'35px', color:'white'}}>{track[currTrack].title}</h2>
              <h4 id='author' style={{textAlign: 'center', fontSize:'20px',color:'white'}}>{track[currTrack].Author}</h4>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',color:'white'}}>
              <span id='startTime'>0:00</span>
              <span id='endTime'>0:00</span>
            </div>
            <div style={{width:'100%',height:'10px',backgroundColor:'white',borderRadius:'100px'}} id='progressed_bar' onClick={bar}>
              <div style={{width:'0%',height:'10px',backgroundColor:'#404373',borderRadius:'100px'}} id='progress'></div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',margin:'1rem auto'}}>
              <img src={previousimage} alt='previous button' style={{backgroundColor:'white',borderRadius:'10px',cursor:'pointer '}} onClick={previous}/>
              <img src={icon} alt='icon' style={{backgroundColor:'white',borderRadius:'10px',cursor:'pointer '}} id='play' onClick={playing}/>
              <img src={pause} alt='pause button' style={{backgroundColor:'white',borderRadius:'10px',cursor:'pointer',display:'none'}} id='pause'onClick={pausing} />
              <img src={next_img} alt='next button' style={{backgroundColor:'white',borderRadius:'10px',cursor:'pointer'}} onClick={next}/>
            </div>
          </div>
        </div>

        <div id="pop-menu">
          <div id="close">
            <img src={close_logo} onClick={close_menu} alt=''/>
          </div>
          <ul>
            <li>Podcasts</li>
            <li>Categories</li>
            <li>About Us</li>
            <li>Support</li>
          </ul>
        </div>
      </div>
      </>
  );
}

export default App;
