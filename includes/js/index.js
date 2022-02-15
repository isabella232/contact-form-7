!function(){"use strict";const e=e=>Math.abs(parseInt(e,10)),t=(e,t)=>{const n=new Map([["init","init"],["validation_failed","invalid"],["acceptance_missing","unaccepted"],["spam","spam"],["aborted","aborted"],["mail_sent","sent"],["mail_failed","failed"],["submitting","submitting"],["resetting","resetting"],["payment_required","payment-required"]]);n.has(t)&&(t=n.get(t)),Array.from(n.values()).includes(t)||(t=`custom-${t=(t=t.replace(/[^0-9a-z]+/i," ").trim()).replace(/\s+/,"-")}`);const r=e.getAttribute("data-status");return e.wpcf7.status=t,e.setAttribute("data-status",t),e.classList.add(t),r&&r!==t&&e.classList.remove(r),t},n=(e,t,n)=>{const r=new CustomEvent(`wpcf7${t}`,{bubbles:!0,detail:n});"string"==typeof e&&(e=document.querySelector(e)),e.dispatchEvent(r)},r=e=>{const{root:t,namespace:n="contact-form-7/v1"}=wpcf7.api;return a.reduceRight(((e,t)=>n=>t(n,e)),(e=>{let r,a,{url:c,path:o,endpoint:s,headers:i,body:l,data:d,...u}=e;"string"==typeof s&&(r=n.replace(/^\/|\/$/g,""),a=s.replace(/^\//,""),o=a?r+"/"+a:r),"string"==typeof o&&(-1!==t.indexOf("?")&&(o=o.replace("?","&")),o=o.replace(/^\//,""),c=t+o),i={Accept:"application/json, */*;q=0.1",...i},delete i["X-WP-Nonce"],d&&(l=JSON.stringify(d),i["Content-Type"]="application/json");const p={code:"fetch_error",message:"You are probably offline."},f={code:"invalid_json",message:"The response is not a valid JSON response."};return window.fetch(c||o||window.location.href,{...u,headers:i,body:l}).then((e=>Promise.resolve(e).then((e=>{if(e.status>=200&&e.status<300)return e;throw e})).then((e=>{if(204===e.status)return null;if(e&&e.json)return e.json().catch((()=>{throw f}));throw f}))),(()=>{throw p}))}))(e)},a=[];function c(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(wpcf7.blocked)return o(e),void t(e,"submitting");const c=new FormData(e);a.submitter&&a.submitter.name&&c.append(a.submitter.name,a.submitter.value);const s={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(c,(e=>{const t=e[0],n=e[1];return!t.match(/^_/)&&{name:t,value:n}})).filter((e=>!1!==e)),formData:c},i=t=>{const n=document.createElement("li");n.setAttribute("id",t.error_id),t.idref?n.insertAdjacentHTML("beforeend",`<a href="#${t.idref}">${t.message}</a>`):n.insertAdjacentText("beforeend",t.message),e.wpcf7.parent.querySelector(".screen-reader-response ul").appendChild(n)},l=t=>{const n=e.querySelector(t.into),r=n.querySelector(".wpcf7-form-control");r.classList.add("wpcf7-not-valid"),r.setAttribute("aria-describedby",t.error_id);const a=document.createElement("span");a.setAttribute("class","wpcf7-not-valid-tip"),a.setAttribute("aria-hidden","true"),a.insertAdjacentText("beforeend",t.message),n.appendChild(a),n.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","true")})),r.closest(".use-floating-validation-tip")&&(r.addEventListener("focus",(e=>{a.setAttribute("style","display: none")})),a.addEventListener("mouseover",(e=>{a.setAttribute("style","display: none")})))};r({endpoint:`contact-forms/${e.wpcf7.id}/feedback`,method:"POST",body:c,wpcf7:{endpoint:"feedback",form:e,detail:s}}).then((r=>{const a=t(e,r.status);return s.status=r.status,s.apiResponse=r,["invalid","unaccepted","spam","aborted"].includes(a)?n(e,a,s):["sent","failed"].includes(a)&&n(e,`mail${a}`,s),n(e,"submit",s),r})).then((t=>{t.posted_data_hash&&(e.querySelector('input[name="_wpcf7_posted_data_hash"]').value=t.posted_data_hash),"mail_sent"===t.status&&(e.reset(),e.wpcf7.resetOnMailSent=!0),t.invalid_fields&&(t.invalid_fields.forEach(i),t.invalid_fields.forEach(l)),e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').insertAdjacentText("beforeend",t.message),e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=t.message}))})).catch((e=>console.error(e)))}r.use=e=>{a.unshift(e)},r.use(((e,r)=>{if(e.wpcf7&&"feedback"===e.wpcf7.endpoint){const{form:r,detail:a}=e.wpcf7;o(r),n(r,"beforesubmit",a),t(r,"submitting")}return r(e)}));const o=e=>{e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').innerText="",e.wpcf7.parent.querySelector(".screen-reader-response ul").innerText="",e.querySelectorAll(".wpcf7-not-valid-tip").forEach((e=>{e.remove()})),e.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","false")})),e.querySelectorAll(".wpcf7-form-control").forEach((e=>{e.removeAttribute("aria-describedby"),e.classList.remove("wpcf7-not-valid")})),e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=""}))};function s(e){const a=new FormData(e),c={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(a,(e=>{const t=e[0],n=e[1];return!t.match(/^_/)&&{name:t,value:n}})).filter((e=>!1!==e)),formData:a};r({endpoint:`contact-forms/${e.wpcf7.id}/refill`,method:"GET",wpcf7:{endpoint:"refill",form:e,detail:c}}).then((r=>{e.wpcf7.resetOnMailSent?(delete e.wpcf7.resetOnMailSent,t(e,"mail_sent")):t(e,"init"),c.apiResponse=r,n(e,"reset",c)})).catch((e=>console.error(e)))}r.use(((e,n)=>{if(e.wpcf7&&"refill"===e.wpcf7.endpoint){const{form:n,detail:r}=e.wpcf7;o(n),t(n,"resetting")}return n(e)}));const i=(e,t)=>{for(const n in t){const r=t[n];e.querySelectorAll(`input[name="${n}"]`).forEach((e=>{e.value=""})),e.querySelectorAll(`img.wpcf7-captcha-${n}`).forEach((e=>{e.setAttribute("src",r)}));const a=/([0-9]+)\.(png|gif|jpeg)$/.exec(r);a&&e.querySelectorAll(`input[name="_wpcf7_captcha_challenge_${n}"]`).forEach((e=>{e.value=a[1]}))}},l=(e,t)=>{for(const n in t){const r=t[n][0],a=t[n][1];e.querySelectorAll(`.wpcf7-form-control-wrap.${n}`).forEach((e=>{e.querySelector(`input[name="${n}"]`).value="",e.querySelector(".wpcf7-quiz-label").textContent=r,e.querySelector(`input[name="_wpcf7_quiz_answer_${n}"]`).value=a}))}};function d(t){const n=new FormData(t);t.wpcf7={id:e(n.get("_wpcf7")),status:t.getAttribute("data-status"),pluginVersion:n.get("_wpcf7_version"),locale:n.get("_wpcf7_locale"),unitTag:n.get("_wpcf7_unit_tag"),containerPost:e(n.get("_wpcf7_container_post")),parent:t.closest(".wpcf7"),schema:{}},t.querySelectorAll(".has-spinner").forEach((e=>{e.insertAdjacentHTML("afterend",'<span class="wpcf7-spinner"></span>')})),(e=>{e.querySelectorAll(".wpcf7-exclusive-checkbox").forEach((t=>{t.addEventListener("change",(t=>{const n=t.target.getAttribute("name");e.querySelectorAll(`input[type="checkbox"][name="${n}"]`).forEach((e=>{e!==t.target&&(e.checked=!1)}))}))}))})(t),(e=>{e.querySelectorAll(".has-free-text").forEach((t=>{const n=t.querySelector("input.wpcf7-free-text"),r=t.querySelector('input[type="checkbox"], input[type="radio"]');n.disabled=!r.checked,e.addEventListener("change",(e=>{n.disabled=!r.checked,e.target===r&&r.checked&&n.focus()}))}))})(t),(e=>{e.querySelectorAll(".wpcf7-validates-as-url").forEach((e=>{e.addEventListener("change",(t=>{let n=e.value.trim();n&&!n.match(/^[a-z][a-z0-9.+-]*:/i)&&-1!==n.indexOf(".")&&(n=n.replace(/^\/+/,""),n="http://"+n),e.value=n}))}))})(t),(e=>{if(!e.querySelector(".wpcf7-acceptance")||e.classList.contains("wpcf7-acceptance-as-validation"))return;const t=()=>{let t=!0;e.querySelectorAll(".wpcf7-acceptance").forEach((e=>{if(!t||e.classList.contains("optional"))return;const n=e.querySelector('input[type="checkbox"]');(e.classList.contains("invert")&&n.checked||!e.classList.contains("invert")&&!n.checked)&&(t=!1)})),e.querySelectorAll(".wpcf7-submit").forEach((e=>{e.disabled=!t}))};t(),e.addEventListener("change",(e=>{t()})),e.addEventListener("wpcf7reset",(e=>{t()}))})(t),(t=>{const n=(t,n)=>{const r=e(t.getAttribute("data-starting-value")),a=e(t.getAttribute("data-maximum-value")),c=e(t.getAttribute("data-minimum-value")),o=t.classList.contains("down")?r-n.value.length:n.value.length;t.setAttribute("data-current-value",o),t.innerText=o,a&&a<n.value.length?t.classList.add("too-long"):t.classList.remove("too-long"),c&&n.value.length<c?t.classList.add("too-short"):t.classList.remove("too-short")},r=e=>{e={init:!1,...e},t.querySelectorAll(".wpcf7-character-count").forEach((r=>{const a=r.getAttribute("data-target-name"),c=t.querySelector(`[name="${a}"]`);c&&(c.value=c.defaultValue,n(r,c),e.init&&c.addEventListener("keyup",(e=>{n(r,c)})))}))};r({init:!0}),t.addEventListener("wpcf7reset",(e=>{r()}))})(t),window.addEventListener("load",(e=>{wpcf7.cached&&t.reset()})),t.addEventListener("reset",(e=>{wpcf7.reset(t)})),t.addEventListener("submit",(e=>{const n=e.submitter;wpcf7.submit(t,{submitter:n}),e.preventDefault()})),t.addEventListener("wpcf7submit",(e=>{e.detail.apiResponse.captcha&&i(t,e.detail.apiResponse.captcha),e.detail.apiResponse.quiz&&l(t,e.detail.apiResponse.quiz)})),t.addEventListener("wpcf7reset",(e=>{e.detail.apiResponse.captcha&&i(t,e.detail.apiResponse.captcha),e.detail.apiResponse.quiz&&l(t,e.detail.apiResponse.quiz)})),r({endpoint:`contact-forms/${t.wpcf7.id}/feedback/schema`,method:"GET"}).then((e=>{t.wpcf7.schema=e})),t.addEventListener("change",(e=>{const n={field:e.target.name};try{wpcf7.validate(t,n)}catch(e){console.error(e)}}))}function u(e,t){this.code=e,this.message=t;for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];this.params=r}const p={required:function(e){const t=function(e,t){let n=[];for(const r of e.entries()){const e=r[0].replace(/\[.*\]$/,""),a=r[1];t===e&&""!==a&&n.push(a)}return n}(e,this.field);if(0===t.length)throw new u("invalid_required",this.message)}};function f(e,t){var n;const r=null!==(n=e.wpcf7.schema.rules)&&void 0!==n?n:[],a=new FormData(e);r.filter((e=>{let{field:n,...r}=e;return n===t.field})).forEach((e=>{let{rule:t,...n}=e;"function"==typeof p[t]&&p[t].call(n,a)}))}document.addEventListener("DOMContentLoaded",(e=>{var t;if("undefined"==typeof wpcf7)return void console.error("wpcf7 is not defined.");if(void 0===wpcf7.api)return void console.error("wpcf7.api is not defined.");if("function"!=typeof window.fetch)return void console.error("Your browser doesn't support window.fetch().");if("function"!=typeof window.FormData)return void console.error("Your browser doesn't support window.FormData().");const n=document.querySelectorAll(".wpcf7 > form");"function"==typeof n.forEach?(wpcf7={init:d,submit:c,reset:s,validate:f,...null!==(t=wpcf7)&&void 0!==t?t:{}},n.forEach((e=>wpcf7.init(e)))):console.error("Your browser doesn't support NodeList.forEach().")}))}();