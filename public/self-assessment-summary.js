(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{139:function(t,e,a){"use strict";var s=a(74);a.n(s).a},140:function(t,e,a){(t.exports=a(26)(!1)).push([t.i,".c-group-title .c-icon[data-v-48237dba] {\n  transition: transform 0.25s ease-in;\n}\n.c-group-title.is-collapsed .c-icon[data-v-48237dba] {\n  transform: rotate(180deg);\n}",""])},163:function(t,e,a){"use strict";var s=a(87);a.n(s).a},164:function(t,e,a){(t.exports=a(26)(!1)).push([t.i,".c-collapsible.is-collapsed > .c-collapsible__child {\n  height: 0;\n  overflow: hidden;\n}\n.c-summary__cell {\n  width: 80px;\n  padding: 0 8px;\n}",""])},237:function(t,e,a){"use strict";a.r(e);var s=a(4),i=a(93),n=a(8),l=a(91),r=a(58),o=a(3),c=a(0),u=a(38),d=a(39);function p(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return f(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,s=new Array(e);a<e;a++)s[a]=t[a];return s}function m(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function h(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?m(Object(a),!0).forEach((function(e){y(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function y(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var b={name:"SelfAssessmentSummary",components:{PageTitle:n.a,PageTitleActions:l.a,SwimlaneGroupTitle:r.a},data:function(){return{collapsedStreamIds:[],collapsedAreaGroupIds:[],collapsedAreaIds:[]}},computed:h({},Object(s.e)(o.b,["epics"]),{},Object(s.e)(o.e,["summary"]),{remainingDays:function(){if(this.epic&&this.epic.end_date)return Object(i.a)(new Date(this.epic.end_date),new Date)},epic:function(){var t=this;return this.epics.data.find((function(e){return e.id===Number(t.$route.params.id)}))||{}},isAllCollapsed:function(){return!!(this.collapsedStreamIds.length&&this.collapsedAreaGroupIds.length&&this.collapsedAreaIds.length)}}),mounted:function(){this.prepareData()},methods:h({toHumanDate:d.a},Object(s.b)(o.b,[c.F]),{},Object(s.b)(o.e,[c.R]),{prepareData:function(){var t=this;Promise.all([!this.epics.data.length&&this.getEpics()]).then((function(){t.epic.id?t.getSummary(t.epic.id).then((function(){return t.collapseAll()})):t.$router.push({name:"SelfAssessment"})}))},toggleCollapsible:function(){this.isAllCollapsed?(this.collapsedAreaIds=[],this.collapsedAreaGroupIds=[],this.collapsedStreamIds=[]):this.collapseAll()},collapseAll:function(){var t=[],e=[],a=[];this.summary.data.forEach((function(s){t.push(s.id),s.sub_tasks.forEach((function(t){e.push(t.id),t.sub_tasks.forEach((function(t){a.push(t.id)}))}))})),this.collapsedStreamIds=t,this.collapsedAreaGroupIds=e,this.collapsedAreaIds=a},toggleGroup:function(t,e){var a=this[t].indexOf(e);if(a>-1){var s=p(this[t]);s.splice(a,1),this[t]=s}else this[t]=[].concat(p(this[t]),[e])},toBoardPage:function(){this.$router.push({name:"SelfAssessmentBoard"})},viewStream:function(t){this.$router.push({name:"SelfAssessmentStreamSummary",params:{id:t,epicId:this.epic.id}})}}),taskStateMap:u.b},_=(a(163),a(1)),g=Object(_.a)(b,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("PageTitle",{attrs:{title:t.epic.title},scopedSlots:t._u([{key:"actions",fn:function(){return[a("PageTitleActions",{attrs:{"remaining-days":t.remainingDays,"show-summary-link":!1,"is-all-collapsed":t.isAllCollapsed,"show-board-link":"","show-collapsible-toggle":""},on:{toBoard:t.toBoardPage,toggleCollapsible:t.toggleCollapsible}})]},proxy:!0}])}),t._v(" "),a("SwimlaneGroupTitle",{staticClass:"py-3 border-bottom sticky-top",attrs:{title:"Item","secondary-title":["Status","Jml. Dokumen","Kuantitas","Bobot","Nilai","Nilai Terbobot","Target","Tgl. Selesai","#"],"secondary-title-class":"c-summary__cell text-uppercase font-weight-bold","hide-icon":""}}),t._v(" "),t._l(t.summary.data,(function(e,s){return a("div",{key:s,staticClass:"c-collapsible",class:{"is-collapsed":t.collapsedStreamIds.includes(e.id)}},[a("SwimlaneGroupTitle",{attrs:{title:e.title,"secondary-title":[t.$options.taskStateMap[e.state].title,e.quantity_achieved+"/"+e.quantity_target,(e.quantity_percentage||0)+"%","-",e.final_score||0,"-",e.score_target||"-",e.finished_at?t.toHumanDate(e.finished_at):"-"],"secondary-title-class":"c-summary__cell","is-collapsed":t.collapsedStreamIds.includes(e.id)},nativeOn:{click:function(a){return t.toggleGroup("collapsedStreamIds",e.id)}}},[a("div",{staticClass:"c-summary__cell",attrs:{slot:"actions"},slot:"actions"},[a("CButton",{attrs:{color:"info",size:"sm"},on:{click:function(a){return a.stopPropagation(),t.viewStream(e.id)}}},[t._v("\n          Detail\n        ")])],1)]),t._v(" "),t._l(e.sub_tasks,(function(e,i){return a("div",{key:s+"-"+i,staticClass:"c-collapsible c-collapsible__child",class:{"is-collapsed":t.collapsedAreaGroupIds.includes(e.id)}},[a("SwimlaneGroupTitle",{attrs:{title:e.title,"secondary-title":[t.$options.taskStateMap[e.state].title,e.quantity_achieved+"/"+e.quantity_target,(e.quantity_percentage||0)+"%",e.weight||"-",e.score||0,e.final_score||0,"-",e.finished_at?t.toHumanDate(e.finished_at):"-"],"secondary-title-class":"c-summary__cell","is-collapsed":t.collapsedAreaGroupIds.includes(e.id),"bg-color":"light"},nativeOn:{click:function(a){return t.toggleGroup("collapsedAreaGroupIds",e.id)}}},[a("div",{staticClass:"c-summary__cell",attrs:{slot:"actions"},slot:"actions"})]),t._v(" "),t._l(e.sub_tasks,(function(e,s){return a("div",{key:i+"-"+s,staticClass:"c-collapsible c-collapsible__child",class:{"is-collapsed":t.collapsedAreaIds.includes(e.id)}},[a("SwimlaneGroupTitle",{attrs:{title:e.title,"title-class":"font-weight-bold","secondary-title":[t.$options.taskStateMap[e.state].title,e.quantity_achieved+"/"+e.quantity_target,(e.quantity_percentage||0)+"%","-",e.final_score||0,"-",e.score_target||"-",e.finished_at?t.toHumanDate(e.finished_at):"-"],"secondary-title-class":"c-summary__cell","is-collapsed":t.collapsedAreaIds.includes(e.id),"bg-color":"light"},nativeOn:{click:function(a){return t.toggleGroup("collapsedAreaIds",e.id)}}},[a("div",{staticClass:"c-summary__cell",attrs:{slot:"actions"},slot:"actions"})]),t._v(" "),t._l(e.sub_tasks,(function(e,i){return a("div",{key:s+"-"+i,staticClass:"c-collapsible__child"},[a("SwimlaneGroupTitle",{attrs:{title:e.title,"title-class":"","secondary-title":[t.$options.taskStateMap[e.state].title,e.quantity_achieved,(e.quantity_percentage||0)+"%",e.weight||"-",e.score||0,e.final_score||0,e.score_target||"-",e.finished_at?t.toHumanDate(e.finished_at):"-"],"secondary-title-class":"c-summary__cell","is-collapsed":t.collapsedAreaIds.includes(e.id),"bg-color":"light","hide-icon":""}},[a("div",{staticClass:"c-summary__cell",attrs:{slot:"actions"},slot:"actions"})])],1)}))],2)}))],2)}))],2)}))],2)}),[],!1,null,null,null);e.default=g.exports},38:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}));var s=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],i={1:{title:"Belum dikerjakan",background:"#CA3B3B",textColor:"#ffffff"},2:{title:"Dokumen terunggah",background:"#DA773A",textColor:"#ffffff"},3:{title:"Revisi",background:"#F3C050",textColor:"#222222"},4:{title:"Selesai",background:" #219B53",textColor:"#ffffff"}}},58:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var s={name:"SwimlaneGroupTitle",props:{title:{type:String,default:""},titleClass:{type:String,default:"text-uppercase font-weight-bold"},secondaryTitle:{type:[String,Array],default:""},secondaryTitleClass:{type:String,default:"mr-2"},isCollapsed:{type:Boolean,default:!0},bgColor:{type:String,default:"white"},hideIcon:{type:Boolean,default:!1}}},i=(a(139),a(1)),n=Object(i.a)(s,(function(){var t,e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"\n    c-group-title\n    d-flex flex-row justify-content-between align-items-center\n    text-body shadow-sm px-3 py-2 rounded mb-2 u-pointer\n  ",class:(t={"is-collapsed":e.isCollapsed},t["bg-"+e.bgColor]=!0,t)},[s("div",{staticClass:"w-100 m-0 d-flex flex-row justify-content-between"},[s("span",{staticClass:"mr-4",class:e.titleClass},[e._v("\n      "+e._s(e.title)+"\n    ")]),e._v(" "),Array.isArray(e.secondaryTitle)?s("div",{staticClass:"d-flex flex-row align-items-center"},[e._l(e.secondaryTitle,(function(t,a){return s("small",{key:a,class:e.secondaryTitleClass},[e._v("\n        "+e._s(t)+"\n      ")])})),e._v(" "),e._t("actions")],2):s("small",[e._v("\n      "+e._s(e.secondaryTitle)+"\n    ")])]),e._v(" "),e.hideIcon?s("div",{staticClass:"ml-2",staticStyle:{width:"16px"}},[e._v("\n     \n  ")]):s("CIcon",{staticClass:"ml-2 flex-shrink-0",attrs:{name:"cil-chevron-top"}})],1)}),[],!1,null,"48237dba",null).exports},74:function(t,e,a){var s=a(140);"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a(27)(s,i);s.locals&&(t.exports=s.locals)},8:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var s={name:"PageTitle",props:{title:{type:String,default:"Judul Halaman"}}},i=a(1),n=Object(i.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"mb-5 d-flex flex-row justify-content-between"},[e("div",{staticClass:"w-50"},[this._v("\n    "+this._s(this.title)+"\n  ")]),this._v(" "),e("div",[this._t("actions")],2)])}),[],!1,null,null,null).exports},87:function(t,e,a){var s=a(164);"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a(27)(s,i);s.locals&&(t.exports=s.locals)},91:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var s={name:"PageTitleActions",props:{remainingDays:{type:Number,default:0},showSummaryLink:{type:Boolean,default:!0},showBoardLink:{type:Boolean,default:!1},showCollapsibleToggle:{type:Boolean,default:!1},isAllCollapsed:{type:Boolean,default:!1}}},i=a(1),n=Object(i.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("CButton",[a("CIcon",{staticClass:"mr-1",attrs:{name:"cil-clock"}}),t._v(" "),t.remainingDays>=0?[t._v("\n      tersisa "+t._s(t.remainingDays)+" hari\n    ")]:[t._v("\n      selesai\n    ")]],2),t._v(" "),t.showCollapsibleToggle?a("CButton",{staticClass:"btn-outline-dark ml-3",on:{click:function(e){return t.$emit("toggleCollapsible")}}},[t._v("\n    "+t._s(t.isAllCollapsed?"Tampilkan":"Sembunyikan")+" semua\n  ")]):t._e(),t._v(" "),t.showSummaryLink?a("CButton",{staticClass:"btn-dark ml-1",on:{click:function(e){return t.$emit("toSummary")}}},[t._v("\n    Ringkasan\n  ")]):t._e(),t._v(" "),t.showBoardLink?a("CButton",{staticClass:"btn-dark ml-1",on:{click:function(e){return t.$emit("toBoard")}}},[t._v("\n    Tampilan board\n  ")]):t._e()],1)}),[],!1,null,null,null).exports},93:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var s=a(71),i=a(16),n=a(10);function l(t){Object(n.a)(1,arguments);var e=Object(i.a)(t);return e.setHours(0,0,0,0),e}function r(t,e){Object(n.a)(2,arguments);var a=l(t),i=l(e),r=a.getTime()-Object(s.a)(a),o=i.getTime()-Object(s.a)(i);return Math.round((r-o)/864e5)}}}]);