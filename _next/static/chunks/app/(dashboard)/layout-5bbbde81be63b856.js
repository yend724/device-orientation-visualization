(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[642],{8187:function(e,r,t){Promise.resolve().then(t.bind(t,3568)),Promise.resolve().then(t.bind(t,358)),Promise.resolve().then(t.t.bind(t,735,23))},3568:function(e,r,t){"use strict";t.r(r),t.d(r,{FpsView:function(){return FpsView}});var n=t(7437),o=t(2265),c=function(e){var r,t,n,i,u,a,l,s,f,d,p,h,m,b,x,v=e.top,g=e.left,F=e.bottom,S=e.right,w=e.width,k=void 0===w?140:w,y=e.height,z=void 0===y?60:y,E=(r=Math.floor(k/2),t=(0,o.useRef)([]),n=(0,o.useRef)(0),i=(0,o.useRef)(performance.now()),u=(0,o.useRef)(0),l=(a=(0,o.useState)([]))[0],s=a[1],f=function(){var e=performance.now();if(n.current+=1,e>i.current+1e3){var o=e-i.current,a=Math.round(1e3*n.current/o);if(t.current=t.current.concat(a),o>1500)for(var l=1;l<=(o-1e3)/1e3;l++)t.current=t.current.concat(0);t.current=t.current.slice(Math.max(t.current.length-r,0)),s(t.current),n.current=0,i.current=performance.now()}u.current=requestAnimationFrame(f)},(0,o.useEffect)(function(){return u.current=requestAnimationFrame(f),function(){cancelAnimationFrame(u.current)}},[]),d=(l.reduce(function(e,r){return e+r},0)/l.length).toFixed(2),{fps:l,avgFps:d,maxFps:Math.max.apply(Math.max,l),currentFps:l[l.length-1]}),M=E.fps,N=E.avgFps,C=E.maxFps,_=E.currentFps,A=(p=void 0===v?0:v,h=void 0===S?"auto":S,m=void 0===F?"auto":F,b=void 0===g?0:g,x=M.length,{wrapperStyle:(0,o.useMemo)(function(){return{zIndex:999999,position:"fixed",width:k+6+"px",height:z+30+"px",padding:"3px",backgroundColor:"#21006f",color:"#26F0FD",fontSize:"1rem",lineHeight:"1.3rem",fontFamily:"Helvetica, Arial, sans-serif",fontWeight:300,boxSizing:"border-box",top:p,right:h,bottom:m,left:b}},[k,z,p,h,m,b]),graphStyle:(0,o.useMemo)(function(){return{position:"absolute",left:"3px",right:"3px",bottom:"3px",height:z,backgroundColor:"#282844",MozBoxSizing:"border-box",boxSizing:"border-box"}},[z]),barStyle:(0,o.useCallback)(function(e,r){return{position:"absolute",bottom:"0",right:4*(x-1-r)+"px",height:e+"px",width:"4px",backgroundColor:"#E200F7",MozBoxSizing:"border-box",boxSizing:"border-box"}},[x])}),P=A.graphStyle,j=A.barStyle,I=A.wrapperStyle;return o.createElement("div",{style:I},o.createElement("span",null,_," FPS (",N," Avg)"),o.createElement("div",{style:P},M.map(function(e,r){return o.createElement("div",{key:r,style:j(z*e/C,r)})})))};let FpsView=()=>(0,n.jsx)(c,{right:0,bottom:0,top:"auto",left:"auto"})},2836:function(e,r,t){"use strict";t.d(r,{r:function(){return Link}});var n=t(7437),o=t(1396),i=t.n(o),u=t(3986);let a={none:"no-underline",hover:"hover:underline",normal:"underline hover:no-underline"},Link=e=>{let{children:r,className:t,underline:o="normal",...l}=e;return(0,n.jsx)(i(),{...l,className:(0,u.m)("block",a[o],t),children:r})}},358:function(e,r,t){"use strict";t.r(r),t.d(r,{SideNavItem:function(){return SideNavItem}});var n=t(7437),o=t(4033),i=t(2836);let SideNavItem=e=>{let{href:r,label:t}=e,u=(0,o.usePathname)(),a=r===u;return(0,n.jsx)("li",{children:(0,n.jsx)(i.r,{className:a?void 0:"text-neutral-100/50",href:r,"aria-current":a?"page":void 0,underline:"none",children:t})})}},735:function(){}},function(e){e.O(0,[717,251,971,472,744],function(){return e(e.s=8187)}),_N_E=e.O()}]);