(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[642],{8187:function(e,t,r){Promise.resolve().then(r.bind(r,3568)),Promise.resolve().then(r.bind(r,358)),Promise.resolve().then(r.t.bind(r,735,23))},3568:function(e,t,r){"use strict";r.r(t),r.d(t,{FpsView:function(){return FpsView}});var n=r(7437),o=r(2265),c=function(e){var t,r,n,i,u,a,s,l,f,p,d,h,m,b,x,g=e.top,v=e.left,F=e.bottom,S=e.right,w=e.width,k=void 0===w?140:w,y=e.height,z=void 0===y?60:y,E=(t=Math.floor(k/2),r=(0,o.useRef)([]),n=(0,o.useRef)(0),i=(0,o.useRef)(performance.now()),u=(0,o.useRef)(0),s=(a=(0,o.useState)([]))[0],l=a[1],f=function(){var e=performance.now();if(n.current+=1,e>i.current+1e3){var o=e-i.current,a=Math.round(1e3*n.current/o);if(r.current=r.current.concat(a),o>1500)for(var s=1;s<=(o-1e3)/1e3;s++)r.current=r.current.concat(0);r.current=r.current.slice(Math.max(r.current.length-t,0)),l(r.current),n.current=0,i.current=performance.now()}u.current=requestAnimationFrame(f)},(0,o.useEffect)(function(){return u.current=requestAnimationFrame(f),function(){cancelAnimationFrame(u.current)}},[]),p=(s.reduce(function(e,t){return e+t},0)/s.length).toFixed(2),{fps:s,avgFps:p,maxFps:Math.max.apply(Math.max,s),currentFps:s[s.length-1]}),M=E.fps,N=E.avgFps,C=E.maxFps,_=E.currentFps,A=(d=void 0===g?0:g,h=void 0===S?"auto":S,m=void 0===F?"auto":F,b=void 0===v?0:v,x=M.length,{wrapperStyle:(0,o.useMemo)(function(){return{zIndex:999999,position:"fixed",width:k+6+"px",height:z+30+"px",padding:"3px",backgroundColor:"#21006f",color:"#26F0FD",fontSize:"1rem",lineHeight:"1.3rem",fontFamily:"Helvetica, Arial, sans-serif",fontWeight:300,boxSizing:"border-box",top:d,right:h,bottom:m,left:b}},[k,z,d,h,m,b]),graphStyle:(0,o.useMemo)(function(){return{position:"absolute",left:"3px",right:"3px",bottom:"3px",height:z,backgroundColor:"#282844",MozBoxSizing:"border-box",boxSizing:"border-box"}},[z]),barStyle:(0,o.useCallback)(function(e,t){return{position:"absolute",bottom:"0",right:4*(x-1-t)+"px",height:e+"px",width:"4px",backgroundColor:"#E200F7",MozBoxSizing:"border-box",boxSizing:"border-box"}},[x])}),P=A.graphStyle,j=A.barStyle,I=A.wrapperStyle;return o.createElement("div",{style:I},o.createElement("span",null,_," FPS (",N," Avg)"),o.createElement("div",{style:P},M.map(function(e,t){return o.createElement("div",{key:t,style:j(z*e/C,t)})})))};let FpsView=()=>(0,n.jsx)(c,{right:0,bottom:0,top:"auto",left:"auto"})},2836:function(e,t,r){"use strict";r.d(t,{r:function(){return Link}});var n=r(7437),o=r(1396),i=r.n(o),u=r(3986);let Link=e=>{let{children:t,className:r,...o}=e;return(0,n.jsx)(i(),{...o,className:(0,u.m)("block hover:underline",r),children:t})}},358:function(e,t,r){"use strict";r.r(t),r.d(t,{SideNavItem:function(){return SideNavItem}});var n=r(7437),o=r(4033),i=r(2836);let SideNavItem=e=>{let{href:t,label:r}=e,u=(0,o.usePathname)(),a=t===u;return(0,n.jsx)("li",{children:(0,n.jsx)(i.r,{className:a?void 0:"text-neutral-100/50",href:t,"aria-current":a?"page":void 0,children:r})})}},735:function(){}},function(e){e.O(0,[717,251,971,472,744],function(){return e(e.s=8187)}),_N_E=e.O()}]);