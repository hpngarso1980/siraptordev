(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/smooth-dnd/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/smooth-dnd/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?t(exports):undefined}(this,function(e){"use strict";var l,t,r="smooth-dnd-container-instance",f="smooth-dnd-draggable-wrapper",o="animated",p="__smooth_dnd_draggable_translation_value",u="__smooth_dnd_draggable_visibility_value",v="smooth-dnd-ghost",g="smooth-dnd-container",d="smooth-dnd-extra-size-for-insertion",h="smooth-dnd-stretcher-element",y="smooth-dnd-stretcher-instance",s="smooth-dnd-disable-touch-action",c="smooth-dnd-no-user-select",i="smooth-dnd-prevent-auto-scroll-class",b="smooth-dnd-drop-preview-default-class",w="smooth-dnd-drop-preview-inner-class",x="smooth-dnd-drop-preview-constant-class",E="smooth-dnd-drop-preview-flex-container-class",n=Object.freeze({containerInstance:r,defaultGroupName:"@@smooth-dnd-default-group@@",wrapperClass:f,defaultGrabHandleClass:"smooth-dnd-default-grap-handle",animationClass:o,translationValue:p,visibilityValue:u,ghostClass:v,containerClass:g,extraSizeForInsertion:d,stretcherElementClass:h,stretcherElementInstance:y,isDraggableDetached:"smoth-dnd-is-draggable-detached",disbaleTouchActions:s,noUserSelectClass:c,preventAutoScrollClass:i,dropPlaceholderDefaultClass:b,dropPlaceholderInnerClass:w,dropPlaceholderWrapperClass:x,dropPlaceholderFlexContainerClass:E}),C={groupName:void 0,behaviour:"move",orientation:"vertical",getChildPayload:void 0,animationDuration:250,autoScrollEnabled:!0,shouldAcceptDrop:void 0,shouldAnimateDrop:void 0};function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(t=l||(l={})).x="x",t.y="y",t.xy="xy";function S(e,t,n){return"x"===n?{left:Math.max(e.left,t.left),top:e.top,right:Math.min(e.right,t.right),bottom:e.bottom}:{left:e.left,top:Math.max(e.top,t.top),right:e.right,bottom:Math.min(e.bottom,t.bottom)}}function O(e){var t=window.getComputedStyle(e),n=t.overflow;if("auto"===n||"scroll"===n)return l.xy;var o=t["overflow-x"],r="auto"===o||"scroll"===o,i=t["overflow-y"],a="auto"===i||"scroll"===i;return r&&a?l.xy:r?l.x:a?l.y:null}function R(e,t){var n=window.getComputedStyle(e),o=n.overflow,r=n["overflow-".concat(t)];return"auto"===o||"scroll"===o||("auto"===r||"scroll"===r)}var A=function(e,t){return{left:Math.max(e.left,t.left),top:Math.max(e.top,t.top),right:Math.min(e.right,t.right),bottom:Math.min(e.bottom,t.bottom)}},I=function(e){var t=e.getBoundingClientRect(),n={left:t.left,right:t.right,top:t.top,bottom:t.bottom};if(P(e,"x")&&!B(e,"x")){var o=n.right-n.left;n.right=n.right+e.scrollWidth-o}if(P(e,"y")&&!B(e,"y")){var r=n.bottom-n.top;n.bottom=n.bottom+e.scrollHeight-r}return n},B=function(e,t){var n=window.getComputedStyle(e),o=n.overflow,r=n["overflow-".concat(t)];return"auto"===o||"scroll"===o||"hidden"===o||("auto"===r||"scroll"===r||"hidden"===r)},P=function(e,t){return"x"===t?e.scrollWidth>e.clientWidth:e.scrollHeight>e.clientHeight},T=function(e,t){var n=e,o=t||I(e);for(n=e.parentElement;n;)P(n,"x")&&B(n,"x")&&(o=S(o,n.getBoundingClientRect(),"x")),P(n,"y")&&B(n,"y")&&(o=S(o,n.getBoundingClientRect(),"y")),n=n.parentElement;return o},z=function(e,n){for(var o=e;o;){if(o[r]){var t=function(){var t=o[r];if(n.some(function(e){return e===t}))return{v:t}}();if("object"===a(t))return t.v}o=o.parentElement}return null},N=function(e,t){for(var n=e;n;){if(n.matches(t))return n;n=n.parentElement}return null},L=function(e,t){return-1<e.className.split(" ").map(function(e){return e}).indexOf(t)},M=function(e,t){if(e){var n=e.className.split(" ").filter(function(e){return e});-1===n.indexOf(t)&&(n.unshift(t),e.className=n.join(" "))}},j=function(e,t){if(e){var n=e.className.split(" ").filter(function(e){return e&&e!==t});e.className=n.join(" ")}},_=function(e,t){return e.removeChild(e.children[t])},F=function(e,t,n){n>=e.children.length?e.appendChild(t):e.insertBefore(t,e.children[n])},V=function(){window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():window.document.selection&&window.document.selection.empty()},X=function(e){if(e){var t=window.getComputedStyle(e);if(t)return t.cursor}return null};function H(e){return!(e.bottom<=e.top||e.right<=e.left)}function Y(e){var s=e.element,c=e.draggables;return function(e,t){var n=e,o=n.removedIndex,r=n.addedIndex,i=n.droppedElement,a=null;if(null!==o&&(a=_(s,o),c.splice(o,1)),null!==r){var l=window.document.createElement("div");l.className="".concat(f),l.appendChild(a&&a.firstElementChild?a.firstElementChild:i),F(s,l,r),r>=c.length?c.push(l):c.splice(r,0,l)}t&&t(e)}}var k=Object.freeze({domDropHandler:Y,reactDropHandler:function(){return{handler:function(){return function(e,t){t&&t(e)}}}}}),G={size:"offsetWidth",distanceToParent:"offsetLeft",translate:"transform",begin:"left",end:"right",dragPosition:"x",scrollSize:"scrollWidth",offsetSize:"offsetWidth",scrollValue:"scrollLeft",scale:"scaleX",setSize:"width",setters:{translate:function(e){return"translate3d(".concat(e,"px, 0, 0)")}}},W={size:"offsetHeight",distanceToParent:"offsetTop",translate:"transform",begin:"top",end:"bottom",dragPosition:"y",scrollSize:"scrollHeight",offsetSize:"offsetHeight",scrollValue:"scrollTop",scale:"scaleY",setSize:"height",setters:{translate:function(e){return"translate3d(0,".concat(e,"px, 0)")}}};function q(n,s,e){n[d]=0;var o=function(o){return{get:function(e,t){return e[o[t]||t]},set:function(e,t,n){e[o[t]]=o.setters[t]?o.setters[t](n):n}}}("horizontal"===s?G:W),c={translation:0};function t(){r(n),function(e){var t=e.getBoundingClientRect();c.scaleX=e.offsetWidth?(t.right-t.left)/e.offsetWidth:1,c.scaleY=e.offsetHeight?(t.bottom-t.top)/e.offsetHeight:1}(n)}function r(e){c.rect=I(e);var t=T(e,c.rect);H(t)&&(c.lastVisibleRect=c.visibleRect),c.visibleRect=t}function i(e){var t=e;if(t.tagName){var n=t.getBoundingClientRect();return"vertical"===s?n.bottom-n.top:n.right-n.left}return o.get(e,"size")*o.get(c,"scale")}function a(e){return o.get(e,"dragPosition")}return window.addEventListener("resize",function(){r(n)}),setTimeout(function(){t()},10),{getSize:i,getContainerRectangles:function(){return{rect:c.rect,visibleRect:c.visibleRect,lastVisibleRect:c.lastVisibleRect}},getBeginEndOfDOMRect:function(e){return{begin:o.get(e,"begin"),end:o.get(e,"end")}},getBeginEndOfContainer:function(){return{begin:o.get(c.rect,"begin")+c.translation,end:o.get(c.rect,"end")+c.translation}},getBeginEndOfContainerVisibleRect:function(){return{begin:o.get(c.visibleRect,"begin")+c.translation,end:o.get(c.visibleRect,"end")+c.translation}},getBeginEnd:function(e){var t=function(e){return(o.get(e,"distanceToParent")+(e[p]||0))*o.get(c,"scale")}(e)+(o.get(c.rect,"begin")+c.translation)-o.get(n,"scrollValue");return{begin:t,end:t+i(e)*o.get(c,"scale")}},getAxisValue:a,setTranslation:function(e,t){t?o.set(e.style,"translate",t):e.style.removeProperty("transform"),e[p]=t},getTranslation:function(e){return e[p]},setVisibility:function(e,t){void 0!==e[u]&&e[u]===t||(t?e.style.removeProperty("visibility"):e.style.visibility="hidden",e[u]=t)},isVisible:function(e){return void 0===e[u]||e[u]},isInVisibleRect:function(e,t){var n=c.visibleRect,o=n.left,r=n.top,i=n.right,a=n.bottom;a-r<2&&(a=r+30);var l=c.rect;return"vertical"===s?e>l.left&&e<l.right&&r<t&&t<a:o<e&&e<i&&t>l.top&&t<l.bottom},setSize:function(e,t){o.set(e,"setSize",t)},getTopLeftOfElementBegin:function(e){var t=0;return{top:"horizontal"===s?(t=e,c.rect.top):(t=c.rect.left,e),left:t}},getScrollSize:function(e){return o.get(e,"scrollSize")},getScrollValue:function(e){return o.get(e,"scrollValue")},setScrollValue:function(e,t){return o.set(e,"scrollValue",t)},invalidate:t,invalidateRects:function(){r(n)},getPosition:function(e){return a(e)},setBegin:function(e,t){o.set(e,"begin",t)}}}function U(e,t,n){var o,r,i,a=n.left,l=n.right,s=n.top,c=n.bottom,u=e.x,d=e.y;if(u<a||l<u||d<s||c<d)return null;i="x"===t?(o=a,r=l,u):(o=s,r=c,d);var f=r-o,g=400<f?100:f/4;return r-i<g?{direction:"end",speedFactor:(g-(r-i))/g}:i-o<g?{direction:"begin",speedFactor:(g-(i-o))/g}:null}function J(l){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"y",c=null,u=null,d=null,f=null;return{animate:function(e,t){d=e,f=t,function a(){null===c&&(c=requestAnimationFrame(function(e){null===u&&(u=e);var t=e-u;u=e;var n,o,r,i=t/1e3*f;o=s,r=i="begin"===d?0-i:i,(n=l)&&(n!==window?"x"===o?n.scrollLeft+=r:n.scrollTop+=r:"x"===o?n.scrollBy(r,0):n.scrollBy(0,r)),c=null,a()}))}()},stop:function(){null!==c&&(cancelAnimationFrame(c),c=null),u=null}}}function K(e){return function(){return T(e,e.getBoundingClientRect())}}var Q,Z,$,ee=function(e){var u=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1500,r=e.reduce(function(e,t){var n=function(e){for(var t=[],n=e.element;n;){var o=O(n);if(o&&!L(n,i)){var r={};switch(o){case l.xy:r.x={animator:J(n,"x")},r.y={animator:J(n,"y")};break;case l.x:r.x={animator:J(n,"x")};break;case l.y:r.y={animator:J(n,"y")}}t.push({axisAnimations:r,getRect:K(n),scrollerElement:n})}n=n.parentElement}return t}(t).filter(function(t){return!e.find(function(e){return e.scrollerElement===t.scrollerElement})});return[].concat(D(e),D(n))},[]);return function(e){var t=e.draggableInfo;if(e.reset)r.forEach(function(e){e.axisAnimations.x&&e.axisAnimations.x.animator.stop(),e.axisAnimations.y&&e.axisAnimations.y.animator.stop()});else if(t){!function(e,o){e.forEach(function(e){var t=e.axisAnimations,n=(0,e.getRect)();t.x&&(t.x.scrollParams=U(o,"x",n),e.cachedRect=n),t.y&&(t.y.scrollParams=U(o,"y",n),e.cachedRect=n)})}(r,t.mousePosition),r.forEach(function(e){var t=e.axisAnimations,n=t.x,o=t.y;if(n)if(n.scrollParams){var r=n.scrollParams,i=r.direction,a=r.speedFactor;n.animator.animate(i,a*u)}else n.animator.stop();if(o)if(o.scrollParams){var l=o.scrollParams,s=l.direction,c=l.speedFactor;o.animator.animate(s,c*u)}else o.animator.stop()});var n=r.filter(function(e){return e.cachedRect});if(n.length&&1<n.length){var o=function(e,t){for(var n=document.elementFromPoint(t.x,t.y);n;){var o=e.find(function(e){return e.scrollerElement===n});if(o)return o;n=n.parentElement}return null}(n,t.mousePosition);o&&n.forEach(function(e){e!==o&&(e.axisAnimations.x&&e.axisAnimations.x.animator.stop(),e.axisAnimations.y&&e.axisAnimations.y.animator.stop())})}}}};"undefined"!=typeof window&&((Q=Element)&&Q.prototype&&!Q.prototype.matches&&(Q.prototype.matches=Q.prototype.matchesSelector||Q.prototype.mozMatchesSelector||Q.prototype.msMatchesSelector||Q.prototype.oMatchesSelector||Q.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;0<=--n&&t.item(n)!==this;);return-1<n}),(Z=Node||Element)&&Z.prototype&&null==Z.prototype.firstElementChild&&Object.defineProperty(Z.prototype,"firstElementChild",{get:function(){for(var e,t=this.childNodes,n=0;e=t[n++];)if(1===e.nodeType)return e;return null}}),Array.prototype.some||(Array.prototype.some=function(e){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof e)throw new TypeError;for(var t=Object(this),n=t.length>>>0,o=2<=arguments.length?arguments[1]:void 0,r=0;r<n;r++)if(r in t&&e.call(o,t[r],r,t))return!0;return!1}));var te={overflow:"hidden",display:"block"},ne={height:"100%",display:"table-cell","vertical-align":"top"},oe=(m($={},".".concat(g),{position:"relative","min-height":"30px","min-width":"30px"}),m($,".".concat(g,".horizontal"),{display:"table"}),m($,".".concat(g,".horizontal > .").concat(h),{display:"inline-block"}),m($,".".concat(g,".horizontal > .").concat(f),ne),m($,".".concat(g,".vertical > .").concat(f),te),m($,".".concat(f),{"box-sizing":"border-box"}),m($,".".concat(f,".horizontal"),ne),m($,".".concat(f,".vertical"),te),m($,".".concat(f,".animated"),{transition:"transform ease"}),m($,".".concat(v),{"box-sizing":"border-box"}),m($,".".concat(v,".animated"),{transition:"all ease-in-out"}),m($,".".concat(v," *"),{"pointer-events":"none"}),m($,".".concat(s," *"),{"touch-action":"none","-ms-touch-action":"none"}),m($,".".concat(c),{"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"}),m($,".".concat(w),{flex:"1"}),m($,".".concat(g,".horizontal > .").concat(x),{height:"100%",overflow:"hidden",display:"table-cell","vertical-align":"top"}),m($,".".concat(g,".vertical > .").concat(x),{overflow:"hidden",display:"block",width:"100%"}),m($,".".concat(E),{width:"100%",height:"100%",display:"flex","justify-content":"stretch","align-items":"stretch"}),m($,".".concat(b),{"background-color":"rgba(150, 150, 150, 0.1)",border:"1px solid #ccc"}),$);function re(o){return Object.keys(o).reduce(function(e,t){var n=o[t];return"object"===a(n)?"".concat(e).concat(t,"{").concat(re(n),"}"):"".concat(e).concat(t,":").concat(n,";")},"")}function ie(e){if(e&&"undefined"!=typeof window){var t=window.document.head||window.document.getElementsByTagName("head")[0],n=window.document.createElement("style"),o=re({"body *":{cursor:"".concat(e," !important")}});return n.type="text/css",n.styleSheet?n.styleSheet.cssText=o:n.appendChild(window.document.createTextNode(o)),t.appendChild(n),n}return null}var ae,le,se=["mousedown","touchstart"],ce=["mousemove","touchmove"],ue=["mouseup","touchend"],de=null,fe=null,ge=null,me=null,pe=[],ve=!1,he=!1,ye=!1,be=!1,we=null,xe=null,Ee=null,Ce=null,De=(ae=null,le=!1,{start:function(){le||(le=!0,function e(){ae=requestAnimationFrame(function(){de.forEach(function(e){return e.layout.invalidateRects()}),setTimeout(function(){null!==ae&&e()},50)})}())},stop:function(){null!==ae&&(cancelAnimationFrame(ae),ae=null),le=!1}}),Se="undefined"!=typeof window&&!!(window.navigator.userAgent.match(/Android/i)||window.navigator.userAgent.match(/webOS/i)||window.navigator.userAgent.match(/iPhone/i)||window.navigator.userAgent.match(/iPad/i)||window.navigator.userAgent.match(/iPod/i)||window.navigator.userAgent.match(/BlackBerry/i)||window.navigator.userAgent.match(/Windows Phone/i));function Oe(){"undefined"!=typeof window&&se.forEach(function(e){window.document.addEventListener(e,Ve,{passive:!1})})}function Re(){return me&&me.ghostParent?me.ghostParent:fe&&fe.parentElement||window.document.body}var Ae,Ie,Be,Pe,Te,ze,Ne=(Pe=null,Te=1,ze=5,function(e,t,n){Ae=Je(e),Be=n,(Ie="number"==typeof t?t:Se?200:0)&&(Pe=setTimeout(Fe,Ie)),ce.forEach(function(e){return window.document.addEventListener(e,Le)},{passive:!1}),ue.forEach(function(e){return window.document.addEventListener(e,Me)},{passive:!1}),window.document.addEventListener("drag",je,{passive:!1})});function Le(e){var t=Je(e),n=t.clientX,o=t.clientY;if(Ie)(Math.abs(Ae.clientX-n)>ze||Math.abs(Ae.clientY-o)>ze)&&_e();else if(Math.abs(Ae.clientX-n)>Te||Math.abs(Ae.clientY-o)>Te)return Fe()}function Me(){_e()}function je(){_e()}function _e(){clearTimeout(Pe),ce.forEach(function(e){return window.document.removeEventListener(e,Le)},{passive:!1}),ue.forEach(function(e){return window.document.removeEventListener(e,Me)},{passive:!1}),window.document.removeEventListener("drag",je,{passive:!1})}function Fe(){clearTimeout(Pe),_e(),Be()}function Ve(e){var t=Je(e);if(!ve&&(void 0===t.button||0===t.button)&&(fe=N(t.target,"."+f))){var n=N(fe,"."+g),o=pe.filter(function(e){return e.element===n})[0],r=o.getOptions().dragHandleSelector,i=o.getOptions().nonDragAreaSelector,a=!0;if(r&&!N(t.target,r)&&(a=!1),i&&N(t.target,i)&&(a=!1),a){o.layout.invalidate(),M(window.document.body,s),M(window.document.body,c);window.document.addEventListener("mouseup",function e(){j(window.document.body,s),j(window.document.body,c),window.document.removeEventListener("mouseup",e)})}a&&Ne(t,o.getOptions().dragBeginDelay,function(){V(),et(t,X(e.target)),ce.forEach(function(e){window.document.addEventListener(e,Xe,{passive:!1})}),ue.forEach(function(e){window.document.addEventListener(e,Ue,{passive:!1})})})}}function Xe(e){e.preventDefault();var t=Je(e);if(me){var n=me.container.getOptions();"contain"===n.behaviour?function(e){var t,n,o,r,i=e.clientX,a=e.clientY,l=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"vertical",s=me.container.layout.getBeginEndOfContainerVisibleRect();r="vertical"===l?(t=a,n="y",o="top",me.size.offsetHeight):(t=i,n="x",o="left",me.size.offsetWidth);var c=s.begin,u=s.end-r,d=Math.max(c,Math.min(u,t+ge.positionDelta[o]));ge.topLeft[n]=d,me.position[n]=Math.max(s.begin,Math.min(s.end,t+ge.centerDelta[n])),me.mousePosition[n]=Math.max(s.begin,Math.min(s.end,t)),me.position[n]<s.begin+r/2&&(me.position[n]=s.begin+2),me.position[n]>s.end-r/2&&(me.position[n]=s.end-2)}(t,n.orientation):Ee?"y"===Ee?(ge.topLeft.y=t.clientY+ge.positionDelta.top,me.position.y=t.clientY+ge.centerDelta.y,me.mousePosition.y=t.clientY):"x"===Ee&&(ge.topLeft.x=t.clientX+ge.positionDelta.left,me.position.x=t.clientX+ge.centerDelta.x,me.mousePosition.x=t.clientX):(ge.topLeft.x=t.clientX+ge.positionDelta.left,ge.topLeft.y=t.clientY+ge.positionDelta.top,me.position.x=t.clientX+ge.centerDelta.x,me.position.y=t.clientY+ge.centerDelta.y,me.mousePosition.x=t.clientX,me.mousePosition.y=t.clientY),nt(),(be=!we(me))&&We()}else et(t,X(e.target))}var He,Ye,ke,Ge,We=(He=qe,ke=!(Ye=20),Ge=null,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Ge&&clearTimeout(Ge),ke&&!Ge?He.call.apply(He,[null].concat(t)):Ge=setTimeout(function(){Ge=null,He.call.apply(He,[null].concat(t))},Ye)});function qe(){be&&(be=!1,Ke(me,de))}function Ue(){ce.forEach(function(e){window.document.removeEventListener(e,Xe,{passive:!1})}),ue.forEach(function(e){window.document.removeEventListener(e,Ue,{passive:!1})}),xe({reset:!0}),Ce&&(function(e){e&&"undefined"!=typeof window&&(window.document.head||window.document.getElementsByTagName("head")[0]).removeChild(e)}(Ce),Ce=null),me&&(De.stop(),qe(),ye=!0,function(e){function i(){j(ge.ghost,"animated"),ge.ghost.style.transitionDuration=null,Re().removeChild(ge.ghost),e()}function t(e,t,n){var o=e.top,r=e.left;M(ge.ghost,"animated"),n&&M(ge.ghost.firstElementChild,n),ge.topLeft.x=r,ge.topLeft.y=o,nt(t),setTimeout(function(){i()},t+20)}function n(e,t){M(ge.ghost,"animated"),nt(e,.9,!0),setTimeout(function(){t()},e+20)}if(me.targetElement){var o=pe.filter(function(e){return e.element===me.targetElement})[0];if(!(p=o.getOptions()).shouldAnimateDrop||p.shouldAnimateDrop(me.container.getOptions(),me.payload))t(o.getDragResult().shadowBeginEnd.rect,Math.max(150,o.getOptions().animationDuration/2),o.getOptions().dropClass);else i()}else{var r=pe.filter(function(e){return e===me.container})[0];if(r){var a=r.getOptions(),l=a.behaviour,s=a.removeOnDropOut;if("move"!==l&&"contain"!==l||!he&&s||!r.getDragResult())n(r.getOptions().animationDuration,i);else{var c=r.layout.getContainerRectangles();if(!H(c.visibleRect)&&H(c.lastVisibleRect))t({top:c.lastVisibleRect.top,left:c.lastVisibleRect.left},r.getOptions().animationDuration,r.getOptions().dropClass);else{var u=r.getDragResult(),d=u.removedIndex,f=u.elementSize,g=r.layout;r.getTranslateCalculator({dragResult:{removedIndex:d,addedIndex:d,elementSize:f,pos:void 0,shadowBeginEnd:void 0}});var m=0<d?g.getBeginEnd(r.draggables[d-1]).end:g.getBeginEndOfContainer().begin;t(g.getTopLeftOfElementBegin(m),r.getOptions().animationDuration,r.getOptions().dropClass)}}}else n(C.animationDuration,i)}var p}(function(){$e(ve=!1);for(var e=de||[],t=e.shift();void 0!==t;)t.handleDrop(me),t=e.shift();we=Ee=me=ge=fe=de=null,ye=!1}))}function Je(e){return e.touches?e.touches[0]:e}function Ke(n,e){var o=!1;e.forEach(function(e){var t=e.handleDrag(n);o=!!t.containerBoxChanged||!1,t.containerBoxChanged=!1}),o&&(o=!1,requestAnimationFrame(function(){pe.forEach(function(e){e.layout.invalidateRects(),e.onTranslated()})}))}function Qe(e){var t=e,n=null;return function(e){return!(null!==n||!ve||ye)&&(n=requestAnimationFrame(function(){ve&&!ye&&(Ke(e,t),xe({draggableInfo:e})),n=null}),!0)}}function Ze(e,t){return e.getOptions().autoScrollEnabled?ee(t,e.getScrollMaxSpeed()):function(e){return null}}function $e(o){pe.forEach(function(e){var t=o?e.getOptions().onDragStart:e.getOptions().onDragEnd;if(t){var n={isSource:e===me.container,payload:me.payload};e.isDragRelevant(me.container,me.payload)?n.willAcceptDrop=!0:n.willAcceptDrop=!1,t(n)}})}function et(e,t){if(null!==fe){ve=!0;var n=pe.filter(function(e){return fe.parentElement===e.element})[0];n.setDraggables(),Ee=n.getOptions().lockAxis?n.getOptions().lockAxis.toLowerCase():null,me=function(t){var e=pe.filter(function(e){return t.parentElement===e.element})[0],n=e.draggables.indexOf(t),o=e.getOptions().getGhostParent,r=t.getBoundingClientRect();return{container:e,element:t,size:{offsetHeight:r.bottom-r.top,offsetWidth:r.right-r.left},elementIndex:n,payload:e.getOptions().getChildPayload?e.getOptions().getChildPayload(n):void 0,targetElement:null,position:{x:0,y:0},groupName:e.getOptions().groupName,ghostParent:o?o():null,invalidateShadow:null,mousePosition:null,relevantContainers:null}}(fe),ge=function(e,t,n,o){var r=t.x,i=t.y,a=e.getBoundingClientRect(),l=a.left,s=a.top,c=a.right,u=a.bottom,d=A(n.layout.getContainerRectangles().visibleRect,a),f=d.left+(d.right-d.left)/2,g=d.top+(d.bottom-d.top)/2,m=e.cloneNode(!0);return m.style.zIndex="1000",m.style.boxSizing="border-box",m.style.position="fixed",m.style.top="0px",m.style.left="0px",m.style.transform=null,m.style.removeProperty("transform"),n.shouldUseTransformForGhost()?m.style.transform="translate3d(".concat(l,"px, ").concat(s,"px, 0)"):(m.style.top="".concat(s,"px"),m.style.left="".concat(l,"px")),m.style.width=c-l+"px",m.style.height=u-s+"px",m.style.overflow="visible",m.style.transition=null,m.style.removeProperty("transition"),m.style.pointerEvents="none",m.style.userSelect="none",n.getOptions().dragClass?setTimeout(function(){M(m.firstElementChild,n.getOptions().dragClass);var e=window.getComputedStyle(m.firstElementChild).cursor;Ce=ie(e)}):Ce=ie(o),M(m,n.getOptions().orientation||"vertical"),M(m,v),{ghost:m,centerDelta:{x:f-r,y:g-i},positionDelta:{left:l-r,top:s-i},topLeft:{x:l,y:s}}}(fe,{x:e.clientX,y:e.clientY},me.container,t),me.position={x:e.clientX+ge.centerDelta.x,y:e.clientY+ge.centerDelta.y},me.mousePosition={x:e.clientX,y:e.clientY},de=pe.filter(function(e){return e.isDragRelevant(n,me.payload)}),me.relevantContainers=de,we=Qe(de),xe&&xe({reset:!0,draggableInfo:void 0}),xe=Ze(n,de),de.forEach(function(e){return e.prepareDrag(e,de)}),$e(!0),we(me),Re().appendChild(ge.ghost),De.start()}}var tt=null;function nt(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],o=ge,r=o.ghost,i=o.topLeft,a=i.x,l=i.y,s=!me.container||me.container.shouldUseTransformForGhost(),c=s?"translate3d(".concat(a,"px,").concat(l,"px, 0)"):null;if(1!==t&&(c=c?"".concat(c," scale(").concat(t,")"):"scale(".concat(t,")")),0<e)return ge.ghost.style.transitionDuration=e+"ms",void requestAnimationFrame(function(){c&&(r.style.transform=c),s||(r.style.left=a+"px",r.style.top=l+"px"),tt=null,n&&(r.style.opacity="0")});null===tt&&(tt=requestAnimationFrame(function(){c&&(r.style.transform=c),s||(r.style.left=a+"px",r.style.top=l+"px"),tt=null,n&&(r.style.opacity="0")}))}function ot(){if(ve&&!he&&!ye){be=!(he=!0);var t=Object.assign({},me,{targetElement:null,position:{x:Number.MAX_SAFE_INTEGER,y:Number.MAX_SAFE_INTEGER},mousePosition:{x:Number.MAX_SAFE_INTEGER,y:Number.MAX_SAFE_INTEGER}});de.forEach(function(e){e.handleDrag(t)}),me.targetElement=null,me.cancelDrop=!0,Ue(),he=!1}}"undefined"!=typeof window&&function(){if("undefined"!=typeof window){var e=window.document.head||window.document.getElementsByTagName("head")[0],t=window.document.createElement("style");t.id="smooth-dnd-style-definitions";var n=re(oe);t.type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(window.document.createTextNode(n)),e.appendChild(t)}}();var rt=(Oe(),{register:function(e){!function(e){pe.push(e),ve&&me&&e.isDragRelevant(me.container,me.payload)&&(de.push(e),e.prepareDrag(e,de),xe&&xe({reset:!0,draggableInfo:void 0}),xe=Ze(e,de),we=Qe(de),e.handleDrag(me))}(e)},unregister:function(e){!function(e){if(pe.splice(pe.indexOf(e),1),ve&&me){me.container===e&&e.fireRemoveElement(),me.targetElement===e.element&&(me.targetElement=null);var t=de.indexOf(e);-1<t&&(de.splice(t,1),xe&&xe({reset:!0,draggableInfo:void 0}),xe=Ze(e,de),we=Qe(de))}}(e)},isDragging:function(){return ve},cancelDrag:ot});function it(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:C.animationDuration;t?(M(e,o),e.style.transitionDuration=n+"ms"):(j(e,o),e.style.removeProperty("transition-duration"))}function at(n){var o=[];return Array.prototype.forEach.call(n.children,function(e){if(e.nodeType===Node.ELEMENT_NODE){var t=e;L(e,f)||(t=function(e){if(It.wrapChild){var t=window.document.createElement("div");return t.className="".concat(f),e.parentElement.insertBefore(t,e),t.appendChild(e),t}return e}(e)),t[p]=0,o.push(t)}else n.removeChild(e)}),o}function lt(e){var g=e.layout;return function(e,t){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2];return function e(t,n,o,r){var i=4<arguments.length&&void 0!==arguments[4]&&arguments[4];if(r<o)return o;if(o===r){var a=g.getBeginEnd(t[o]),l=a.begin,s=a.end;return i?n<(s+l)/2?o:o+1:o}var c=Math.floor((r+o)/2),u=g.getBeginEnd(t[c]),d=u.begin,f=u.end;return n<d?e(t,n,o,c-1,i):f<n?e(t,n,c+1,r,i):i?n<(f+d)/2?c:c+1:c}(e,t,0,e.length-1,n)}}function st(e){var t=e.element,n=e.draggables,o=e.layout,a=e.getOptions,l=function(e){var t=e.element,n=e.draggables,o=e.layout;return function(){n.forEach(function(e){it(e,!1),o.setTranslation(e,0),o.setVisibility(e,!0)}),t[y]&&(t[y].parentNode.removeChild(t[y]),t[y]=null)}}({element:t,draggables:n,layout:o,getOptions:a}),s=(It.dropHandler||Y)({element:t,draggables:n,layout:o,getOptions:a});return function(e,t){var n=t.addedIndex,o=t.removedIndex,r=2<arguments.length&&void 0!==arguments[2]&&arguments[2];if(l(),!e.cancelDrop&&(e.targetElement||a().removeOnDropOut||r)){var i={removedIndex:o,addedIndex:null!==n?null!==o&&o<n?n-1:n:null,payload:e.payload};s(i,a().onDrop)}}}function ct(e){var o=e.element,r=e.getOptions,i=null;return function(e){var t=e.draggableInfo,n=i;return null==i&&t.container.element===o&&"copy"!==r().behaviour&&(n=i=t.elementIndex),{removedIndex:n}}}function ut(e){var n=e.draggables,o=e.layout;return function(e){var t=e.dragResult;null!==t.removedIndex&&o.setVisibility(n[t.removedIndex],!1)}}function dt(e){var r=e.element,i=e.layout;return function(e){var t=e.draggableInfo,n=document.elementFromPoint(t.position.x,t.position.y);if(n){var o=z(n,t.relevantContainers);if(o&&o.element===r)return{pos:i.getPosition(t.position)}}return{pos:null}}}function ft(e){var n=e.layout,o=null;return function(e){var t=e.draggableInfo;return null===e.dragResult.pos?o=null:{elementSize:o=o||n.getSize(t.size)}}}function gt(e){var o=e.element;return function(e){var t=e.draggableInfo,n=e.dragResult;!function(e,t){var n=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];t&&n?e.targetElement=t:e.targetElement===t&&(e.targetElement=null)}(t,o,!!n.pos)}}function mt(){return function(e){return null!==e.dragResult.pos?{addedIndex:0}:{addedIndex:null}}}function pt(e){var r=e.layout,i=null;return function(e){var t=e.dragResult.addedIndex;if(t===i)return null;i=t;var n=r.getBeginEndOfContainer(),o=n.begin;n.end;return{shadowBeginEnd:{rect:r.getTopLeftOfElementBegin(o)}}}}function vt(e){var g=e.layout,m=e.element,p=e.getOptions,v=null;return function(e){var t=e.dragResult,n=t.elementSize,o=t.shadowBeginEnd,r=t.addedIndex,i=t.dropPlaceholderContainer,a=p();if(a.dropPlaceholder){var l="boolean"==typeof a.dropPlaceholder?{}:a.dropPlaceholder,s=l.animationDuration,c=l.className,u=l.showOnTop;if(null===r)return i&&null!==v&&m.removeChild(i),v=null,{dropPlaceholderContainer:void 0};if(!i){var d=document.createElement("div"),f=document.createElement("div");f.className=E,d.className="".concat(w," ").concat(c||b),(i=document.createElement("div")).className="".concat(x),i.style.position="absolute",void 0!==s&&(i.style.transition="all ".concat(s,"ms ease")),i.appendChild(f),f.appendChild(d),g.setSize(i.style,n+"px"),i.style.pointerEvents="none",u?m.appendChild(i):m.insertBefore(i,m.firstElementChild)}return v!==r&&o.dropArea&&g.setBegin(i.style,o.dropArea.begin-g.getBeginEndOfContainer().begin+"px"),v=r,{dropPlaceholderContainer:i}}return null}}function ht(e){var o=Et(e);return function(e){var t=e.draggableInfo,n=e.dragResult;return t.invalidateShadow?o({draggableInfo:t,dragResult:n}):null}}function yt(e){var o=function(e){var i=e.draggables,a=lt({layout:e.layout});return function(e){var t=e.dragResult,n=t.shadowBeginEnd,o=t.pos;if(n)return n.begin+n.beginAdjustment<=o&&n.end>=o?null:o<n.begin+n.beginAdjustment?a(i,o):o>n.end?a(i,o)+1:i.length;var r=a(i,o,!0);return null!==r?r:i.length}}(e);return function(e){var t=e.dragResult,n=null;return null!==t.pos&&null===(n=o({dragResult:t}))&&(n=t.addedIndex),{addedIndex:n}}}function bt(){var r=null;return function(e){var t=e.dragResult,n=t.addedIndex,o=t.shadowBeginEnd;n!==r&&null!==r&&o&&(o.beginAdjustment=0),r=n}}function wt(e){var u=e.element,d=e.draggables,f=e.layout,g=e.getOptions,m=null;return function(e){var t=e.dragResult,n=t.addedIndex,o=t.removedIndex,r=t.elementSize;if(null===o)if(null!==n){if(!m){var i=f.getBeginEndOfContainer();i.end=i.begin+f.getSize(u);var a=f.getScrollSize(u)>f.getSize(u)?i.begin+f.getScrollSize(u)-f.getScrollValue(u):i.end,l=0<d.length?f.getBeginEnd(d[d.length-1]).end-d[d.length-1][p]:i.begin;if(a<l+r){(m=window.document.createElement("div")).className=h+" "+g().orientation;var s=0<d.length?r+l-a:r;return f.setSize(m.style,"".concat(s,"px")),u.appendChild(m),u[y]=m,{containerBoxChanged:!0}}}}else if(m){f.setTranslation(m,0);var c=m;return m=null,u.removeChild(c),{containerBoxChanged:!(u[y]=null)}}}}function xt(e){var s=e.draggables,c=e.layout,u=null,d=null;return function(e){var t=e.dragResult,n=t.addedIndex,o=t.removedIndex,r=t.elementSize;if(n!==u||o!==d){for(var i=0;i<s.length;i++)if(i!==o){var a=s[i],l=0;null!==o&&o<i&&(l-=r),null!==n&&n<=i&&(l+=r),c.setTranslation(a,l)}return{addedIndex:u=n,removedIndex:d=o}}}}function Et(e){var x=e.draggables,E=e.layout,C=null;return function(e){var t=e.draggableInfo,n=e.dragResult,o=n.addedIndex,r=n.removedIndex,i=n.elementSize,a=n.pos,l=n.shadowBeginEnd;if(null===a)return{shadowBeginEnd:C=null};if(null===o||!t.invalidateShadow&&o===C)return null;var s=o-1,c=Number.MIN_SAFE_INTEGER,u=0,d=0,f=null,g=null;if(s===r&&s--,-1<s){var m=E.getSize(x[s]);if(g=E.getBeginEnd(x[s]),i<m){var p=(m-i)/2;c=g.end-p}else c=g.end;u=g.end}else g={end:E.getBeginEndOfContainer().begin},u=E.getBeginEndOfContainer().begin;var v=Number.MAX_SAFE_INTEGER,h=o;if(h===r&&h++,h<x.length){var y=E.getSize(x[h]);if(f=E.getBeginEnd(x[h]),i<y){var b=(y-i)/2;v=f.begin+b}else v=f.begin;d=f.begin}else f={begin:E.getContainerRectangles().rect.end},d=E.getContainerRectangles().rect.end-E.getContainerRectangles().rect.begin;var w=g&&f?E.getTopLeftOfElementBegin(g.end):null;return C=o,{shadowBeginEnd:{dropArea:{begin:u,end:d},begin:c,end:v,rect:w,beginAdjustment:l?l.beginAdjustment:0}}}}function Ct(){var a=null;return function(e){var t=e.dragResult,n=t.pos,o=t.addedIndex,r=t.shadowBeginEnd;if(null!==n){if(null!=o&&null===a){if(n<r.begin){var i=n-r.begin-5;r.beginAdjustment=i}a=o}}else a=null}}function Dt(e){var t=e.getOptions,n=!1,o=t();return function(e){var t=!!e.dragResult.pos;t!==n&&((n=t)?o.onDragEnter&&o.onDragEnter():o.onDragLeave&&o.onDragLeave())}}function St(e){var t=e.getOptions,s=null,c=t();return function(e){var t=e.dragResult,n=t.addedIndex,o=t.removedIndex,r=e.draggableInfo,i=r.payload,a=r.element;if(c.onDropReady&&null!==n&&s!==n){var l=s=n;null!==o&&o<n&&l--,c.onDropReady({addedIndex:l,removedIndex:o,payload:i,element:a?a.firstElementChild:void 0})}}}function Ot(e){return"drop-zone"===e.getOptions().behaviour?Rt(e)(ct,ut,dt,ft,gt,mt,pt,Dt,St):Rt(e)(ct,ut,dt,ft,gt,ht,yt,bt,wt,xt,Et,vt,Ct,Dt,St)}function Rt(i){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=t.map(function(e){return e(i)}),r=null;return function(n){return r=o.reduce(function(e,t){return Object.assign(e,t({draggableInfo:n,dragResult:e}))},r||{addedIndex:null,removedIndex:null,elementSize:null,pos:null,shadowBeginEnd:null})}}}function At(d){return function(e){var n=Object.assign({},C,e),t=null,o=null,r=function(e,t){var n=at(e),o=t();return M(e,"".concat(g," ").concat(o.orientation)),{element:e,draggables:n,getOptions:t,layout:q(e,o.orientation,o.animationDuration)}}(d,u),i=Ot(r),a=st(r),l=function(t,n){var o=[];function e(){o&&(o.forEach(function(e){return e.removeEventListener("scroll",n)}),window.removeEventListener("scroll",n))}return function(){var e=t;for(;e;)(R(e,"x")||R(e,"y"))&&o.push(e),e=e.parentElement}(),{dispose:function(){e(),o=null},start:function(){o&&(o.forEach(function(e){return e.addEventListener("scroll",n)}),window.addEventListener("scroll",n))},stop:e}}(d,function(){r.layout.invalidateRects(),s()});function s(){null!==o&&(o.invalidateShadow=!0,t=i(o),o.invalidateShadow=!1)}function c(e,t){for(var n=at(t),o=0;o<n.length;o++)e[o]=n[o];for(var r=0;r<e.length-n.length;r++)e.pop()}function u(){return n}return{element:d,draggables:r.draggables,isDragRelevant:function(e){var r=e.element,i=e.getOptions;return function(e,t){var n=i();if(n.shouldAcceptDrop)return n.shouldAcceptDrop(e.getOptions(),t);var o=e.getOptions();return"copy"!==n.behaviour&&(N(r,"."+f)!==e.element&&(e.element===r||!(!o.groupName||o.groupName!==n.groupName)))}}(r),layout:r.layout,dispose:function(e){l.dispose(),function(t){It.wrapChild&&Array.prototype.forEach.call(t.children,function(e){e.nodeType===Node.ELEMENT_NODE&&L(e,f)&&(t.insertBefore(e.firstElementChild,e),t.removeChild(e))})}(e.element)},prepareDrag:function(e,t){var n=e.element,o=r.draggables;c(o,n),e.layout.invalidateRects(),o.forEach(function(e){return it(e,!0,u().animationDuration)}),l.start()},handleDrag:function(e){return t=i(o=e)},handleDrop:function(e){l.stop(),t&&t.dropPlaceholderContainer&&d.removeChild(t.dropPlaceholderContainer),o=null,i=Ot(r),a(e,t),t=null},fireRemoveElement:function(){a(o,Object.assign({},t,{addedIndex:null}),!0),t=null},getDragResult:function(){return t},getTranslateCalculator:function(e){return xt(r)(e)},onTranslated:function(){s()},setDraggables:function(){c(r.draggables,d)},getScrollMaxSpeed:function(){return It.maxScrollSpeed},shouldUseTransformForGhost:function(){return!0===It.useTransformForGhost},getOptions:u,setOptions:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];n=!1===t?Object.assign({},C,e):Object.assign({},C,n,e)}}}}var It=function(e,t){var n=At(e)(t);return e[r]=n,rt.register(n),{dispose:function(){rt.unregister(n),n.dispose(n)},setOptions:function(e,t){n.setOptions(e,t)}}};function Bt(e,t,n){Object.defineProperty(e,n,{set:function(e){t[n]=e},get:function(){return t[n]}})}It.wrapChild=!0,It.cancelDrag=function(){rt.cancelDrag()},It.isDragging=function(){return rt.isDragging()};function Pt(e,t){return console.warn('default export is deprecated. please use named export "smoothDnD"'),It(e,t)}Pt.cancelDrag=function(){It.cancelDrag()},Pt.isDragging=function(){return It.isDragging()},Bt(Pt,It,"useTransformForGhost"),Bt(Pt,It,"maxScrollSpeed"),Bt(Pt,It,"wrapChild"),Bt(Pt,It,"dropHandler"),e.smoothDnD=It,e.constants=n,e.dropHandlers=k,e.default=Pt,Object.defineProperty(e,"__esModule",{value:!0})});


/***/ }),

/***/ "./node_modules/vue-smooth-dnd/dist/vue-smooth-dnd.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/vue-smooth-dnd/dist/vue-smooth-dnd.esm.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return Draggable; });
/* harmony import */ var smooth_dnd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! smooth-dnd */ "./node_modules/smooth-dnd/dist/index.js");
/* harmony import */ var smooth_dnd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(smooth_dnd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in smooth_dnd__WEBPACK_IMPORTED_MODULE_0__) if(["Container","Draggable","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return smooth_dnd__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/**
 * Bundle of: vue-smooth-dnd
 * Generated: 2019-10-26
 * Version: 0.8.1
 */




var isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

function getTagProps (ctx, tagClasses) {
  var tag = ctx.$props.tag;
  if (tag) {
    if (typeof tag === 'string') {
      var result = { value: tag };
      if (tagClasses) {
        result.props = { class: tagClasses };
      }
      return result;
    } else if (typeof tag === 'object') {
      var result$1 = { value: tag.value || 'div', props: tag.props || {} };

      if (tagClasses) {
        if (result$1.props.class) {
          if (isArray(result$1.props.class)) {
            result$1.props.class.push(tagClasses);
          } else {
            result$1.props.class = [tagClasses, result$1.props.class];
          }
        } else {
          result$1.props.class = tagClasses;
        }
      }

      return result$1;
    }
  }
  return { value: 'div' };
}

function validateTagProp (tag) {
  if (tag) {
    if (typeof tag === 'string') { return true; }
    if (typeof tag === 'object') {
      if (
        typeof tag.value === 'string' ||
        typeof tag.value === 'function' ||
        typeof tag.value === 'object'
      ) {
        return true;
      }
    }
    return false;
  }
  return true;
}

/* eslint-disable curly */

smooth_dnd__WEBPACK_IMPORTED_MODULE_0__["smoothDnD"].dropHandler = smooth_dnd__WEBPACK_IMPORTED_MODULE_0__["dropHandlers"].reactDropHandler().handler;
smooth_dnd__WEBPACK_IMPORTED_MODULE_0__["smoothDnD"].wrapChild = false;

var eventEmitterMap = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  'drop': 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady'
};

function getContainerOptions (props, context) {
  var options = Object.keys(props).reduce(function (result, key) {
    var optionName = key;
    var prop = props[optionName];

    if (prop !== undefined) {
      if (typeof prop === 'function') {
        if (eventEmitterMap[optionName]) {
          result[eventEmitterMap[optionName]] = function (params) {
            context.$emit(optionName, params);
          };
        } else {
          result[optionName] = function () {
            var params = [], len = arguments.length;
            while ( len-- ) params[ len ] = arguments[ len ];

            return (prop).apply(void 0, params);
          };
        }
      } else {
        result[optionName] = prop;
      }
    }

    return result;
  }, {});

  return options;
}

var mapOptions = function (context) {
  var props = Object.assign({}, context.$props, context.$listeners);
  return getContainerOptions(props, context);
};

var Container = {
  name: 'Container',
  mounted: function mounted () {
    this.containerElement = this.$refs.container || this.$el;
    this.container = Object(smooth_dnd__WEBPACK_IMPORTED_MODULE_0__["smoothDnD"])(this.containerElement, mapOptions(this));
  },
  updated: function updated () {
    if (
      this.$refs.container !== this.containerElement &&
      this.$el !== this.containerElement
    ) {
      if (this.container) {
        this.container.dispose();
      }
      this.containerElement = this.$refs.container || this.$el;
      this.container = Object(smooth_dnd__WEBPACK_IMPORTED_MODULE_0__["smoothDnD"])(this.containerElement, mapOptions(this));
      return;
    }

    this.container.setOptions(mapOptions(this));
  },
  destroyed: function destroyed () {
    if (this.container) {
      this.container.dispose();
    }
  },
  props: {
    behaviour: String,
    groupName: String,
    orientation: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    dragBeginDelay: Number,
    animationDuration: Number,
    autoScrollEnabled: { type: Boolean, default: true },
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    removeOnDropOut: { type: Boolean, default: false },
    'drag-start': Function,
    'drag-end': Function,
    drop: Function,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    'drag-enter': Function,
    'drag-leave': Function,
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
    getGhostParent: Function,
    'drop-ready': Function,
    dropPlaceholder: [Object, Boolean]
  },
  render: function (createElement) {
    var tagProps = getTagProps(this);
    return createElement(
      tagProps.value,
      Object.assign({}, { ref: 'container' }, tagProps.props),
      this.$slots.default
    );
  }
};

var wrapChild = function (createElement, ctx) {
  var tagProps = getTagProps(ctx, smooth_dnd__WEBPACK_IMPORTED_MODULE_0__["constants"].wrapperClass);
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default
  );
};

var Draggable = {
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div'
    }
  },
  render: function (createElement) {
    return wrapChild(createElement, this);
  }
};




/***/ })

}]);