/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/canvas-confetti@1.8.0/dist/confetti.browser.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){!function t(e,a,n,r){var i=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o="function"==typeof Path2D&&"function"==typeof DOMMatrix;function l(){}function s(t){var n=a.exports.Promise,r=void 0!==n?n:e.Promise;return"function"==typeof r?new r(t):(t(l,l),null)}var c,h,f,u,d,m,g,b,p,M=(f=Math.floor(1e3/60),u={},d=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(c=function(t){var e=Math.random();return u[e]=requestAnimationFrame((function a(n){d===n||d+f-1<n?(d=n,delete u[e],t()):u[e]=requestAnimationFrame(a)})),e},h=function(t){u[t]&&cancelAnimationFrame(u[t])}):(c=function(t){return setTimeout(t,f)},h=function(t){return clearTimeout(t)}),{frame:c,cancel:h}),v=(b={},function(){if(m)return m;if(!n&&i){var e=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n");try{m=new Worker(URL.createObjectURL(new Blob([e])))}catch(t){return void 0!==typeof console&&"function"==typeof console.warn&&console.warn("🎊 Could not load worker",t),null}!function(t){function e(e,a){t.postMessage({options:e||{},callback:a})}t.init=function(e){var a=e.transferControlToOffscreen();t.postMessage({canvas:a},[a])},t.fire=function(a,n,r){if(g)return e(a,null),g;var i=Math.random().toString(36).slice(2);return g=s((function(n){function o(e){e.data.callback===i&&(delete b[i],t.removeEventListener("message",o),g=null,r(),n())}t.addEventListener("message",o),e(a,i),b[i]=o.bind(null,{data:{callback:i}})}))},t.reset=function(){for(var e in t.postMessage({reset:!0}),b)b[e](),delete b[e]}}(m)}return m}),y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function w(t,e,a){return function(t,e){return e?e(t):t}(t&&null!=t[e]?t[e]:y[e],a)}function x(t){return t<0?0:Math.floor(t)}function C(t){return parseInt(t,16)}function I(t){return t.map(P)}function P(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:C(e.substring(0,2)),g:C(e.substring(2,4)),b:C(e.substring(4,6))}}function T(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function E(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function S(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var a=e.tick++/e.totalTicks,n=e.x+e.random*e.tiltCos,r=e.y+e.random*e.tiltSin,i=e.wobbleX+e.random*e.tiltCos,l=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-a)+")",t.beginPath(),o&&"path"===e.shape.type&&"string"==typeof e.shape.path&&Array.isArray(e.shape.matrix))t.fill(function(t,e,a,n,r,i,o){var l=new Path2D(t),s=new Path2D;s.addPath(l,new DOMMatrix(e));var c=new Path2D;return c.addPath(s,new DOMMatrix([Math.cos(o)*r,Math.sin(o)*r,-Math.sin(o)*i,Math.cos(o)*i,a,n])),c}(e.shape.path,e.shape.matrix,e.x,e.y,.1*Math.abs(i-n),.1*Math.abs(l-r),Math.PI/10*e.wobble));else if("circle"===e.shape)t.ellipse?t.ellipse(e.x,e.y,Math.abs(i-n)*e.ovalScalar,Math.abs(l-r)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):function(t,e,a,n,r,i,o,l,s){t.save(),t.translate(e,a),t.rotate(i),t.scale(n,r),t.arc(0,0,1,o,l,s),t.restore()}(t,e.x,e.y,Math.abs(i-n)*e.ovalScalar,Math.abs(l-r)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if("star"===e.shape)for(var s=Math.PI/2*3,c=4*e.scalar,h=8*e.scalar,f=e.x,u=e.y,d=5,m=Math.PI/d;d--;)f=e.x+Math.cos(s)*h,u=e.y+Math.sin(s)*h,t.lineTo(f,u),s+=m,f=e.x+Math.cos(s)*c,u=e.y+Math.sin(s)*c,t.lineTo(f,u),s+=m;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(r)),t.lineTo(Math.floor(i),Math.floor(l)),t.lineTo(Math.floor(n),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}function k(t,a){var o,l=!t,c=!!w(a||{},"resize"),h=!1,f=w(a,"disableForReducedMotion",Boolean),u=i&&!!w(a||{},"useWorker")?v():null,d=l?T:E,m=!(!t||!u)&&!!t.__confetti_initialized,g="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function b(e,a,i){for(var l,c,h,f,u,m=w(e,"particleCount",x),g=w(e,"angle",Number),b=w(e,"spread",Number),p=w(e,"startVelocity",Number),v=w(e,"decay",Number),y=w(e,"gravity",Number),C=w(e,"drift",Number),P=w(e,"colors",I),T=w(e,"ticks",Number),E=w(e,"shapes"),k=w(e,"scalar"),F=!!w(e,"flat"),N=function(t){var e=w(t,"origin",Object);return e.x=w(e,"x",Number),e.y=w(e,"y",Number),e}(e),O=m,z=[],R=t.width*N.x,D=t.height*N.y;O--;)z.push((l={x:R,y:D,angle:g,spread:b,startVelocity:p,color:P[O%P.length],shape:E[(f=0,u=E.length,Math.floor(Math.random()*(u-f))+f)],ticks:T,decay:v,gravity:y,drift:C,scalar:k,flat:F},c=void 0,h=void 0,c=l.angle*(Math.PI/180),h=l.spread*(Math.PI/180),{x:l.x,y:l.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*l.startVelocity+Math.random()*l.startVelocity,angle2D:-c+(.5*h-Math.random()*h),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:l.color,shape:l.shape,tick:0,totalTicks:l.ticks,decay:l.decay,drift:l.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*l.gravity,ovalScalar:.6,scalar:l.scalar,flat:l.flat}));return o?o.addFettis(z):(o=function(t,e,a,i,o){var l,c,h=e.slice(),f=t.getContext("2d"),u=s((function(e){function s(){l=c=null,f.clearRect(0,0,i.width,i.height),o(),e()}l=M.frame((function e(){!n||i.width===r.width&&i.height===r.height||(i.width=t.width=r.width,i.height=t.height=r.height),i.width||i.height||(a(t),i.width=t.width,i.height=t.height),f.clearRect(0,0,i.width,i.height),(h=h.filter((function(t){return S(f,t)}))).length?l=M.frame(e):s()})),c=s}));return{addFettis:function(t){return h=h.concat(t),u},canvas:t,promise:u,reset:function(){l&&M.cancel(l),c&&c()}}}(t,z,d,a,i),o.promise)}function p(a){var n=f||w(a,"disableForReducedMotion",Boolean),r=w(a,"zIndex",Number);if(n&&g)return s((function(t){t()}));l&&o?t=o.canvas:l&&!t&&(t=function(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}(r),document.body.appendChild(t)),c&&!m&&d(t);var i={width:t.width,height:t.height};function p(){if(u){var e={getBoundingClientRect:function(){if(!l)return t.getBoundingClientRect()}};return d(e),void u.postMessage({resize:{width:e.width,height:e.height}})}i.width=i.height=null}function M(){o=null,c&&(h=!1,e.removeEventListener("resize",p)),l&&t&&(document.body.removeChild(t),t=null,m=!1)}return u&&!m&&u.init(t),m=!0,u&&(t.__confetti_initialized=!0),c&&!h&&(h=!0,e.addEventListener("resize",p,!1)),u?u.fire(a,i,M):b(a,i,M)}return p.reset=function(){u&&u.reset(),o&&o.reset()},p}function F(){return p||(p=k(null,{useWorker:!0,resize:!0})),p}a.exports=function(){return F().apply(this,arguments)},a.exports.reset=function(){F().reset()},a.exports.create=k,a.exports.shapeFromPath=function(t){if(!o)throw new Error("path confetti are not supported in this browser");var e,a;"string"==typeof t?e=t:(e=t.path,a=t.matrix);var n=new Path2D(e),r=document.createElement("canvas").getContext("2d");if(!a){for(var i,l,s=1e3,c=s,h=s,f=0,u=0,d=0;d<s;d+=2)for(var m=0;m<s;m+=2)r.isPointInPath(n,d,m,"nonzero")&&(c=Math.min(c,d),h=Math.min(h,m),f=Math.max(f,d),u=Math.max(u,m));i=f-c,l=u-h;var g=Math.min(10/i,10/l);a=[g,0,0,g,-Math.round(i/2+c)*g,-Math.round(l/2+h)*g]}return{type:"path",path:e,matrix:a}}}(function(){return void 0!==t?t:"undefined"!=typeof self?self:this||{}}(),e,!1),t.confetti=e.exports}(window,{});