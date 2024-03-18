/**
 * Common options
 */
let startMusic  = true;   // auto start music (firefox only)
let cycleColor  = false;  // cycle colors 
let commonHue   = 0.038;  // initial color 
let commonColor = new THREE.Color();
commonColor.setHSL( commonHue, .8, .5 );

/**
 * Device screen info helper 
 */
const deviceInfo = (function(){
 const _w = window;
 const _s = window.screen;
 const _b = document.body;
 const _d = document.documentElement;
 
 return {
  screenWidth() {
   return Math.max( 0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0 );
  },
  screenHeight() {
   return Math.max( 0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0 );
  },
  screenRatio() {
   return this.screenWidth() / this.screenHeight();
  },
  screenCenterX() {
   return this.screenWidth() / 2;
  },
  screenCenterY() {
   return this.screenHeight() / 2;
  },
  mouseX( e ) {
   return Math.max( 0, e.pageX || e.clientX || 0 );
  },
  mouseY( e ) {
   return Math.max( 0, e.pageY || e.clientY || 0 );
  },
  mouseCenterX( e ) {
   return this.mouseX( e ) - this.screenCenterX();
  },
  mouseCenterY( e ) {
   return this.mouseY( e ) - this.screenCenterY();
  },
 }; 
})();


/**
 * Music player helper 
 */
const musicHelper = (function(){
 let wrap   = document.querySelector( '#player' ); 
 let button = wrap ? wrap.querySelector( 'button' ) : null; 
 let audio  = new Audio( 'http://ice1.somafm.com/u80s-256-mp3' ); 
 let step   = 0.01;
 let active = false; 
 let sto    = null; 
 
 let fadeIn = () => {
  audio.volume += 0.01; 
  if ( audio.volume >= 0.2 ) { audio.volume = 0.2; return; }
  sto = setTimeout( fadeIn, 100 ); 
 };
 
 let fadeOut = () => {
  audio.volume -= 0.02; 
  if ( audio.volume <= 0.01 ) { audio.volume = 0; audio.pause(); return; }
  sto = setTimeout( fadeOut, 100 ); 
 };
 
 let play = () => {
  if ( sto ) clearTimeout( sto ); 
  active = true;
  button.textContent = 'Stop music'; 
  audio.play(); 
  fadeIn();
 };
 
 let stop = () => {
  if ( sto ) clearTimeout( sto ); 
  active = false;
  button.textContent = 'Play music'; 
  fadeOut();
 };
 
 button.addEventListener( 'click', e => {
  e.stopPropagation(); 
  e.preventDefault(); 
  if ( active ) { stop(); } 
  else { play(); }
 });
 
 audio.preload = 'auto'; 
 audio.muted   = false; 
 audio.volume  = 0;
 return { play, stop };
})();


/**
 * Loader Helper
 */
const LoaderHelper = {
 _base: 'https://raw.githubusercontent.com/rainner/codepen-assets/master/',
 _data: {}, 
 _loaded: 0, 
 _cb: null,
 
 // get loaded resource by name  
 get( name ) {
  return this._data[ name ] || null; 
 }, 
 
 // complete handler 
 onReady( cb ) {
  this._cb = cb; 
 }, 
 
 // common error handler 
 onError( err ) {
  console.error( err.message || err ); 
 }, 
 
 // when a resource is loaded 
 onData( name, data ) {
  this._loaded += 1;
  this._data[ name ] = data; 
  let total  = Object.keys( this._data ).length; 
  let loaded = ( total && this._loaded === total ); 
  let hascb  = ( typeof this._cb === 'function' ); 
  if ( loaded && hascb ) this._cb( total ); 
 }, 
 
 // custom .obj file 
 loadGeometry( name, file ) {
  if ( !name || !file ) return;
  this._data[ name ] = new THREE.Object3D(); 
  const path = this._base +'/'+ file; 
  const loader = new THREE.OBJLoader();
  loader.load( path, data => { this.onData( name, data ) }, null, this.onError );
 }, 
 
 // load image file 
 loadTexture( name, file ) {
  if ( !name || !file ) return;
  this._data[ name ] = new THREE.Texture(); 
  const path = this._base +'/'+ file; 
  const loader = new THREE.TextureLoader();
  loader.load( path, data => { this.onData( name, data ) }, null, this.onError );
 },
};


/**
 * Helper for adding easing effect 
 */
const addEase = ( pos, to, ease ) => {
 pos.x += ( to.x - pos.x ) / ease;
 pos.y += ( to.y - pos.y ) / ease;
 pos.z += ( to.z - pos.z ) / ease;
};

/**
 * Shooting star object 
 */
const shootingStar = {
 scene: null, 
 stars: [], 
 spread: 1000, 
 
 // create
 create( scene ) {
  this.scene = scene; 
  let geometry = new THREE.CylinderGeometry( 0, 2, 120, 10 );
  let material = new THREE.MeshBasicMaterial({
   color: 0xffffcc,
   opacity: .4,
   blending: THREE.AdditiveBlending,
   side: THREE.FrontSide,
   transparent: false,
   depthTest: true,
  });
  
  let randx = THREE.Math.randInt( -this.spread, this.spread ); 
  let cylinder = new THREE.Mesh( geometry, material );
  cylinder.position.set( randx, 300, 200 );
  cylinder.rotation.set( Math.PI / 2, 0, 0 );
  this.stars.push( cylinder ); 
  this.scene.add( cylinder ); 
 },
 
 // update
 update( mouse ) {
  for ( let i = 0; i < this.stars.length; i++ ) {
   let cylinder = this.stars[ i ]; 
   
   if ( cylinder.position.z < -3000 ) {
    this.stars.splice( i, 1 ); 
    this.scene.remove( cylinder ); 
    continue;
   }
   cylinder.position.z -= 20; 
  }
 },
};


/**
 * Starfield object 
 */
const starField = {
 group: null, 
 total: 400, 
 spread: 8000, 
 zoom: 1000, 
 ease: 12, 
 move: { x: 0, y: 1200, z: -1000 },  
 look: { x: 0, y:0, z: 0 }, 
 
 // create 
 create( scene ) {
  this.group = new THREE.Object3D();
  this.group.position.set( this.move.x, this.move.y, this.move.z );
  this.group.rotation.set( this.look.x, this.look.y, this.look.z );
 
  let geometry = new THREE.Geometry();
  let material = new THREE.PointsMaterial({
   size: 64,
   color: 0xffffff,
   opacity: 1,
   map: LoaderHelper.get( 'starTexture' ), 
   blending: THREE.AdditiveBlending,
   vertexColors: false,
   transparent: false,
   depthTest: false,
  });
  
  for ( let i = 0; i < this.total; i++ ) {
   let angle = ( Math.random() * Math.PI * 2 );
   let radius = THREE.Math.randInt( 0, this.spread );
  
   geometry.vertices.push( new THREE.Vector3(
    Math.cos( angle ) * radius,
    Math.sin( angle ) * radius / 10,
    THREE.Math.randInt( -this.spread, 0 )
   ));
  }
  this.group.add( new THREE.Points( geometry, material ) );
  scene.add( this.group );
 }, 
 
 // update 
 update( mouse ) {
  this.move.x = -( mouse.x * 0.005 );
  addEase( this.group.position, this.move, this.ease );
  addEase( this.group.rotation, this.look, this.ease );
 }, 
}; 


/**
 * Mountains object
 */
const mountains = {
 group: null, 
 simplex: null,
 geometry: null, 
 factor: 1000, // smoothness 
 scale: 500, // terrain size
 speed: 0.0005, // move speed 
 cycle: 0, 
 ease: 18, 
 move: { x: 0, y: 0, z: -3500 },
 look: { x: 0, y: 0, z: 0 }, 
 
 create( scene ) {
  this.group = new THREE.Object3D();
  this.group.position.set( this.move.x, this.move.y, this.move.z );
  this.group.rotation.set( this.look.x, this.look.y, this.look.z );
  
  this.simplex  = new SimplexNoise(); 
  this.geometry = new THREE.PlaneGeometry( 10000, 1000, 128, 32 ); 
  
  let texture   = LoaderHelper.get( 'mountainTexture' );
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;
  
  let material  = new THREE.MeshPhongMaterial({
   color: 0xffffff,
   opacity: 1,
   map: texture, 
   blending: THREE.NoBlending,
   side: THREE.BackSide,
   transparent: false,
   depthTest: false,
  });
  
  let terrain = new THREE.Mesh( this.geometry, material );
  terrain.position.set( 0, -500, -3000 );
  terrain.rotation.x = ( Math.PI / 2 ) + 1.35;
  
  let light = new THREE.PointLight( 0xffffff, 8, 5500 );
  light.position.set( 0, 1200, -3500 );
  light.castShadow = false;
  light.color = commonColor;
  
  this.movePlain();
  this.group.add( terrain );
  this.group.add( light );
  scene.add( this.group );
 }, 
 
 // make new mointain plain 
 movePlain() {
  for ( let vertex of this.geometry.vertices ) {
   let xoff = ( vertex.x / this.factor ); 
   let yoff = ( vertex.y / this.factor ) + this.cycle; 
   let rand = this.simplex.noise2D( xoff, yoff ) * this.scale;
   vertex.z = rand;
  }
  this.geometry.verticesNeedUpdate = true;
  this.cycle -= this.speed;
 }, 
 
 // update 
 update( mouse ) {
  this.move.x = -( mouse.x * 0.02 );
  this.movePlain();
  addEase( this.group.position, this.move, this.ease );
  addEase( this.group.rotation, this.look, this.ease );
 }, 
};


/**
 * Ground object
 */
const groundPlain = {
 group: null, 
 geometry: null, 
 material: null, 
 plane: null,
 simplex: null,
 factor: 300, // smoothness 
 scale: 30, // terrain size
 speed: 0.015, // move speed 
 cycle: 0, 
 ease: 12, 
 move: { x: 0, y: -300, z: -1000 },
 look: { x: 29.8, y: 0, z: 0 }, 
 
 // create
 create( scene ) {
  this.group = new THREE.Object3D();
  this.group.position.set( this.move.x, this.move.y, this.move.z );
  this.group.rotation.set( this.look.x, this.look.y, this.look.z );
  
  this.geometry = new THREE.PlaneGeometry( 4000, 2000, 128, 64 ); 
  this.material = new THREE.MeshLambertMaterial({
   color: 0xffffff,
   opacity: 1,
   blending: THREE.NoBlending,
   side: THREE.FrontSide,
   transparent: false,
   depthTest: false,
   wireframe: true, 
  });
 
  this.plane = new THREE.Mesh( this.geometry, this.material );
  this.plane.position.set( 0, 0, 0 );

  this.simplex = new SimplexNoise(); 
  this.moveNoise();
  
  this.group.add( this.plane );
  scene.add( this.group );
 }, 
 
 // change noise values over time 
 moveNoise() {
  for ( let vertex of this.geometry.vertices ) {
   let xoff = ( vertex.x / this.factor ); 
   let yoff = ( vertex.y / this.factor ) + this.cycle; 
   let rand = this.simplex.noise2D( xoff, yoff ) * this.scale;
   vertex.z = rand;
  }
  this.geometry.verticesNeedUpdate = true;
  this.cycle += this.speed;
 }, 
 
 // update
 update( mouse ) {
  this.moveNoise();
  this.move.x = -( mouse.x * 0.04 );
  addEase( this.group.position, this.move, this.ease );
  addEase( this.group.rotation, this.look, this.ease );
 },
};


/**
 * Ship object
 */
const gunShip = {
 scene: null, 
 group: null,
 engineTexture: null, 
 gunSound: 'https://raw.githubusercontent.com/rainner/codepen-assets/master/audio/effects/lazer.mp3', 
 shots: [], 
 ease: 12, 
 move: { x: 0, y: 0, z: -40 },
 look: { x: 0, y: 0, z: 0 }, 

 // create
 create( scene ) {
  this.scene = scene; 
  this.group = new THREE.Object3D();
  this.group.position.set( this.move.x, this.move.y, this.move.z );
  this.group.rotation.set( this.look.x, this.look.y, this.look.z );
  
  let material = new THREE.MeshPhongMaterial({
   color: 0xffffff,
   blending: THREE.NoBlending,
   side: THREE.FrontSide,
   transparent: false,
   depthTest: true,
   wireframe: false, 
  });
  
  let light = new THREE.PointLight( 0xffffff, .4, 600 );
  light.position.set( 0, 0, 600 );
  
  let ship = LoaderHelper.get( 'shipGeometry' );
  ship.position.set( 0, 0, 300 );
  ship.rotation.set( 0, Math.PI, 0 );
  ship.traverse( child => {
    if ( child instanceof THREE.Mesh ) {
     child.material = material;
    }
  });
  
  this.setupEngine();
  this.playGunSound( false ); 
  this.group.add( ship ); 
  this.group.add( light ); 
  scene.add( this.group ); 
 },
 
 // create jet engine effect
 setupEngine() {
  this.engineTexture = LoaderHelper.get( 'engineTexture' );
  this.engineTexture.wrapT = THREE.RepeatWrapping;
  this.engineTexture.wrapS = THREE.RepeatWrapping;
  
  let material = new THREE.MeshBasicMaterial({
   color: 0x0099ff,
   opacity: 1,
   alphaMap: this.engineTexture,
   blending: THREE.AdditiveBlending,
   side: THREE.FrontSide,
   transparent: true,
   depthTest: true,
  });
  
  let cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 0, .4, 8, 32, 32, true ), material );
  cylinder.position.set( 0, .4, 307 );
  cylinder.rotation.x = Math.PI / 2;
  this.group.add( cylinder ); 
 }, 
 
 // update engine burn effect 
 updateEngine() {
  this.engineTexture.offset.y -= 0.06;
  this.engineTexture.needsUpdate = true;
 }, 
 
 // move ship on scroll 
 onScroll( e ) {
  let z = this.move.z; 
  let d = z + ( e.deltaY | 0 ); 
  d = ( d < -130 ) ? -130 : d;
  d = ( d > -30 ) ? -30 : d;
  this.move.z = d;
 }, 
 
 // add gun fire on click 
 onClick( e ) {
  let p = this.group.position; 
  
  let color = new THREE.Color();
  color.setHSL( Math.random(), 1, .5 );
  
  let geometry = new THREE.CylinderGeometry( .3, 0, 20, 10 );
  let material = new THREE.MeshBasicMaterial({
   color,
   opacity: .8,
   blending: THREE.AdditiveBlending,
   side: THREE.FrontSide,
   transparent: false,
   depthTest: true,
  });
  
  let cylinder = new THREE.Mesh( geometry, material );
  cylinder.position.set( p.x, p.y, p.z + 290 );
  cylinder.rotation.set( 11, 0, 0 );
  
  this.shots.push( cylinder ); 
  this.scene.add( cylinder ); 
  this.playGunSound( true ); 
 }, 
 
 // gun sound
 playGunSound( play ) {
  let audio = new Audio( this.gunSound );
  if ( play ) {
   audio.volume = 0.5;
   audio.play();
  }
 }, 
 
 // update gun shots 
 updateShots() {
  for ( let i = 0; i < this.shots.length; i++ ) {
   let cylinder = this.shots[ i ]; 
   
   if ( cylinder.position.z < -300 ) {
    this.shots.splice( i, 1 ); 
    this.scene.remove( cylinder ); 
    continue;
   }
   cylinder.position.z -= 6; 
  }
 }, 
 
 // update
 update( mouse ) {
  this.move.x =  ( mouse.x * 0.05 );
  this.move.y = -( mouse.y * 0.04 ) - 4;
  this.look.z =  ( mouse.x * 0.0004 );
  
  this.updateShots();
  this.updateEngine();

  addEase( this.group.position, this.move, this.ease );
  addEase( this.group.rotation, this.look, this.ease );
 },
};


/**
 * Setup scene 
 */
const setupScene = () => {
 const scene = new THREE.Scene();

 // track mouse movement 
 let mouse = { 
  x: deviceInfo.screenCenterX(), 
  y: deviceInfo.screenCenterY(), 
 };  
 
 // setup renderer 
 const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true, precision: 'mediump' } );
 renderer.setSize( deviceInfo.screenWidth(), deviceInfo.screenHeight() );
 renderer.setPixelRatio( window.devicePixelRatio );
 renderer.setClearColor( 0x000000, 0 );
 renderer.sortObjects = true;
 renderer.domElement.setAttribute( 'id', 'stageElement' );
 document.body.appendChild( renderer.domElement );

 // setup camera 
 const camera = new THREE.PerspectiveCamera( 60, deviceInfo.screenRatio(), 0.1, 20000 );
 camera.position.set( 0, 0, 300 );
 camera.rotation.set( 0, 0, 0 );
 camera.lookAt( scene.position );
 
 // setup light source 
 const light = new THREE.PointLight( 0xffffff, 4, 1000 );
 light.position.set( 0, 200, -500 );
 light.castShadow = false;
 light.target = scene;
 light.color = commonColor;
 scene.add( light ); 
 
 // setup objects 
 starField.create( scene ); 
 mountains.create( scene ); 
 groundPlain.create( scene ); 
 gunShip.create( scene ); 
 
 // on page resize
 window.addEventListener( 'resize', e => {
  camera.aspect = deviceInfo.screenRatio(); 
  camera.updateProjectionMatrix();
  renderer.setSize( deviceInfo.screenWidth(), deviceInfo.screenHeight() );
 });
 
 // on mouse move 
 window.addEventListener( 'mousemove', e => {
  mouse.x = deviceInfo.mouseCenterX( e ); 
  mouse.y = deviceInfo.mouseCenterY( e ); 
 });

 // on mouse wheel
 window.addEventListener( 'wheel', e => {
  gunShip.onScroll( e ); 
 });
 
 // on mouse click
 window.addEventListener( 'click', e => {
  gunShip.onClick( e ); 
 });
 
 // autostart music 
 const isff = ( typeof InstallTrigger !== 'undefined' );
 if ( startMusic && isff ) musicHelper.play(); 
 
 // animation loop 
 const loop = () => {
  requestAnimationFrame( loop ); 
  
  // add random shooting stars 
  if ( Math.random() > 0.99 ) shootingStar.create( scene );
  
  // update light hue 
  if ( cycleColor ) {
   commonHue += 0.001; 
   if ( commonHue >= 1 ) commonHue = 0; 
   commonColor.setHSL( commonHue, .8, .5 );
  }
  // update objects 
  shootingStar.update( mouse );
  starField.update( mouse ); 
  mountains.update( mouse ); 
  groundPlain.update( mouse ); 
  gunShip.update( mouse ); 
  
  // render scene 
  renderer.render( scene, camera );
 };
 
 loop();
};

// init 
LoaderHelper.onReady( setupScene );
LoaderHelper.loadTexture( 'starTexture', 'images/star.png' ); 
LoaderHelper.loadTexture( 'mountainTexture', 'images/terrain2.jpg' ); 
LoaderHelper.loadTexture( 'engineTexture', 'images/water.jpg' ); 
LoaderHelper.loadGeometry( 'shipGeometry', 'models/SpaceFighter03/SpaceFighter03.obj' );