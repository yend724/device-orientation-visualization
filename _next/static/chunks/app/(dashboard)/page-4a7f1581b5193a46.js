(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[130],{2890:function(e,t,a){Promise.resolve().then(a.bind(a,8993))},8993:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return page}});var n=a(7437),r=a(5318),l=a(2265);let useRequestAnimationFrame=function(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],a=(0,l.useRef)(null),n=(0,l.useCallback)(r=>{t&&(e(r),a.current=requestAnimationFrame(n))},[t,e]);(0,l.useEffect)(()=>(a.current=requestAnimationFrame(n),()=>{a.current&&cancelAnimationFrame(a.current)}),[n])},setSessionStorage=(e,t)=>{sessionStorage.setItem(e,JSON.stringify(t))},getSessionStorage=e=>{let t=sessionStorage.getItem(e);return null===t?null:JSON.parse(t)},useDeviceOrientation=()=>{let[e,t]=(0,l.useState)(!1),[a,n]=(0,l.useState)({alpha:0,beta:0,gamma:0}),r=(0,l.useCallback)(()=>{DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission&&DeviceOrientationEvent.requestPermission().then(e=>{"granted"===e?(t(!0),setSessionStorage("isDeviceRotationPermission","true")):(alert("デバイス向きの取得の許可をしてください"),setSessionStorage("isDeviceRotationPermission","false"))}),t(!0),setSessionStorage("isDeviceRotationPermission","true")},[]);return(0,l.useEffect)(()=>{let e=getSessionStorage("isDeviceRotationPermission");e&&t("true"===e)},[]),(0,l.useEffect)(()=>{let a=new AbortController;return DeviceOrientationEvent&&!DeviceOrientationEvent.requestPermission&&t(!0),e&&(t(!0),window.addEventListener("deviceorientation",e=>{let{alpha:t,beta:a,gamma:r}=e;n({alpha:null!=t?t:0,beta:null!=a?a:0,gamma:null!=r?r:0})},{signal:a.signal})),()=>{a.abort()}},[e]),{...a,isPermission:e,requestPermission:r}};var s=a(5632);let i={top:20,right:20,bottom:20,left:50};var o=a(952);let useGetPathValues=e=>{let t=(0,l.useMemo)(()=>e.reduce((e,t)=>{let a=Date.now(),n=-((a-t.timestamp)/1e3*1),r={gamma:[[n,t.gamma],...e.gamma],alpha:[[n,t.alpha],...e.alpha],beta:[[n,t.beta],...e.beta]};return r},{gamma:[],alpha:[],beta:[]}),[e]);return t},useScaleLinear=e=>{let{width:t,height:a}=e,n=(0,l.useMemo)(()=>o.BYU().domain([-30,0]).range([0,t]),[t]),r=(0,l.useMemo)(()=>o.BYU().domain([-180,360]).range([a,0]),[a]),s=o.jvg().x(e=>n(e[0])).y(e=>r(e[1]));return{x:n,y:r,line:s}},useXAxisLine=e=>{let{x:t,width:a}=e,n=(0,l.useRef)(null);return(0,l.useEffect)(()=>{let e=n.current;if(e)return o.Ys(e).call(o.LLu(t).ticks(a>640?15:5).tickFormat(e=>0===e?"0秒前":"".concat(e))),()=>{o.Ys(e).selectAll("g").remove()}},[t,a]),{gx:n}},useYAxisLine=e=>{let{y:t}=e,a=(0,l.useRef)(null);return(0,l.useEffect)(()=>{let e=a.current;if(e)return o.Ys(e).call(o.y4O(t).tickValues([-180,-90,0,90,180,270,360]).tickFormat(e=>360===e?"360deg":"".concat(e))),()=>{o.Ys(e).selectAll("g").remove()}},[t]),{gy:a}},DeviceOrientationRealtimeGraph=e=>{let{data:t,width:a=640,height:r=320}=e,l=a-i.left-i.right,o=r-i.top-i.bottom,{gamma:c,alpha:u,beta:d}=useGetPathValues(t),{x:m,y:g,line:f}=useScaleLinear({width:l,height:o}),{gx:x}=useXAxisLine({x:m,width:l}),{gy:h}=useYAxisLine({y:g});return(0,n.jsxs)("svg",{className:"h-full w-full",children:[(0,n.jsx)("title",{children:"直近30秒間のデバイスの回転の値（alpha、beta、gamma）の折れ線グラフ"}),(0,n.jsx)("g",{ref:x,transform:"translate(".concat(i.left,",").concat(r-i.bottom,")")}),(0,n.jsx)("g",{ref:h,transform:"translate(".concat(i.left,",").concat(i.bottom,")")}),(0,n.jsx)("path",{className:s.G8.ALPHA,transform:"translate(".concat(i.left,", ").concat(i.top,")"),fill:"none",strokeWidth:"2",d:f(u)}),(0,n.jsx)("path",{className:s.G8.GAMMA,transform:"translate(".concat(i.left,", ").concat(i.top,")"),fill:"none",strokeWidth:"2",d:f(c)}),(0,n.jsx)("path",{className:s.G8.BETA,transform:"translate(".concat(i.left,", ").concat(i.top,")"),fill:"none",stroke:"blue",strokeWidth:"2",d:f(d)})]})};var c=a(807),u=a(9050),d=a(3986);let m=(0,l.forwardRef)((e,t)=>{let{children:a,className:r,...l}=e;return(0,n.jsx)("dialog",{className:(0,d.m)("bg-neutral-900 border-solid border border-neutral-700 text-neutral-100",r),...l,ref:t,children:a})});m.displayName="Dialog";let useDialog=()=>{let e=(0,l.useRef)(null),warning=()=>{console.warn("Dialog is not mounted")},t=(0,l.useCallback)(()=>{if(!e.current){warning();return}e.current.showModal()},[]),a=(0,l.useCallback)(()=>{if(!e.current){warning();return}e.current.close()},[]),n=(0,l.useCallback)(()=>{if(!e.current){warning();return}return e.current.returnValue},[]);return{ref:e,open:t,close:a,getReturnValue:n}},getText=function(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];return{trigger:e?"停止":"録画",title:e?"停止":"開始",action:e?"停止":"開始"}},Record=e=>{let{isRecording:t,onStart:a,onStop:r}=e,{ref:l,open:s,close:i}=useDialog(),o=getText(t);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.z,{onClick:s,children:(0,n.jsxs)("span",{children:[o.trigger,"する"]})}),(0,n.jsxs)(m,{ref:l,children:[(0,n.jsxs)("h2",{className:"px-6 py-4 text-lg",children:["録画を",o.title,"しますか？"]}),(0,n.jsxs)("div",{className:"flex gap-4 px-6 py-4 text-end",children:[(0,n.jsxs)(u.z,{onClick:()=>{t?r():a(),i()},size:"small",children:[o.action,"する"]}),(0,n.jsx)(u.z,{onClick:i,autoFocus:!0,variant:"secondary",size:"small",children:"キャンセル"})]})]})]})};var g=a(305),f=a(6793);let filterArrayByTimestamp=(e,t,a)=>e.filter(e=>{let n=t-e.timestamp;return n<=1e3*a}),saveOrientationData=async(e,t,a)=>{Promise.all([(0,f.HZ)({dbName:"DeviceOrientationVisualizationDB",data:{key:e.toString(),value:a},storeName:"recordStore"}),(0,f.HZ)({dbName:"DeviceOrientationVisualizationDB",data:{key:e.toString(),value:{start:e,end:t}},storeName:"rangeStore"})])},useDOMSize=()=>{let[e,t]=(0,l.useState)([0,0]),a=(0,l.useCallback)(e=>{if(null===e)return;let a=new AbortController,handleResize=()=>{t([e.clientWidth,e.clientHeight])};return handleResize(),window.addEventListener("resize",handleResize,{signal:a.signal}),()=>{a.abort()}},[]);return{width:e[0],height:e[1],ref:a}},useRealtimeOrientationData=()=>{let[e,t]=(0,l.useState)([]),a=(0,l.useCallback)(e=>{t(e)},[]);return{realtimeData:e,handleUpdateRealtimeData:a}},useRecordOrientationData=()=>{let[e,t]=(0,l.useState)([]),a=(0,l.useCallback)(e=>{t(t=>[e,...t])},[]),n=(0,l.useCallback)(()=>{t([])},[]),[r,s]=(0,l.useState)(!1),i=(0,l.useCallback)(()=>{s(!0)},[]),o=(0,l.useCallback)(()=>{s(!1);let t=e[e.length-1].timestamp,a=e[0].timestamp,r=(0,g.I)(e);saveOrientationData(t,a,r),n()},[e,n]);return{isRecording:r,handleStartRecording:i,handleStopRecording:o,recordData:e,handlePrependRecordData:a}},DeviceOrientationRealtime=()=>{let{alpha:e,gamma:t,beta:a,isPermission:r,requestPermission:l}=useDeviceOrientation(),{width:s,height:i,ref:o}=useDOMSize(),{realtimeData:d,handleUpdateRealtimeData:m}=useRealtimeOrientationData(),{isRecording:g,handleStartRecording:f,handleStopRecording:x,handlePrependRecordData:h}=useRecordOrientationData();return useRequestAnimationFrame(()=>{let n=Date.now(),r={timestamp:n,alpha:e,gamma:t,beta:a},l=filterArrayByTimestamp([r,...d],n,30);m(l),g&&h(r)}),(0,n.jsxs)("div",{className:"grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]",children:[(0,n.jsx)("div",{ref:o,className:"relative aspect-video w-full",children:(0,n.jsx)("div",{className:"absolute h-full w-full",children:(0,n.jsx)(DeviceOrientationRealtimeGraph,{width:s,height:i,data:d})})}),(0,n.jsxs)("div",{className:"grid grid-rows-[auto_1fr] gap-y-12",children:[(0,n.jsx)("div",{children:(0,n.jsx)(c.x,{alpha:e,gamma:t,beta:a})}),(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"flex flex-wrap gap-x-4",children:[(0,n.jsx)(u.z,{onClick:l,disabled:r,children:r?"許可済み":"許可する"}),(0,n.jsx)(Record,{onStart:f,onStop:x,isRecording:g})]})})]})]})},useClock=()=>{let[e,t]=(0,l.useState)(new Date("2000-01-01 00:00:00.000"));return(0,l.useEffect)(()=>{let e;t(new Date);let loop=()=>{t(new Date),e=requestAnimationFrame(loop)};return loop(),()=>{e&&cancelAnimationFrame(e)}},[]),{currentTime:e}};var x=a(3072),page=()=>{let{currentTime:e}=useClock();return(0,n.jsxs)("div",{className:"grid gap-y-12",children:[(0,n.jsx)(x.b,{paths:[{label:"ホーム",href:"/"}]}),(0,n.jsxs)("div",{className:"grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]",children:[(0,n.jsx)("div",{children:(0,n.jsx)(r.S,{currentTime:e})}),(0,n.jsx)("div",{children:(0,n.jsx)(DeviceOrientationRealtime,{})})]})]})}},3072:function(e,t,a){"use strict";a.d(t,{b:function(){return BreadCrumbs}});var n=a(7437),r=a(2265),l=a(2836);let BreadCrumbs=e=>{let{paths:t}=e;return(0,n.jsx)("div",{className:"flex gap-x-2",children:t.map((e,a)=>a===t.length-1?(0,n.jsx)("p",{children:e.label},e.href):(0,n.jsxs)(r.Fragment,{children:[(0,n.jsx)(l.r,{href:e.href,children:e.label}),(0,n.jsx)("span",{children:">"})]},e.href))})}},9050:function(e,t,a){"use strict";a.d(t,{z:function(){return s}});var n=a(7437),r=a(2265),l=a(3986);let s=(0,r.forwardRef)((e,t)=>{let{children:a,variant:r,size:s,className:i,disabled:o,...c}=e;return(0,n.jsx)("button",{...c,ref:t,disabled:o,className:(0,l.m)("flex items-center justify-between gap-x-2 whitespace-nowrap rounded-md bg-neutral-50 px-4 py-2 text-neutral-900 hover:opacity-70 focus:border-neutral-50","secondary"===r&&"bg-neutral-900 border border-neutral-50 text-neutral-50 hover:opacity-70","small"===s&&"text-sm px-2 py-1 rounded",o&&"pointer-events-none opacity-20 hover:opacity-20",i),children:a})});s.displayName="Button"},5318:function(e,t,a){"use strict";a.d(t,{S:function(){return Clock}});var n=a(7437);let zeroPadding=(e,t)=>String(e).padStart(t,"0"),formatDateTimeToDigital=e=>{let t=e.getFullYear(),a=zeroPadding(e.getMonth()+1,2),n=zeroPadding(e.getDate(),2),r=zeroPadding(e.getHours(),2),l=zeroPadding(e.getMinutes(),2),s=zeroPadding(e.getSeconds(),2),i=zeroPadding(e.getMilliseconds(),3);return{date:"".concat(t,"-").concat(a,"-").concat(n),time:"".concat(r,":").concat(l,":").concat(s,".").concat(i)}},splitDateTime=e=>{let t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate(),r=e.getHours(),l=e.getMinutes(),s=e.getSeconds(),i=e.getMilliseconds();return{year:t,month:a,date:n,hours:r,minutes:l,seconds:s,milliseconds:i}},AnalogClock=e=>{let{dateTime:t}=e,{hours:a,minutes:r,seconds:l}=splitDateTime(t);return(0,n.jsxs)("div",{className:"relative aspect-[1/1] w-[12rem] rounded-full bg-neutral-800 sm:w-[15rem]",children:[(0,n.jsx)("div",{style:{"--rotate-deg":"".concat((a+r/60)*30-90,"deg")},className:"absolute left-1/2 top-1/2 z-10 h-[6px] w-[30%] origin-[center_left] rotate-[var(--rotate-deg)] bg-neutral-50"}),(0,n.jsx)("div",{style:{"--rotate-deg":"".concat(6*r-90,"deg")},className:"absolute left-1/2 top-1/2 z-10 h-[4px] w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-neutral-50"}),(0,n.jsx)("div",{style:{"--rotate-deg":"".concat(6*l-90,"deg")},className:"absolute left-1/2 top-1/2 z-10 h-[4px]  w-[40%] origin-[center_left] rotate-[var(--rotate-deg)] bg-orange-500"}),(0,n.jsxs)("ol",{className:"relative h-full w-full text-center [&>li]:-translate-x-1/2 [&>li]:-translate-y-1/2",children:[(0,n.jsx)("li",{className:"absolute left-[70%] top-[14%]",children:"1"}),(0,n.jsx)("li",{className:"absolute left-[86%] top-[28%]",children:"2"}),(0,n.jsx)("li",{className:"absolute left-[90%] top-[50%]",children:"3"}),(0,n.jsx)("li",{className:"absolute left-[86%] top-[72%]",children:"4"}),(0,n.jsx)("li",{className:"absolute left-[70%] top-[86%]",children:"5"}),(0,n.jsx)("li",{className:"absolute left-[50%] top-[90%]",children:"6"}),(0,n.jsx)("li",{className:"absolute left-[30%] top-[86%]",children:"7"}),(0,n.jsx)("li",{className:"absolute left-[14%] top-[72%]",children:"8"}),(0,n.jsx)("li",{className:"absolute left-[10%] top-[50%]",children:"9"}),(0,n.jsx)("li",{className:"absolute left-[14%] top-[28%]",children:"10"}),(0,n.jsx)("li",{className:"absolute left-[30%] top-[14%]",children:"11"}),(0,n.jsx)("li",{className:"absolute left-[50%] top-[10%]",children:"12"})]})]})},DigitalClock=e=>{let{dateTime:t}=e,{date:a,time:r}=formatDateTimeToDigital(t);return(0,n.jsxs)("span",{className:"grid grid-rows-2 text-2xl",children:[(0,n.jsx)("span",{children:a}),(0,n.jsx)("span",{children:r})]})},Clock=e=>{let{currentTime:t}=e;return(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-center gap-8 text-center lg:flex-col",children:[(0,n.jsx)("div",{children:(0,n.jsx)(AnalogClock,{dateTime:t})}),(0,n.jsx)("div",{className:"flex items-center lg:block",children:(0,n.jsx)(DigitalClock,{dateTime:t})})]})}},807:function(e,t,a){"use strict";a.d(t,{x:function(){return DeviceOrientationValueList}});var n=a(7437),r=a(5632),l=a(3986);let DeviceOrientationValueList=e=>{let{alpha:t,gamma:a,beta:r}=e;return(0,n.jsxs)("dl",{className:"space-y-6",children:[(0,n.jsx)(DeviceOrientationValue,{type:"alpha",value:t}),(0,n.jsx)(DeviceOrientationValue,{type:"gamma",value:a}),(0,n.jsx)(DeviceOrientationValue,{type:"beta",value:r})]})},DeviceOrientationValue=e=>{let{type:t,value:a}=e;return(0,n.jsxs)("div",{className:(0,l.m)("grid min-w-[8rem] grid-rows-2 gap-y-2 rounded-md p-4 text-neutral-900",r.Zw[r.OK[t]]),children:[(0,n.jsxs)("dt",{children:[t," の値"]}),(0,n.jsx)("dd",{children:a})]})}},2836:function(e,t,a){"use strict";a.d(t,{r:function(){return Link}});var n=a(7437),r=a(1396),l=a.n(r),s=a(3986);let i={none:"no-underline",hover:"hover:underline",normal:"underline hover:no-underline"},Link=e=>{let{children:t,className:a,underline:r="normal",...o}=e;return(0,n.jsx)(l(),{...o,className:(0,s.m)("block",i[r],a),children:t})}},5632:function(e,t,a){"use strict";a.d(t,{G8:function(){return n},OK:function(){return r},Zw:function(){return l}});let n={ALPHA:"stroke-rose-300",GAMMA:"stroke-green-300",BETA:"stroke-sky-300",PROGRESS_LINE:"stroke-red-500"},r={alpha:"ALPHA",gamma:"GAMMA",beta:"BETA"},l={ALPHA:"bg-rose-300",GAMMA:"bg-green-300",BETA:"bg-sky-300"}},305:function(e,t,a){"use strict";a.d(t,{I:function(){return convertArrayToBlob},r:function(){return readBlob}});let convertArrayToBlob=e=>new Blob([JSON.stringify(e)],{type:"application/json"}),readBlob=e=>new Promise((t,a)=>{let n=new FileReader;n.readAsText(e),n.onload=()=>{let e=n.result;"string"==typeof e?t(JSON.parse(e)):a("Blobの読み込みに失敗しました")}})},6793:function(e,t,a){"use strict";a.d(t,{DO:function(){return deleteIndexedDBValue},HZ:function(){return wirteIndexedDBValue},ZS:function(){return readIndexedDBValue},fQ:function(){return readIndexedDBAll}});let opneIndexedDB=e=>{let{dbName:t,version:a=1,onSuccess:n,onUpgradeneeded:r,onError:l}=e;return new Promise((e,s)=>{let i=indexedDB.open(t,a);i.addEventListener("upgradeneeded",()=>{null==r||r(i)}),i.addEventListener("success",()=>{null==n||n(i),e(i)}),i.addEventListener("error",e=>{console.error("データベースを開けませんでした"),null==l||l(e),s("[".concat(t,"]データベースを開けませんでした"))})})},readIndexedDBAll=(e,t)=>new Promise(async(a,n)=>{let r=await opneIndexedDB({dbName:e}),l=r.result,s=l.objectStoreNames;if(s.contains(t)){let e=l.transaction(t,"readonly"),n=e.objectStore(t),r=n.getAll();r.addEventListener("success",()=>{a(r)})}else n("[".concat(t,"]オブジェクトストアが存在しません"))}),readIndexedDBValue=(e,t,a)=>new Promise(async(n,r)=>{let l=await opneIndexedDB({dbName:e}),s=l.result,i=s.objectStoreNames;if(i.contains(t)){let e=s.transaction(t,"readonly"),r=e.objectStore(t),l=r.get(a);l.addEventListener("success",()=>{n(l)})}else r("[".concat(t,"]オブジェクトストアが存在しません"))}),wirteIndexedDBValue=async e=>{let{dbName:t,data:a,version:n=1,storeName:r}=e;return new Promise(async(e,l)=>{let s=await opneIndexedDB({dbName:t,version:n}),i=s.result,o=i.objectStoreNames;if(o.contains(r)){let t=i.transaction(r,"readwrite"),n=t.objectStore(r);n.add(a.value,a.key),t.addEventListener("complete",()=>{console.log("データを追加しました"),e(s)})}else l("[".concat(r,"]オブジェクトストアが存在しません"))})},deleteIndexedDBValue=(e,t,a)=>new Promise(async(n,r)=>{let l=await opneIndexedDB({dbName:e}),s=l.result,i=s.objectStoreNames;if(i.contains(t)){let e=s.transaction(t,"readwrite"),r=e.objectStore(t),l=r.delete(a);l.addEventListener("success",()=>{n(l)})}else r("[".concat(t,"]オブジェクトストアが存在しません"))})}},function(e){e.O(0,[442,952,971,472,744],function(){return e(e.s=2890)}),_N_E=e.O()}]);