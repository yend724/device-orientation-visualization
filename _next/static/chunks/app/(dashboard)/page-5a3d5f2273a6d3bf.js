(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[130],{2890:function(e,t,r){Promise.resolve().then(r.bind(r,7325))},7325:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return page}});var a=r(7437),n=r(5318),l=r(2265);let useDeviceOrientation=()=>{let[e,t]=(0,l.useState)({alpha:0,beta:0,gamma:0});return(0,l.useEffect)(()=>{let e=new AbortController;return window.DeviceOrientationEvent&&window.addEventListener("deviceorientation",e=>{let{alpha:r,beta:a,gamma:n}=e;t({alpha:null!=r?r:0,beta:null!=a?a:0,gamma:null!=n?n:0})},{signal:e.signal}),()=>{e.abort()}},[]),{...e}};var o=r(952);let DeviceOrientationLineGraph=e=>{let{orientationData:t,width:r=640,height:n=320}=e,s=(0,l.useRef)(null),i=(0,l.useRef)(null),c={top:20,right:20,bottom:20,left:60},d=r-c.left-c.right,u=n-c.top-c.bottom,g=(0,l.useMemo)(()=>o.BYU().domain([-30,0]).range([0,d]),[d]),m=(0,l.useMemo)(()=>o.BYU().domain([-180,360]).range([u,0]),[u]),f=o.jvg().x(e=>g(e[0])).y(e=>m(e[1])),{gamma:h,alpha:p,beta:x}=t.reduce((e,t)=>{let r=Date.now(),a=-((r-t.timestamp)/1e3*1);if(a<-30)return e;let n={gamma:[[a,t.gamma],...e.gamma],alpha:[[a,t.alpha],...e.alpha],beta:[[a,t.beta],...e.beta]};return n},{gamma:[],alpha:[],beta:[]});return(0,l.useEffect)(()=>{let e=s.current;if(e)return o.Ys(e).call(o.LLu(g).tickFormat(e=>0===e?"0秒前":"".concat(e))),()=>{o.Ys(e).selectAll("g").remove()}},[s,g]),(0,l.useEffect)(()=>{let e=i.current;if(e)return o.Ys(e).call(o.y4O(m).tickValues([-180,-90,0,90,180,270,360]).tickFormat(e=>360===e?"360deg":"".concat(e))),()=>{o.Ys(e).selectAll("g").remove()}},[i,m]),(0,a.jsxs)("svg",{width:r,height:n,children:[(0,a.jsx)("title",{children:"直近30秒間のデバイスの回転の値（alpha、beta、gamma）の折れ線グラフ"}),(0,a.jsx)("g",{ref:s,transform:"translate(".concat(c.left,",").concat(n-c.bottom,")")}),(0,a.jsx)("g",{ref:i,transform:"translate(".concat(c.left,",").concat(c.bottom,")")}),(0,a.jsx)("path",{className:"stroke-rose-300",transform:"translate(".concat(c.left,", ").concat(c.top,")"),fill:"none",strokeWidth:"2",d:f(p)}),(0,a.jsx)("path",{className:"stroke-green-300",transform:"translate(".concat(c.left,", ").concat(c.top,")"),fill:"none",strokeWidth:"2",d:f(h)}),(0,a.jsx)("path",{className:"stroke-sky-300",transform:"translate(".concat(c.left,", ").concat(c.top,")"),fill:"none",stroke:"blue",strokeWidth:"2",d:f(x)})]})},s={alpha:{bgColor:"bg-rose-300",color:"text-neutral-900"},gamma:{bgColor:"bg-green-300",color:"text-neutral-900"},beta:{bgColor:"bg-sky-300",color:"text-neutral-900"}},DeviceOrientationValues=e=>{let{alpha:t,gamma:r,beta:n}=e;return(0,a.jsxs)("dl",{className:"space-y-8",children:[(0,a.jsx)(DeviceOrientationValue,{type:"alpha",value:t}),(0,a.jsx)(DeviceOrientationValue,{type:"gamma",value:r}),(0,a.jsx)(DeviceOrientationValue,{type:"beta",value:n})]})},DeviceOrientationValue=e=>{let{type:t,value:r}=e;return(0,a.jsxs)("div",{className:"grid min-w-[8rem] grid-rows-2 gap-y-2 rounded-md p-4 ".concat(s[t].bgColor," ").concat(s[t].color),children:[(0,a.jsxs)("dt",{children:[t," の値"]}),(0,a.jsx)("dd",{children:r})]})};var i=r(305),c=r(6793),d=r(9050),u=r(3986);let g=(0,l.forwardRef)((e,t)=>{let{children:r,className:n,...l}=e;return(0,a.jsx)("dialog",{className:(0,u.m)("bg-neutral-900 border-solid border border-neutral-700 text-neutral-100",n),...l,ref:t,children:r})});g.displayName="Dialog";let useDialog=()=>{let e=(0,l.useRef)(null),warning=()=>{console.warn("Dialog is not mounted")},t=(0,l.useCallback)(()=>{if(!e.current){warning();return}e.current.showModal()},[]),r=(0,l.useCallback)(()=>{if(!e.current){warning();return}e.current.close()},[]),a=(0,l.useCallback)(()=>{if(!e.current){warning();return}return e.current.returnValue},[]);return{ref:e,open:t,close:r,getReturnValue:a}},getText=function(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];return{trigger:e?"停止":"録画",title:e?"停止":"開始",action:e?"停止":"録画"}},Record=e=>{let{isRecording:t,onStart:r,onStop:n}=e,{ref:l,open:o,close:s}=useDialog(),i=getText(t);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.z,{onClick:o,children:(0,a.jsxs)("span",{children:[i.trigger,"する"]})}),(0,a.jsxs)(g,{ref:l,children:[(0,a.jsxs)("h2",{className:"px-6 py-4 text-lg",children:[i.title,"を開始しますか？"]}),(0,a.jsxs)("div",{className:"flex gap-4 px-6 py-4 text-end",children:[(0,a.jsxs)(d.z,{onClick:()=>{t?null==n||n():null==r||r(),s()},size:"small",children:[i.action,"する"]}),(0,a.jsx)(d.z,{onClick:s,autoFocus:!0,variant:"secondary",size:"small",children:"キャンセル"})]})]})]})},DeviceOrientation=()=>{let{alpha:e,gamma:t,beta:r}=useDeviceOrientation(),n=(0,l.useRef)({alpha:e,gamma:t,beta:r});n.current={alpha:e,gamma:t,beta:r};let[o,s]=(0,l.useState)({width:0,height:0}),[d,u]=(0,l.useState)([]),g=(0,l.useRef)([]),[m,f]=(0,l.useState)(!1),h=(0,l.useCallback)(e=>{if(null===e)return;let t=new AbortController,handleResize=()=>{s({width:e.clientWidth,height:e.clientHeight})};return handleResize(),window.addEventListener("resize",handleResize,{signal:t.signal}),()=>{t.abort()}},[]);return(0,l.useEffect)(()=>{let e;let loop=()=>{let t=Date.now(),{alpha:r,gamma:a,beta:l}=n.current,o={timestamp:t,alpha:r,gamma:a,beta:l};m&&(g.current=[o,...g.current]),u(e=>{let t=[o,...e];return t.slice(0,1801)}),e=requestAnimationFrame(loop)};return loop(),()=>{cancelAnimationFrame(e)}},[m]),(0,a.jsxs)("div",{className:"grid grid-cols-[1fr_auto] gap-8",children:[(0,a.jsx)("div",{ref:h,className:"relative aspect-video w-full min-w-[40rem]",children:(0,a.jsx)("div",{className:"absolute h-full w-full",children:(0,a.jsx)(DeviceOrientationLineGraph,{width:o.width,height:o.height,orientationData:d})})}),(0,a.jsxs)("div",{children:[(0,a.jsx)(DeviceOrientationValues,{alpha:e,gamma:t,beta:r}),(0,a.jsx)("div",{className:"mt-8",children:(0,a.jsx)(Record,{onStart:()=>{f(!0)},onStop:()=>{console.log("stop"),f(!1);let e=g.current,t=e[e.length-1].timestamp,r=e[0].timestamp,a=(0,i.I)(e);(0,c.fo)(t,r,a),g.current=[]},isRecording:m})})]})]})},useClock=function(){let{initial:e=new Date("2000-01-01 00:00:00")}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[t,r]=(0,l.useState)(e);return(0,l.useEffect)(()=>{r(new Date);let e=null,loop=()=>{r(new Date),e=requestAnimationFrame(loop)};return loop(),()=>{e&&cancelAnimationFrame(e)}},[]),{currentTime:t}};var page=()=>{let{currentTime:e}=useClock();return(0,a.jsxs)("div",{className:"grid grid-cols-[auto_1fr] gap-x-8",children:[(0,a.jsx)("div",{children:(0,a.jsx)(n.S,{currentTime:e})}),(0,a.jsx)("div",{children:(0,a.jsx)(DeviceOrientation,{})})]})}},9050:function(e,t,r){"use strict";r.d(t,{z:function(){return o}});var a=r(7437),n=r(2265),l=r(3986);let o=(0,n.forwardRef)((e,t)=>{let{children:r,variant:n,size:o,className:s,disabled:i,...c}=e;return(0,a.jsx)("button",{...c,ref:t,className:(0,l.m)("flex items-center justify-between gap-x-2 whitespace-nowrap rounded-md bg-neutral-50 px-4 py-2 text-neutral-900 hover:opacity-70 focus:border-neutral-50",s,"secondary"===n&&"bg-neutral-900 border border-neutral-50 text-neutral-50 hover:opacity-70","small"===o&&"text-sm px-2 py-1 rounded",i&&"cursor-not-allowed opacity-20 hover:opacity-20"),children:r})});o.displayName="Button"},5318:function(e,t,r){"use strict";r.d(t,{S:function(){return Clock}});var a=r(7437);let zeroPadding=(e,t)=>String(e).padStart(t,"0"),formatDateTimeToDigital=e=>{let t=e.getFullYear(),r=zeroPadding(e.getMonth()+1,2),a=zeroPadding(e.getDate(),2),n=zeroPadding(e.getHours(),2),l=zeroPadding(e.getMinutes(),2),o=zeroPadding(e.getSeconds(),2),s=zeroPadding(e.getMilliseconds(),3);return{date:"".concat(t,"-").concat(r,"-").concat(a),time:"".concat(n,":").concat(l,":").concat(o,".").concat(s)}},splitDateTime=e=>{let t=e.getFullYear(),r=e.getMonth()+1,a=e.getDate(),n=e.getHours(),l=e.getMinutes(),o=e.getSeconds(),s=e.getMilliseconds();return{year:t,month:r,date:a,hours:n,minutes:l,seconds:o,milliseconds:s}},AnalogClock=e=>{let{dateTime:t}=e,{hours:r,minutes:n,seconds:l}=splitDateTime(t);return(0,a.jsxs)("div",{className:"relative h-[200px] w-[200px] rounded-full bg-neutral-800",children:[(0,a.jsx)("div",{style:{"--rotate-deg":"".concat((r+n/60)*30-90,"deg")},className:"absolute left-1/2 top-1/2 z-10 h-[6px] w-[30%] origin-[center_left] rotate-[var(--rotate-deg)] bg-neutral-50"}),(0,a.jsx)("div",{style:{"--rotate-deg":"".concat(6*n-90,"deg")},className:"absolute left-1/2 top-1/2 z-10 h-[4px] w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-neutral-50"}),(0,a.jsx)("div",{style:{"--rotate-deg":"".concat(6*l-90,"deg")},className:"absolute left-1/2 top-1/2 z-10 h-[4px]  w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-orange-500"}),(0,a.jsxs)("ol",{className:"relative h-full w-full text-center [&>li]:-translate-x-1/2 [&>li]:-translate-y-1/2",children:[(0,a.jsx)("li",{className:"absolute left-[70%] top-[14%]",children:"1"}),(0,a.jsx)("li",{className:"absolute left-[86%] top-[28%]",children:"2"}),(0,a.jsx)("li",{className:"absolute left-[90%] top-[50%]",children:"3"}),(0,a.jsx)("li",{className:"absolute left-[86%] top-[72%]",children:"4"}),(0,a.jsx)("li",{className:"absolute left-[70%] top-[86%]",children:"5"}),(0,a.jsx)("li",{className:"absolute left-[50%] top-[90%]",children:"6"}),(0,a.jsx)("li",{className:"absolute left-[30%] top-[86%]",children:"7"}),(0,a.jsx)("li",{className:"absolute left-[14%] top-[72%]",children:"8"}),(0,a.jsx)("li",{className:"absolute left-[10%] top-[50%]",children:"9"}),(0,a.jsx)("li",{className:"absolute left-[14%] top-[28%]",children:"10"}),(0,a.jsx)("li",{className:"absolute left-[30%] top-[14%]",children:"11"}),(0,a.jsx)("li",{className:"absolute left-[50%] top-[10%]",children:"12"})]})]})},DigitalClock=e=>{let{dateTime:t}=e,{date:r,time:n}=formatDateTimeToDigital(t);return(0,a.jsxs)("span",{className:"grid grid-rows-2 text-2xl",children:[(0,a.jsx)("span",{children:r}),(0,a.jsx)("span",{children:n})]})},Clock=e=>{let{currentTime:t}=e;return(0,a.jsxs)("div",{children:[(0,a.jsx)(AnalogClock,{dateTime:t}),(0,a.jsx)("div",{className:"mt-4 text-center",children:(0,a.jsx)(DigitalClock,{dateTime:t})})]})}},305:function(e,t,r){"use strict";r.d(t,{I:function(){return convertArrayToBlob},r:function(){return readBlob}});let convertArrayToBlob=e=>new Blob([JSON.stringify(e)],{type:"application/json"}),readBlob=e=>new Promise((t,r)=>{let a=new FileReader;a.readAsText(e),a.onload=()=>{let e=a.result;"string"==typeof e?t(JSON.parse(e)):r("Blobの読み込みに失敗しました")}})},6793:function(e,t,r){"use strict";r.d(t,{DO:function(){return deleteIndexedDBValue},ZS:function(){return readIndexedDBValue},fQ:function(){return readIndexedDBAll},fo:function(){return saveOrientationData}});let opneIndexedDB=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2?arguments[2]:void 0;return new Promise((a,n)=>{let l=indexedDB.open(e,t);l.addEventListener("upgradeneeded",()=>{null==r||r(l)}),l.addEventListener("success",()=>{a(l)}),l.addEventListener("error",e=>{console.error("データベースを開けませんでした"),n(e)})})},saveOrientationData=async(e,t,r)=>{let a=await opneIndexedDB("DeviceOrientationVisualizationDB",1,e=>{let t=e.result;t.createObjectStore("recordStore",{autoIncrement:!0}),t.createObjectStore("rangeStore",{autoIncrement:!0})}),n=a.result,l=n.objectStoreNames;if(l.contains("recordStore")){let t=n.transaction("recordStore","readwrite"),a=t.objectStore("recordStore");a.add(r,e.toString()),t.addEventListener("complete",()=>{console.log("データを追加しました")})}else console.error("オブジェクトストアが存在しません");if(l.contains("rangeStore")){let r=n.transaction("rangeStore","readwrite"),a=r.objectStore("rangeStore");a.add({start:e,end:t},e.toString()),r.addEventListener("complete",()=>{console.log("データを追加しました")})}},readIndexedDBAll=(e,t)=>new Promise(async(r,a)=>{let n=await opneIndexedDB(e),l=n.result,o=l.objectStoreNames;if(o.contains(t)){let e=l.transaction(t,"readonly"),a=e.objectStore(t),n=a.getAll();n.addEventListener("success",()=>{r(n)})}else a("オブジェクトストアが存在しません")}),readIndexedDBValue=(e,t,r)=>new Promise(async(a,n)=>{let l=await opneIndexedDB(e),o=l.result,s=o.objectStoreNames;if(s.contains(t)){let e=o.transaction(t,"readonly"),n=e.objectStore(t),l=n.get(r);l.addEventListener("success",()=>{a(l)})}else n("オブジェクトストアが存在しません")}),deleteIndexedDBValue=(e,t,r)=>new Promise(async(a,n)=>{let l=await opneIndexedDB(e),o=l.result,s=o.objectStoreNames;if(s.contains(t)){let e=o.transaction(t,"readwrite"),n=e.objectStore(t),l=n.delete(r);l.addEventListener("success",()=>{a(l)})}else n("オブジェクトストアが存在しません")})}},function(e){e.O(0,[717,952,971,472,744],function(){return e(e.s=2890)}),_N_E=e.O()}]);