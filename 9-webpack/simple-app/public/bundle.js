(()=>{"use strict";var e={241:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formData=void 0,t.formData=e=>{const t=e.querySelectorAll("input");let o={};return t.forEach((e=>{o[e.id]=e.value})),o}},607:(e,t,o)=>{const r=o(241),n=document.querySelector("form");n.addEventListener("submit",(e=>{e.preventDefault();const t=r.formData(n);console.log(t)})),console.log("Hi there!"),console.log({}.speak())}},t={};!function o(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r](n,n.exports,o),n.exports}(607)})();