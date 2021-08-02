(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{20:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n={name:"CancelButton",props:{text:{type:String,default:"Batal"}}},r=a(1),o=Object(r.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("CButton",{staticClass:"px-3",attrs:{color:"light"},on:{click:function(t){return e.$emit("click")}}},[a("CIcon",{staticClass:"mr-1",attrs:{name:"cil-x-circle"}}),e._v("\n  "+e._s(e.text)+"\n")],1)}),[],!1,null,null,null).exports},21:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(9),r={props:{accessLevel:{type:String,default:n.a.manage}},computed:{canManage:function(){return this.accessLevel===n.a.manage},canSupervise:function(){return this.accessLevel===n.a.supervise},canReport:function(){return this.accessLevel===n.a.report},canView:function(){return this.accessLevel===n.a.view}}}},227:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a(8),o=a(22),s=a(20),i=a(11),u=a(12),c=a(15),l=a(21),f={name:"StreamForm",components:{CancelButton:s.a,SaveButton:i.a,ValidatedInput:u.a},mixins:[c.a,l.a],methods:{beforeReset:function(){this.$refs.formObserver.reset()},beforeSave:function(){return this.$refs.formObserver.validate()}},formTitle:"Stream"},m=a(1),d=Object(m.a)(f,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ValidationObserver",{ref:"formObserver",attrs:{slim:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.valid;return[a("CModal",{attrs:{title:e.title,show:e.show,"close-on-backdrop":!1,size:"sm",centered:""},on:{"update:show":e.updateShow},scopedSlots:e._u([{key:"footer-wrapper",fn:function(){return[a("div",{staticClass:"p-3"},[a("SaveButton",{staticClass:"float-right",attrs:{disabled:!n},on:{click:e.save}}),e._v(" "),a("CancelButton",{staticClass:"float-right mr-2",on:{click:function(t){return e.updateShow(!1)}}})],1)]},proxy:!0}],null,!0)},[a("CForm",[a("ValidatedInput",{attrs:{disabled:!e.canManage,type:"text",label:"Nama",rules:"required|max:255"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1)],1)]}}])})}),[],!1,null,null,null).exports,p=a(23),h=a(17),v=a(14),b=a(7),g=a(29),S=a(37),_={name:"SelfAssessmentStreamTable",components:{DeleteButton:p.a,EditButton:h.a,ContentPanel:b.a,TableNoItem:v.a},mixins:[g.a,S.a],props:{streams:{type:Array,default:function(){return[]}}},fields:[{label:"Nama",key:"name"},{label:"Jumlah Area",key:"area_count"},{label:"Tgl. Dibuat",key:"created_at"},{label:"Update Terakhir",key:"updated_at"},{label:"",key:"actions"}]},y=Object(m.a)(_,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentPanel",{attrs:{"table-content":""}},[a("CDataTable",{staticClass:"mb-4",attrs:{items:e.streams,fields:e.fields,hover:""},scopedSlots:e._u([{key:"area_count",fn:function(){return[a("td",[e._v("\n        -\n      ")])]},proxy:!0},{key:"created_at",fn:function(t){var n=t.item;return[a("td",[e._v("\n        "+e._s(e._f("toHumanDate")(n.created_at))+"\n      ")])]}},{key:"updated_at",fn:function(t){var n=t.item;return[a("td",[e._v("\n        "+e._s(e._f("toHumanDate")(n.updated_at))+"\n      ")])]}},{key:"actions",fn:function(t){var n=t.item;return[a("td",[e.editButtonShown?a("EditButton",{on:{click:function(t){return e.edit(n)}}}):e._e(),e._v(" "),e.deleteButtonShown?a("DeleteButton",{on:{click:function(t){return e.remove(n)}}}):e._e()],1)]}}])},[a("TableNoItem",{attrs:{slot:"no-items-view"},slot:"no-items-view"})],1),e._v(" "),a("CPagination",{attrs:{"active-page":e.currentPage,pages:e.pages,align:"center"},on:{"update:activePage":e.changePage}})],1)}),[],!1,null,null,null).exports,w=a(18),P=a(3),O=a(0),C=a(6),k=a(9);function E(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function B(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?E(Object(a),!0).forEach((function(t){D(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):E(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var T={name:"SelfAssessmentStream",components:{CreateButton:o.a,PageTitle:r.a,StreamForm:d,StreamTable:y},mixins:[w.a],computed:B({},Object(n.e)(P.e,["streams"]),{canCreate:function(){return this.$root.hasPermissionTo(C.a.MANAGE_SELF_ASSESSMENT)},canEdit:function(){return this.$root.hasAnyPermissionTo([C.a.MANAGE_SELF_ASSESSMENT])},formAccessLevel:function(){var e=this.$root,t=e.hasPermissionTo,a=e.hasRole;return t(C.a.MANAGE_SELF_ASSESSMENT)?k.a.manage:a("supervisor")?k.a.supervise:t(C.a.REPORT_SELF_ASSESSMENT)?k.a.report:""}}),methods:B({},Object(n.b)(P.e,{getPaginatedData:function(e){return e(O.O,{page:this.currentPage})},handleCreate:O.i,handleUpdate:O.ob,handleRemove:function(e,t){return e(O.s,t.id)}}),{prepareData:function(){this.getPaginatedData()},setDeleteConfirmationPayload:function(e){return{title:"stream",data:e}},formatCreateSuccessMessage:function(){return"Stream berhasil ditambahkan"},formatUpdateSuccessMessage:function(){return"Stream berhasil diperbarui"},formatRemovalSuccessMessage:function(){return"Stream berhasil dihapus"},formatRemovalFailedMessage:function(e,t){return t.response.data.errors.join(" ")}})},j=Object(m.a)(T,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("CRow",[a("CCol",{attrs:{lg:"10",sm:"12"}},[a("PageTitle",{attrs:{title:"Master Data Stream"},scopedSlots:e._u([{key:"actions",fn:function(){return[a("CreateButton",{attrs:{text:"Tambah Stream"},on:{click:e.create}})]},proxy:!0}])}),e._v(" "),a("StreamTable",{attrs:{streams:e.streams.data,"current-page":e.currentPage,pages:e.pages,"delete-button-shown":e.canCreate,"edit-button-shown":e.canEdit},on:{edit:e.edit,remove:e.toggleDeleteConfirmation,changePage:e.changePage}}),e._v(" "),a("StreamForm",{attrs:{show:e.showForm,"edit-mode":e.editModeForm,"edited-data":e.editFormData,"access-level":e.formAccessLevel},on:{"update:show":function(t){e.showForm=t},save:e.save}})],1)],1)}),[],!1,null,null,null);t.default=j.exports},29:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n={props:{editButtonShown:{type:Boolean,default:!0},deleteButtonShown:{type:Boolean,default:!0}},computed:{fields:function(){return this.$options.fields?this.editButtonShown||this.deleteButtonShown?this.$options.fields:this.$options.fields.filter((function(e){return"actions"!==e.key})):[]}},methods:{edit:function(e){this.$emit("edit",e)},remove:function(e){this.$emit("remove",e)}}}},37:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n={props:{currentPage:{type:Number,default:1},pages:{type:Number,default:1}},methods:{changePage:function(e){this.$emit("changePage",e)}}}},9:function(e,t,a){"use strict";t.a={manage:"manage",supervise:"supervise",report:"report",view:"view"}}}]);