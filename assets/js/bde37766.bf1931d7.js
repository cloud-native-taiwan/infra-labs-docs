"use strict";(self.webpackChunknew_infra_labs_docs=self.webpackChunknew_infra_labs_docs||[]).push([[45],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),s=u(r),f=a,b=s["".concat(c,".").concat(f)]||s[f]||m[f]||l;return r?n.createElement(b,i(i({ref:t},p),{},{components:r})):n.createElement(b,i({ref:t},p))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=f;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[s]="string"==typeof e?e:a,i[1]=o;for(var u=2;u<l;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2025:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const l={},i="\u5efa\u7acb VM (Launch Instances)",o={unversionedId:"tutorial-basics/create-vm",id:"tutorial-basics/create-vm",title:"\u5efa\u7acb VM (Launch Instances)",description:"\u9996\u5148\uff0c\u9032\u5165\u904b\u7b97 -> \u96f2\u5be6\u4f8b\uff0c\u9ede\u64ca\u53f3\u65b9 \u767c\u52d5\u96f2\u5be6\u4f8b \u76f8\u7e7c\u8f38\u5165\u4ee5\u4e0b\u5167\u5bb9",source:"@site/docs/tutorial-basics/create-vm.md",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/create-vm",permalink:"/docs/tutorial-basics/create-vm",draft:!1,editUrl:"https://github.com/cloud-native-taiwan/Infra-Labs-Docs/tree/main/docs/tutorial-basics/create-vm.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"\u5efa\u7acb\u5b89\u5168\u6027\u7fa4\u7d44",permalink:"/docs/tutorial-basics/create-security-group"},next:{title:"Congratulations!",permalink:"/docs/tutorial-basics/congratulations"}},c={},u=[],p={toc:u};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u5efa\u7acb-vm-launch-instances"},"\u5efa\u7acb VM (Launch Instances)"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u9032\u5165\u904b\u7b97 -> ",(0,a.kt)("a",{parentName:"p",href:"https://openstack.cloudnative.tw/project/instances/"},"\u96f2\u5be6\u4f8b"),"\uff0c\u9ede\u64ca\u53f3\u65b9 ",(0,a.kt)("strong",{parentName:"p"},"\u767c\u52d5\u96f2\u5be6\u4f8b")," \u76f8\u7e7c\u8f38\u5165\u4ee5\u4e0b\u5167\u5bb9"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8a73\u7d30\u8cc7\u8a0a",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u96f2\u5be6\u4f8b\u540d\u7a31\uff08\u865b\u64ec\u6a5f\u540d\u7a31\uff09"),(0,a.kt)("li",{parentName:"ul"},"\u8a08\u6578\uff08\u865b\u64ec\u6a5f\u6578\u91cf\uff09"))),(0,a.kt)("li",{parentName:"ul"},"\u4f86\u6e90",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u9078\u64c7\u4e0b\u65b9\u7684\u53ef\u7528\u93e1\u50cf\u76f4\u63a5\u958b\u6a5f\uff08\u82e5\u60a8\u9700\u8981\u5176\u4ed6\u93e1\u50cf\uff0c\u8acb\u806f\u7e6b\u7ba1\u7406\u54e1\uff09"))),(0,a.kt)("li",{parentName:"ul"},"\u985e\u578b",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u865b\u64ec\u6a5f\u7684\u898f\u683c"))),(0,a.kt)("li",{parentName:"ul"},"\u7db2\u8def",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u9078\u64c7\u81ea\u5df1\u5efa\u7acb\u7684\u79c1\u6709\u7db2\u8def"),(0,a.kt)("li",{parentName:"ul"},"\u6216\u9078\u64c7 ",(0,a.kt)("inlineCode",{parentName:"li"},"publicv4")," \u76f4\u63a5\u4f7f\u7528 Public IPv4 \u5730\u5740"))),(0,a.kt)("li",{parentName:"ul"},"\u5b89\u5168\u6027\u7fa4\u7d44",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u9078\u64c7\u81ea\u5df1\u8a2d\u5b9a\u597d\u7684\u5b89\u5168\u7fa4\u7d44\u3002\n\u5728\u9810\u8a2d\u60c5\u6cc1\u4e0b\uff0cdefault \u5b89\u5168\u7fa4\u7d44\u7981\u6b62\u6240\u6709\u5916\u90e8\u6d41\u91cf\u9023\u5165"))),(0,a.kt)("li",{parentName:"ul"},"Key Pair",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u9078\u64c7\u9700\u8981 Access VM \u7684 SSH Key\u3002")))),(0,a.kt)("p",null,"\u5efa\u7acb VM \u5f8c\uff0c\u6703\u81ea\u52d5\u5efa\u7acb <VM \u540d\u7a31>.<\u5c08\u6848\u540d\u7a31>.infra.cloudnative.tw \u7684 DNS record \u6307\u81f3\u6b64 VM\u3002"),(0,a.kt)("p",null,"\u9810\u8a2d\u767b\u5165\u5e33\u865f\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Ubuntu: ubuntu"),(0,a.kt)("li",{parentName:"ul"},"Debian: debian")))}s.isMDXComponent=!0}}]);