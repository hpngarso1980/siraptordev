(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{137:function(t,e,n){"use strict";var r=n(73);n.n(r).a},138:function(t,e,n){(t.exports=n(26)(!1)).push([t.i,".card-table .card-body {\n  padding: 0;\n}\n.card-table table thead tr th {\n  border-top: none;\n}",""])},141:function(t,e,n){"use strict";var r=n(80);n.n(r).a},142:function(t,e,n){(t.exports=n(26)(!1)).push([t.i,"\n.level-2 .padded{\n  padding-left: 12px;\n}\n.level-3 .padded {\n  padding-left: 24px;\n}\n",""])},143:function(t,e,n){"use strict";var r=n(81);n.n(r).a},144:function(t,e,n){(t.exports=n(26)(!1)).push([t.i,"\n.gauge__percentage {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 2em;\n}\n",""])},17:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r={name:"EditButton"},a=n(1),i=Object(a.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CButton",{staticClass:"px-3",attrs:{size:"sm",color:"success",variant:"outline",title:"Edit"},on:{click:function(e){return t.$emit("click")}}},[n("CIcon",{staticClass:"mr-1",attrs:{name:"cil-pencil"}})],1)}),[],!1,null,null,null).exports},215:function(t,e,n){"use strict";n.r(e);var r=n(13),a=n.n(r),i=n(4),o=n(3),s=n(0),l=n(8),c=n(17),u=n(7),d=n(94),p=n(38),m=[{label:"#",key:"actions"},{label:"Kode",key:"code",sorter:!0,sort:!0,filter:!0},{label:"Indikator",key:"indicator",filter:!0},{label:"Satuan",key:"unit"},{label:"Bobot",key:"weight",sorter:!0},{label:"Prioritas",key:"priority",sorter:!0,filter:!0}];function f(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var v=[{label:"Pencapaian",value:"accomplishmentPercentage"},{label:"Nilai",value:"score"},{label:"Realisasi/Target",value:"realizationByTarget"}],y={name:"PerformanceDetail",components:{EditButton:c.a,ContentPanel:u.a},props:{title:{type:String,default:""},indicators:{type:Array,default:function(){return[]}},month:{type:Number,default:null},cumulative:{type:Boolean,default:!1},deduction:{type:Boolean,default:!1}},data:function(){return{valueType:"accomplishmentPercentage"}},computed:{flatIndicators:function(){return Object(d.a)(this.indicators)},fields:function(){return[].concat(f(m),f(this.monthFields))},monthFields:function(){var t=this.cumulative,e=this.month;if(!t)return[{key:e,label:p.a[e-1],sorter:!0}];for(var n=[],r=1;r<=e;r+=1)n.push({key:r,label:p.a[r-1]});return n},valueTypes:function(){return this.deduction?v.filter((function(t){return"score"===t.value})):v}},watch:{deduction:function(){this.initiateSelectedValueTypes()}},mounted:function(){this.initiateSelectedValueTypes()},methods:{initiateSelectedValueTypes:function(){this.valueType=this.valueTypes[0].value},getAssessmentByMonth:function(t,e){return t.find((function(t){return t.month===e}))},renderAssessmentData:function(t){var e={accomplishmentPercentage:"0%",score:0,realizationByTarget:"0 / 0"};if(t){var n=t.realization,r=t.target,a=t.score,i=t.accomplishment_percentage;e.accomplishmentPercentage="".concat(i,"%"),e.score=a,e.realizationByTarget="".concat(n||"-"," / ").concat(r||"-")}return e[this.valueType]}}},b=(n(141),n(1)),g=Object(b.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ContentPanel",{attrs:{title:t.title,"table-content":""},scopedSlots:t._u([{key:"title",fn:function(){return[n("div",{staticClass:"float-left"},[t._v("\n        "+t._s(t.title)+"\n      ")]),t._v(" "),n("div",{staticClass:"float-right"},[n("div",{staticClass:"float-left mr-2"},[t._v("\n          Tampilkan:\n        ")]),t._v(" "),n("CSelect",{staticClass:"float-left mb-0",attrs:{value:t.valueType,options:t.valueTypes,size:"sm"},on:{"update:value":function(e){t.valueType=e}}})],1)]},proxy:!0}])},[t._v(" "),n("CDataTable",{attrs:{items:t.flatIndicators,fields:t.fields,hover:""},scopedSlots:t._u([{key:"actions",fn:function(e){var r=e.item;return[n("td",[n("EditButton",{on:{click:function(e){return t.$emit("edit",r)}}})],1)]}},{key:"code",fn:function(e){var r=e.item;return[n("td",[n("div",{staticClass:"padded"},[t._v("\n            "+t._s(r.code)+"\n          ")])])]}},{key:"indicator",fn:function(e){var r=e.item;return[n("td",[n("div",{staticClass:"padded",staticStyle:{width:"250px"}},[t._v("\n            "+t._s(r.indicator)+"\n          ")])])]}},{key:"unit",fn:function(e){var r=e.item;return[n("td",[t._v("\n          "+t._s(r.unit||"-")+"\n        ")])]}},{key:"priority",fn:function(e){var r=e.item;return[n("td",[t._v("\n          "+t._s(r.assessments&&r.assessments.length&&r.assessments[0].priority||"-")+"\n        ")])]}},t._l(t.monthFields,(function(e){var r=e.key;return{key:r,fn:function(e){var a=e.item;return[n("td",{key:a.id+"-"+r},[t._v("\n          "+t._s(t.renderAssessmentData(t.getAssessmentByMonth(a.assessments,r)))+"\n        ")])]}}}))],null,!0)})],1)],1)}),[],!1,null,null,null).exports,_=n(5),w=n(47);function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(Object(n),!0).forEach((function(e){k(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function S(t,e,n,r,a,i,o){try{var s=t[i](o),l=s.value}catch(t){return void n(t)}s.done?e(l):Promise.resolve(l).then(r,a)}function x(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){S(i,r,a,o,s,"next",t)}function s(t){S(i,r,a,o,s,"throw",t)}o(void 0)}))}}var P=["Bulan","Target","Realisasi","Nilai","Pencapaian","Prioritas","Catatan"],j=["Target","Realisasi","Pencapaian"],T={name:"PerformanceDetailForm",components:{BaseActionButton:w.a},props:{indicator:{type:Object,default:function(){return{}}},month:{type:Number,default:null},templateId:{type:Number,default:null},cumulative:{type:Boolean,default:!1},show:{type:Boolean,default:!1},parent:{type:Boolean,default:!1},deduction:{type:Boolean,default:!1}},data:function(){return{formRows:[],assessments:[]}},computed:{title:function(){var t=this.cumulative?"kumulatif":"bulanan",e=p.a[this.month-1]||"";return"Monitoring kinerja ".concat(t," ").concat(e)},assessmentColumns:function(){return this.deduction?P.filter((function(t){return!j.includes(t)})):P}},watch:{show:function(t){var e=this;return x(a.a.mark((function n(){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t){n.next=6;break}return n.next=3,e.getAssessments();case 3:e.formRows=e.generateFormRows(),n.next=7;break;case 6:e.formRows=[];case 7:case"end":return n.stop()}}),n)})))()},assessments:function(){this.formRows=this.generateFormRows()}},methods:O({},Object(i.b)(o.d,{updateAssessment:s.hb}),{submitChange:function(t){var e=this.formRows[t];this.updateRowData(e)},getAssessments:function(){var t=this,e={indicator_id:this.indicator.id,template_id:this.templateId,month:this.month,cumulative:this.cumulative};return _.a.getPerformanceMonitoringAssessments(e).then((function(e){var n=e.data.data;n.length&&Array.isArray(n[0].assessments)&&(t.assessments=n[0].assessments)}))},updateRowData:function(t){var e=this;return x(a.a.mark((function n(){var r;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.updateAssessment(O({},t,{type:e.cumulative?2:1}));case 3:r=n.sent,e.assessments=e.assessments.map((function(t){return t.id===r.id?r:t})),e.$emit("assessment-updated"),e.$root.showSuccessNotification("Berhasil menyimpan penilaian"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),e.$root.showErrorNotification("Gagal menyimpan penilaian");case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},generateFormRows:function(){var t=this.month;if(!t)return[];for(var e=[],n=1;n<=t;n+=1)e.push(this.getAssessmentByMonth(n));return e},getAssessmentByMonth:function(t){var e=this.assessments.find((function(e){return e.month===t}));return e||{month:t,target:0,realization:0,accomplishment_percentage:0,score:0,performance_indicator_id:this.indicator.id,priority:null}},changeRow:function(t,e){this.formRows[t]=O({},this.formRows[t],{},e)},updateShow:function(t){this.$emit("update:show",t)}}),months:p.a},I=Object(b.a)(T,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CModal",{attrs:{title:t.title,show:t.show,size:"xl","close-on-backdrop":!1,centered:""},on:{"update:show":t.updateShow},scopedSlots:t._u([{key:"footer-wrapper",fn:function(){return[n("div")]},proxy:!0}])},[n("table",{staticClass:"mb-4"},[n("tr",[n("td",{staticClass:"pr-4"},[n("strong",[t._v("Indikator")])]),t._v(" "),n("td",{staticClass:"pr-2"},[t._v("\n        :\n      ")]),t._v(" "),n("td",[t._v(t._s(t.indicator&&t.indicator.indicator))])]),t._v(" "),n("tr",[n("td",{staticClass:"pr-4"},[n("strong",[t._v("Bobot")])]),t._v(" "),n("td",{staticClass:"pr-2"},[t._v("\n        :\n      ")]),t._v(" "),n("td",[t._v(t._s(t.indicator&&t.indicator.weight||"-"))])])]),t._v(" "),n("CForm",[n("table",{staticClass:"w-100"},[n("thead",[n("tr",t._l(t.assessmentColumns,(function(e,r){return n("th",{key:r,staticClass:"pr-4"},[t._v("\n            "+t._s(e)+"\n          ")])})),0)]),t._v(" "),n("tbody",{staticClass:"align-top"},t._l(t.formRows,(function(e,r){return n("tr",{key:r},[n("td",{staticClass:"pr-4",attrs:{width:"100"}},[t._v("\n            "+t._s(t.$options.months[e.month-1])+"\n          ")]),t._v(" "),t.deduction?t._e():n("td",{staticClass:"pr-4",attrs:{width:"100"}},[t.parent?n("span",[t._v("\n              -\n            ")]):n("CInput",{attrs:{type:"number",min:"0",value:e.target},on:{change:function(e){return t.changeRow(r,{target:e})}}})],1),t._v(" "),t.deduction?t._e():n("td",{staticClass:"pr-4",attrs:{width:"100"}},[t.parent?[t._v("\n              -\n            ")]:n("CInput",{attrs:{type:"number",min:"0",value:e.realization},on:{change:function(e){return t.changeRow(r,{realization:e})}}})],2),t._v(" "),n("td",{staticClass:"pr-4",attrs:{width:"100"}},[t.deduction?n("CInput",{attrs:{type:"number",min:"0",value:e.score},on:{change:function(e){return t.changeRow(r,{score:e})}}}):[t._v("\n              "+t._s(e.score)+"\n            ")]],2),t._v(" "),t.deduction?t._e():n("td",{staticClass:"pr-4"},[t._v("\n            "+t._s(e.accomplishment_percentage)+"%\n          ")]),t._v(" "),n("td",{staticClass:"pr-4",attrs:{width:"80"}},[n("CInput",{attrs:{type:"number",value:e.priority},on:{change:function(e){return t.changeRow(r,{priority:e})}}})],1),t._v(" "),n("td",{staticClass:"pr-4",attrs:{width:"400"}},[n("CTextarea",{attrs:{value:e.note},on:{change:function(e){return t.changeRow(r,{note:e})}}})],1),t._v(" "),n("td",{staticClass:"pr-4"},[n("BaseActionButton",{attrs:{text:"Simpan"},on:{click:function(e){return t.submitChange(r)}}})],1)])})),0)])])],1)}),[],!1,null,null,null).exports,R={name:"PerformanceGauge",components:{ContentPanel:u.a},props:{title:{type:String,default:""},accomplishmentPercentage:{type:Number,default:0},weight:{type:Number,default:0},score:{type:Number,default:0}},computed:{textColor:function(){return this.decideColor(this.accomplishmentPercentage,["text-danger","text-warning","text-success"])},gaugeColor:function(){return this.decideColor(this.accomplishmentPercentage,["#D44949","#E3932D","#26A350"])}},methods:{decideColor:function(t,e){return t<95?e[0]:t>=95&&t<99.9?e[1]:e[2]}}},B=(n(143),Object(b.a)(R,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentPanel",{on:{click:function(e){return t.$emit("click")}}},[n("h5",{staticClass:"font-weight-normal mb-3 text-center text-uppercase"},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),n("VueSvgGauge",{attrs:{"start-angle":-110,"end-angle":110,"inner-radius":80,value:t.accomplishmentPercentage,min:0,max:100,"gauge-color":t.gaugeColor,"scale-interval":1,"separator-step":0}}),t._v(" "),n("h5",{staticClass:"text-center font-weight-normal mt-3"},[n("div",[t._v("Bobot: "+t._s(t.weight))]),t._v(" "),n("div",[t._v("Nilai: "+t._s(t.score))])]),t._v(" "),n("div",{staticClass:"gauge__percentage",class:t.textColor},[t._v("\n    "+t._s(t.accomplishmentPercentage)+"%\n  ")])],1)}),[],!1,null,null,null).exports),D={name:"ValueHolder",components:{ContentPanel:u.a},props:{title:{type:String,default:""},value:{type:Number,default:0}}},A={name:"PerformanceSummaries",components:{PerformanceGauge:B,ValueHolder:Object(b.a)(D,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentPanel",{on:{click:function(e){return t.$emit("click")}}},[n("h5",{staticClass:"font-weight-normal mb-3 text-center text-uppercase"},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),n("div",{staticClass:"text-center font-weight-bold",staticStyle:{"font-size":"2.5em"}},[t._v("\n    "+t._s(t.value)+"\n  ")])])}),[],!1,null,null,null).exports},props:{summaries:{type:Object,default:function(){return{}}}},data:function(){return{keyPrefix:(new Date).getTime()}},computed:{summaryGauges:function(){return this.summaries?Object.values(this.summaries).filter((function(t){return"performance"===t.type})):[]},summaryValues:function(){return this.summaries?Object.values(this.summaries).filter((function(t){return"performance"!==t.type})):[]}},watch:{summaries:function(){this.keyPrefix=(new Date).getTime()}},methods:{showDetail:function(t){this.$emit("showDetail",t)}}},E=Object(b.a)(A,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CRow",[t._l(t.summaryGauges,(function(e){return n("CCol",{key:""+e.slug+t.keyPrefix,attrs:{lg:"4"}},[n("PerformanceGauge",{staticClass:"clickable-block",attrs:{title:e.title,"accomplishment-percentage":e.accomplishment_percentage,weight:e.weight,score:e.score},on:{click:function(n){return t.showDetail(e)}}})],1)})),t._v(" "),n("CCol",t._l(t.summaryValues,(function(e){return n("CRow",{key:e.slug},[n("CCol",[n("ValueHolder",{class:{"clickable-block":"final-score"!==e.slug},attrs:{title:e.title,value:e.score},on:{click:function(n){return t.showDetail(e)}}})],1)],1)})),1)],2)}),[],!1,null,null,null).exports,$={name:"ActivateFilterButton",props:{text:{type:String,default:"Tampilkan"}}},M=Object(b.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CButton",{staticClass:"px-3",attrs:{color:"dark",variant:"outline"},on:{click:function(e){return t.$emit("click")}}},[n("CIcon",{staticClass:"mr-1",attrs:{name:"cil-magnifying-glass"}}),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null).exports,F=p.a.map((function(t,e){return{value:e+1,label:t}})),N={name:"ReportFilter",components:{ActivateFilterButton:M},props:{templates:{type:Array,default:function(){return[]}},selectedTemplateId:{type:Number,default:null},selectedMonth:{type:Number,default:null},selectedReportType:{type:String,default:"cumulative"}},data:function(){return{internalSelectedTemplateId:this.selectedTemplateId,internalSelectedMonth:this.selectedMonth,internalSelectedReportType:this.selectedReportType}},computed:{templateOptions:function(){return this.templates.map((function(t){return{value:t.id,label:t.name}}))}},watch:{selectedTemplateId:function(){this.syncKeys("internalSelectedTemplateId","selectedTemplateId")},selectedMonth:function(){this.syncKeys("internalSelectedMonth","selectedMonth")},selectedReportType:function(){this.syncKeys("internalSelectedReportType","selectedReportType")}},methods:{syncKeys:function(t,e){this[t]!==this[e]&&(this[t]=this[e])},filter:function(){this.$emit("filter",{templateId:this.internalSelectedTemplateId,month:this.internalSelectedMonth,reportType:this.internalSelectedReportType})}},monthOptions:F,reportTypeOptions:[{label:"Kumulatif",value:"cumulative"},{label:"Bulanan",value:"monthly"}]},z=Object(b.a)(N,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CRow",{staticClass:"mb-3"},[n("CCol",{attrs:{lg:"2"}},[n("CSelect",{attrs:{value:t.internalSelectedTemplateId,options:t.templateOptions,placeholder:"Pilih Template"},on:{"update:value":function(e){t.internalSelectedTemplateId=e}}})],1),t._v(" "),n("CCol",{attrs:{lg:"2"}},[n("CSelect",{attrs:{value:t.internalSelectedMonth,options:t.$options.monthOptions,placeholder:"Pilih bulan"},on:{"update:value":function(e){t.internalSelectedMonth=e}}})],1),t._v(" "),n("CCol",{attrs:{lg:"2"}},[n("CSelect",{attrs:{value:t.internalSelectedReportType,options:t.$options.reportTypeOptions,placeholder:"Jenis Laporan"},on:{"update:value":function(e){t.internalSelectedReportType=e}}})],1),t._v(" "),n("CCol",{attrs:{lg:"3"}},[n("ActivateFilterButton",{on:{click:t.filter}})],1)],1)}),[],!1,null,null,null).exports;function G(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}function V(t,e,n,r,a,i,o){try{var s=t[i](o),l=s.value}catch(t){return void n(t)}s.done?e(l):Promise.resolve(l).then(r,a)}function J(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){V(i,r,a,o,s,"next",t)}function s(t){V(i,r,a,o,s,"throw",t)}o(void 0)}))}}function K(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function H(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?K(Object(n),!0).forEach((function(e){U(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function U(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var q={name:"PerformanceMonitoring",components:{PageTitle:l.a,PerformanceDetail:g,PerformanceDetailForm:I,PerformanceSummaries:E,ReportFilter:z},data:function(){return{selectedTemplateId:null,selectedMonth:null,selectedReportType:"cumulative",openedGroup:null,detailSection:{show:!1,title:"",indicators:[]},editIndicator:{show:!1,indicator:null,month:null,cumulative:!1,assessments:[]}}},computed:H({},Object(i.e)(o.d,["latestFilter","summaries","detail","templates"]),{cumulativeReport:function(){return"cumulative"===this.selectedReportType},isDeduction:function(){return this.openedGroup&&"deduction"===this.openedGroup.type}}),mounted:function(){var t=this;return J(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getTemplates();case 2:return e.next=4,t.syncRouteFilter();case 4:return e.next=6,t.fetchDataByRoute();case 6:case"end":return e.stop()}}),e)})))()},methods:H({},Object(i.b)(o.d,{getAssessments:function(t){return t(s.C,{group_id:this.openedGroup.performance_indicator_group_id,template_id:this.selectedTemplateId,month:this.selectedMonth,cumulative:"cumulative"===this.selectedReportType})},getTemplates:s.U,getSummaries:s.Q,setLatestFilter:s.bb,updateAssessment:s.hb}),{filter:function(t){var e=t.templateId,n={month:t.month,reportType:t.reportType,template_id:e};this.hideDetail(),this.syncRouteFilter(n),this.fetchDataByRoute()},syncRouteFilter:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.templateId,n=t.month,r=t.reportType,a=this.latestFilter,i=a.templateId,o=a.month,s=a.reportType,l=this.$route.query,c=l.month,u=l.template_id,d=l.reportType,p=Number(u),m=Number(c),f=new Date,h=f.getFullYear(),v=f.getMonth()+1,y=this.templates.find((function(t){return t.name.includes(h)})),b=y?y.id:null,g={template_id:e||p||i||b,month:n||m||o||v,reportType:r||d||s||"cumulative"};g.template_id===p&&g.month===m&&g.reportType===d||this.$router.push({query:g})},fetchDataByRoute:function(){var t=this.$route.query,e=t.template_id,n=t.month,r=t.reportType;this.selectedTemplateId=Number(e),this.selectedMonth=Number(n),this.selectedReportType=r,this.setLatestFilter({month:n,reportType:r,template_id:this.selectedTemplateId}),this.getSummaries()},showDetail:function(t){var e=this;return J(a.a.mark((function n(){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("final-score"===t.slug){n.next=8;break}if(!e.openedGroup||e.openedGroup.performance_indicator_group_id!==t.performance_indicator_group_id){n.next=4;break}return e.hideDetail(),n.abrupt("return");case 4:return e.openedGroup=t,n.next=7,e.getAssessments();case 7:e.detailSection={indicators:e.detail,show:!0,title:t.title};case 8:case"end":return n.stop()}}),n)})))()},hideDetail:function(){this.openedGroup=null,this.detailSection={indicators:[],show:!1,title:""}},showIndicatorEditor:function(t){t.assessments;var e=G(t,["assessments"]);this.editIndicator={show:!0,indicator:e,month:this.selectedMonth,cumulative:this.cumulativeReport,assessments:t.assessments,hasChildren:t.has_children}},updateIndicatorEditor:function(t){t||this.hideIndicatorEditor()},hideIndicatorEditor:function(){this.editIndicator={show:!1,indicator:null,month:null,cumulative:!1,assessments:[]}},handleAssessmentUpdated:function(){var t=this;return J(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.getSummaries(),t.getAssessments()]);case 2:t.detailSection=H({},t.detailSection,{indicators:t.detail});case 3:case"end":return e.stop()}}),e)})))()}})},L=Object(b.a)(q,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("PageTitle",{attrs:{title:"Monitoring Kinerja"}}),t._v(" "),n("ReportFilter",{attrs:{templates:t.templates,"selected-template-id":t.selectedTemplateId,"selected-month":t.selectedMonth,"selected-report-type":t.selectedReportType},on:{filter:t.filter}}),t._v(" "),n("PerformanceSummaries",{attrs:{summaries:t.summaries},on:{showDetail:t.showDetail}}),t._v(" "),t.detailSection.show?n("PerformanceDetail",{attrs:{title:t.detailSection.title,indicators:t.detailSection.indicators,month:t.selectedMonth,deduction:t.isDeduction},on:{edit:t.showIndicatorEditor}}):t._e(),t._v(" "),n("PerformanceDetailForm",{attrs:{show:t.editIndicator.show,indicator:t.editIndicator.indicator,month:t.editIndicator.month,parent:t.editIndicator.hasChildren,"template-id":t.selectedTemplateId,cumulative:t.cumulativeReport,deduction:t.isDeduction},on:{"update:show":t.updateIndicatorEditor,"assessment-updated":t.handleAssessmentUpdated}})],1)}),[],!1,null,null,null);e.default=L.exports},38:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a}));var r=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],a={1:{title:"Belum dikerjakan",background:"#CA3B3B",textColor:"#ffffff"},2:{title:"Dokumen terunggah",background:"#DA773A",textColor:"#ffffff"},3:{title:"Revisi",background:"#F3C050",textColor:"#222222"},4:{title:"Selesai",background:" #219B53",textColor:"#ffffff"}}},47:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r={name:"BaseActionButton",props:{color:{type:String,default:"info"},text:{type:String,default:""},icon:{type:String,name:""},size:{type:String,default:"sm"}}},a=n(1),i=Object(a.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CButton",{staticClass:"px-3",attrs:{color:t.color,size:t.size},on:{click:function(e){return t.$emit("click")}}},[t.icon?n("CIcon",{staticClass:"mr-1",attrs:{name:t.icon}}):t._e(),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null).exports},7:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r={name:"ContentPanel",props:{title:{type:String,default:""},tableContent:{type:Boolean,default:!1},type:{type:String,default:""},backgroundColor:{type:String,default:""}},computed:{cardStyle:function(){return this.isScoreBoard&&this.backgroundColor?"border-color: ".concat(this.backgroundColor," !important;"):""},headerStyle:function(){return this.isScoreBoard&&this.backgroundColor?"background: ".concat(this.backgroundColor,";"):""},isScoreBoard:function(){return"score-board"===this.type}}},a=(n(137),n(1)),i=Object(a.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CCard",{staticClass:"mb-3 shadow-sm",class:{"border-0":!t.isScoreBoard,"card-table":t.tableContent},style:t.cardStyle,on:{click:function(e){return t.$emit("click")}}},[t.title||t.$slots.title?n("CCardHeader",{staticClass:"d-flex font-weight-bold py-3 text-uppercase",style:t.headerStyle},[t.isScoreBoard?t._e():n("CIcon",{staticClass:"flex-shrink-1 mr-3",attrs:{name:"cil-stream"}}),t._v(" "),n("div",{staticClass:"w-100"},[t._t("title",[t._v("\n        "+t._s(t.title)+"\n      ")])],2)],1):t._e(),t._v(" "),n("CCardBody",[t._t("default")],2)],1)}),[],!1,null,null,null).exports},73:function(t,e,n){var r=n(138);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(27)(r,a);r.locals&&(t.exports=r.locals)},8:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r={name:"PageTitle",props:{title:{type:String,default:"Judul Halaman"}}},a=n(1),i=Object(a.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"mb-5 d-flex flex-row justify-content-between"},[e("div",{staticClass:"w-50"},[this._v("\n    "+this._s(this.title)+"\n  ")]),this._v(" "),e("div",[this._t("actions")],2)])}),[],!1,null,null,null).exports},80:function(t,e,n){var r=n(142);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(27)(r,a);r.locals&&(t.exports=r.locals)},81:function(t,e,n){var r=n(144);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(27)(r,a);r.locals&&(t.exports=r.locals)},94:function(t,e,n){"use strict";function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n={1:"bg-gray-light font-weight-bold text-dark level-1",2:"bg-gray-super-light font-weight-bold text-dark level-2",3:"text-black-50 level-3"},r=[];return t.forEach((function(t){var i=t.assessments,l=t.children,c=o(t,["assessments","children"]),u=n[e]||"";r.push(a({},c,{assessments:i,has_children:l&&!!l.length,_classes:u})),Array.isArray(l)&&l.length>0&&(r=r.concat(s(l,e+1)))})),r}n.d(e,"a",(function(){return s}))}}]);