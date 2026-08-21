/* FERNANDA · MIS XV AÑOS */
const musicToggle=document.getElementById('musicToggle');
const musicText=document.getElementById('musicText');
const envelope=document.getElementById('envelope');
const envelopeHint=document.getElementById('envelopeHint');
const message=document.getElementById('message');

const YOUTUBE_VIDEO_ID='9bGFko9SM0M';
let ytPlayer=null,ytReady=false,playing=false,pendingPlay=false;

window.onYouTubeIframeAPIReady=function(){
  ytPlayer=new YT.Player('youtubeAudio',{
    width:2,height:2,videoId:YOUTUBE_VIDEO_ID,
    playerVars:{autoplay:0,controls:0,rel:0,playsinline:1,loop:1,playlist:YOUTUBE_VIDEO_ID,enablejsapi:1},
    events:{
      onReady:function(){ytReady=true;if(pendingPlay)startMusic();},
      onStateChange:function(e){
        if(e.data===YT.PlayerState.PLAYING)setMusicState(true);
        if(e.data===YT.PlayerState.PAUSED||e.data===YT.PlayerState.ENDED)setMusicState(false);
      },
      onAutoplayBlocked:function(){pendingPlay=false;setMusicState(false,'TOCA MÚSICA');}
    }
  });
};
function setMusicState(state,text){
  playing=state;musicToggle.classList.toggle('is-playing',state);musicToggle.setAttribute('aria-pressed',String(state));musicToggle.setAttribute('aria-label',state?'Pausar música':'Reproducir música');musicText.textContent=text||(state?'PAUSAR':'MÚSICA');
}
function startMusic(){
  if(!ytReady||!ytPlayer){pendingPlay=true;musicText.textContent='CARGANDO';return;}
  pendingPlay=false;ytPlayer.unMute();ytPlayer.setVolume(75);ytPlayer.playVideo();
}
function pauseMusic(){pendingPlay=false;if(ytReady&&ytPlayer)ytPlayer.pauseVideo();setMusicState(false);}
musicToggle.addEventListener('click',()=>playing?pauseMusic():startMusic());

envelope.addEventListener('click',function(){
  const open=envelope.classList.toggle('open');
  envelope.setAttribute('aria-expanded',String(open));
  message.classList.toggle('show',open);message.setAttribute('aria-hidden',String(!open));
  envelopeHint.textContent=open?'TOCA PARA CERRAR':'TOCA EL SOBRE';
});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const parallaxImages=document.querySelectorAll('.parallax');let ticking=false;
function parallax(){parallaxImages.forEach(img=>{const parent=img.parentElement,rect=parent.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const y=(innerHeight/2-(rect.top+rect.height/2))*.045;img.style.transform=`translate3d(0,${y}px,0) scale(1.04)`}});ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});parallax();

document.querySelectorAll('.placeImageWrap').forEach(wrap=>{
  wrap.addEventListener('pointerenter',()=>wrap.classList.add('is-hover'));
  wrap.addEventListener('pointerleave',()=>wrap.classList.remove('is-hover'));
  wrap.addEventListener('focusin',()=>wrap.classList.add('is-hover'));
  wrap.addEventListener('focusout',()=>wrap.classList.remove('is-hover'));
  wrap.addEventListener('click',()=>{wrap.classList.toggle('is-hover');setTimeout(()=>wrap.classList.remove('is-hover'),1200)});
});
