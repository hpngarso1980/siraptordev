(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{20:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var r={name:"CancelButton",props:{text:{type:String,default:"Batal"}}},n=a(1),s=Object(n.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("CButton",{staticClass:"px-3",attrs:{color:"light"},on:{click:function(t){return e.$emit("click")}}},[a("CIcon",{staticClass:"mr-1",attrs:{name:"cil-x-circle"}}),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null).exports},21:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(9),n={props:{accessLevel:{type:String,default:r.a.manage}},computed:{canManage:function(){return this.accessLevel===r.a.manage},canSupervise:function(){return this.accessLevel===r.a.supervise},canReport:function(){return this.accessLevel===r.a.report},canView:function(){return this.accessLevel===r.a.view}}}},221:function(e,t,a){"use strict";a.r(t);var r=a(4),n=a(8),s={name:"SubAreaFilter",components:{CreateButton:a(22).a},props:{streams:{type:Array,default:function(){return[]}},areas:{type:Array,default:function(){return[]}}},data:function(){return{selectedStream:null,selectedArea:null}},computed:{streamOptions:function(){return this.streams.map((function(e){return{value:e.id,label:e.name}}))},areaOptions:function(){return this.areas.map((function(e){return{value:e.id,label:e.name}}))}},methods:{changeStream:function(e){this.selectedStream=e;var t=e&&e.value,a=this.streams.find((function(e){return e.id===t}));this.$emit("changeStream",a)},changeArea:function(e){this.selectedArea=e;var t=e&&e.value,a=this.areas.find((function(e){return e.id===t}));this.$emit("filter",{selectedArea:a})},createNew:function(){this.$emit("new")}}},o=a(1),i=Object(o.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("CRow",{staticClass:"mb-3"},[a("CCol",{attrs:{lg:"3"}},[a("VueSelect",{attrs:{value:e.selectedStream,options:e.streamOptions,placeholder:"Pilih Stream"},on:{input:e.changeStream}})],1),e._v(" "),a("CCol",{attrs:{lg:"3"}},[a("VueSelect",{attrs:{value:e.selectedArea,options:e.areaOptions,placeholder:"Pilih Area"},on:{input:e.changeArea}})],1),e._v(" "),a("CCol",[a("CreateButton",{staticClass:"float-right",attrs:{text:"Tambah Sub Area"},on:{click:e.createNew}})],1)],1)}),[],!1,null,null,null).exports,u=a(20),c=a(11),l=a(12),d=a(15),f=a(21);function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var b={name:"SubAreaForm",components:{CancelButton:u.a,SaveButton:c.a,ValidatedInput:l.a},mixins:[d.a,f.a],props:{selectedAreaId:{type:Number,default:null}},methods:{beforeReset:function(){this.$refs.formObserver.reset()},beforeSave:function(){return this.$refs.formObserver.validate()},formatBeforeSave:function(e){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){p(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e,{weight:Number(e.weight),area_id:this.selectedAreaId})}},formTitle:"Sub Area"},h=Object(o.a)(b,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ValidationObserver",{ref:"formObserver",attrs:{slim:""},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid;return[a("CModal",{attrs:{title:e.title,show:e.show,"close-on-backdrop":!1,size:"sm",centered:""},on:{"update:show":e.updateShow},scopedSlots:e._u([{key:"footer-wrapper",fn:function(){return[a("div",{staticClass:"p-3"},[a("SaveButton",{staticClass:"float-right",attrs:{disabled:!r},on:{click:e.save}}),e._v(" "),a("CancelButton",{staticClass:"float-right mr-2",on:{click:function(t){return e.updateShow(!1)}}})],1)]},proxy:!0}],null,!0)},[a("CForm",[a("ValidatedInput",{attrs:{disabled:!e.canManage,type:"text",label:"Nama",rules:"required|max:255"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}}),e._v(" "),a("ValidatedInput",{attrs:{disabled:!e.canManage,type:"number",label:"Bobot",rules:"required"},model:{value:e.formData.weight,callback:function(t){e.$set(e.formData,"weight",t)},expression:"formData.weight"}})],1)],1)]}}])})}),[],!1,null,null,null).exports,v=a(23),g=a(17),S=a(14),w=a(7),y=a(29),A=a(37),O={name:"SelfAssessmentSubAreaTable",components:{DeleteButton:v.a,EditButton:g.a,ContentPanel:w.a,TableNoItem:S.a},mixins:[y.a,A.a],props:{subAreas:{type:Array,default:function(){return[]}}},fields:[{label:"Sub Area",key:"name"},{label:"Bobot",key:"weight"},{label:"Tgl. Dibuat",key:"created_at"},{label:"Update Terakhir",key:"updated_at"},{label:"",key:"actions"}]},_=Object(o.a)(O,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentPanel",{attrs:{"table-content":""}},[a("CDataTable",{staticClass:"mb-4",attrs:{items:e.subAreas,fields:e.fields,hover:""},scopedSlots:e._u([{key:"created_at",fn:function(t){var r=t.item;return[a("td",[e._v("\n        "+e._s(e._f("toHumanDate")(r.created_at))+"\n      ")])]}},{key:"updated_at",fn:function(t){var r=t.item;return[a("td",[e._v("\n        "+e._s(e._f("toHumanDate")(r.updated_at))+"\n      ")])]}},{key:"actions",fn:function(t){var r=t.item;return[a("td",[e.editButtonShown?a("EditButton",{on:{click:function(t){return e.edit(r)}}}):e._e(),e._v(" "),e.deleteButtonShown?a("DeleteButton",{on:{click:function(t){return e.remove(r)}}}):e._e()],1)]}}])},[a("TableNoItem",{attrs:{slot:"no-items-view"},slot:"no-items-view"})],1),e._v(" "),a("CPagination",{attrs:{"active-page":e.currentPage,pages:e.pages,align:"center"},on:{"update:activePage":e.changePage}})],1)}),[],!1,null,null,null).exports,P=a(18),C=a(3),j=a(0),E=a(6),k=a(9);function D(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function B(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?D(Object(a),!0).forEach((function(t){$(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):D(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function $(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var T={name:"SelfAssessmentSubArea",components:{PageTitle:n.a,SubAreaFilter:i,SubAreaForm:h,SubAreaTable:_},mixins:[P.a],data:function(){return{selectedAreaId:null,selectedStreamId:null}},computed:B({},Object(r.e)(C.e,["areas","streams","subAreas"]),{canCreate:function(){return this.$root.hasPermissionTo(E.a.MANAGE_SELF_ASSESSMENT)},canEdit:function(){return this.$root.hasAnyPermissionTo([E.a.MANAGE_SELF_ASSESSMENT])},formAccessLevel:function(){var e=this.$root,t=e.hasPermissionTo,a=e.hasRole;return t(E.a.MANAGE_SELF_ASSESSMENT)?k.a.manage:a("supervisor")?k.a.supervise:t(E.a.REPORT_SELF_ASSESSMENT)?k.a.report:""}}),methods:B({},Object(r.b)(C.e,{getStreams:j.O,getAreas:j.B,getPaginatedData:function(e){return e(j.P,{area_id:this.selectedAreaId,page:this.currentPage})},handleCreate:j.j,handleUpdate:j.pb,handleRemove:function(e,t){return e(j.t,t.id)}}),{prepareData:function(){this.getStreams()},setDeleteConfirmationPayload:function(e){return{title:"sub area",data:e}},formatCreateSuccessMessage:function(){return"Sub area berhasil ditambahkan"},formatUpdateSuccessMessage:function(){return"Sub area berhasil diperbarui"},formatRemovalSuccessMessage:function(){return"Sub area berhasil dihapus"},formatRemovalFailedMessage:function(e,t){return t.response.data.errors.join(" ")},changeStream:function(e){this.selectedStreamId=e&&e.id||null,this.getAreas({stream_id:this.selectedStreamId})},filter:function(e){var t=e.selectedArea;this.selectedAreaId=t&&t.id||null,this.getPaginatedData()}})},x=Object(o.a)(T,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("CRow",[a("CCol",[a("PageTitle",{attrs:{title:"Master Data Sub Area"}}),e._v(" "),a("SubAreaFilter",{attrs:{"selected-stream-id":e.selectedStreamId,"selected-area-id":e.selectedAreaId,streams:e.streams.data,areas:e.areas.data},on:{changeStream:e.changeStream,filter:e.filter,new:e.create}}),e._v(" "),a("SubAreaTable",{attrs:{"sub-areas":e.subAreas.data,"current-page":e.currentPage,pages:e.pages,"delete-button-shown":e.canCreate,"edit-button-shown":e.canEdit},on:{edit:e.edit,remove:e.toggleDeleteConfirmation,changePage:e.changePage}}),e._v(" "),a("SubAreaForm",{attrs:{show:e.showForm,"edit-mode":e.editModeForm,"edited-data":e.editFormData,"access-level":e.formAccessLevel,"selected-area-id":e.selectedAreaId},on:{"update:show":function(t){e.showForm=t},save:e.save}})],1)],1)}),[],!1,null,null,null);t.default=x.exports},29:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={props:{editButtonShown:{type:Boolean,default:!0},deleteButtonShown:{type:Boolean,default:!0}},computed:{fields:function(){return this.$options.fields?this.editButtonShown||this.deleteButtonShown?this.$options.fields:this.$options.fields.filter((function(e){return"actions"!==e.key})):[]}},methods:{edit:function(e){this.$emit("edit",e)},remove:function(e){this.$emit("remove",e)}}}},37:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={props:{currentPage:{type:Number,default:1},pages:{type:Number,default:1}},methods:{changePage:function(e){this.$emit("changePage",e)}}}},9:function(e,t,a){"use strict";t.a={manage:"manage",supervise:"supervise",report:"report",view:"view"}}}]);