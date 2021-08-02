(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{226:function(e,t,r){"use strict";r.r(t);var a=r(4),n=r(22),o=r(8),s=r(122),i=r(121),l=r(11),u=r(12),c=r(32),d=r(15),m=r(68);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var v={name:"UserForm",components:{SaveButton:l.a,ValidatedInput:u.a,ValidatedSelect:c.a},mixins:[d.a],props:{roles:{type:Array,default:function(){return[]}},permissions:{type:Array,default:function(){return[]}}},computed:{roleOptions:function(){return this.roles.map((function(e){var t=e.name;return{value:t,label:Object(s.a)(t)}}))},roleSelected:function(){return this.formData.role},roleBasedPermissions:function(){var e=this,t=this.roles.find((function(t){return t.name===e.formData.role}));return t?t.permissions:[]},otherPermissions:function(){return Object(i.a)(this.permissions,this.roleBasedPermissions,"id")}},methods:{handleAdditionalPermissionsChange:function(e,t){var r=t.target.value,a=this.formData.additionalPermissions;this.formData.additionalPermissions=e?Object(m.b)(a,r):Object(m.a)(a,r)},formatBeforeEdit:function(e){return p({},this.$options.initialFormData,{},e,{role:e.role?e.role.name:null,password:null})},formatBeforeSave:function(e){var t=e.permissions.map((function(e){return e.name})),r=p({},e,{permissions:t.concat(this.formData.additionalPermissions)});return delete r.additionalPermissions,r},beforeReset:function(){this.$refs.formObserver.reset()},beforeSave:function(){return this.$refs.formObserver.validate()}},formTitle:"User",initialFormData:{name:"",email:"",phone:"",role:"",permissions:[],additionalPermissions:[],password:"password"}},h=r(1),g=Object(h.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ValidationObserver",{ref:"formObserver",attrs:{slim:""},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.valid;return[r("CModal",{attrs:{title:e.title,show:e.show,size:"sm","close-on-backdrop":!1,centered:""},on:{"update:show":e.updateShow},scopedSlots:e._u([{key:"footer-wrapper",fn:function(){return[r("div",{staticClass:"p-3"},[r("SaveButton",{staticClass:"float-right",attrs:{disabled:!a},on:{click:e.save}})],1)]},proxy:!0}],null,!0)},[r("CForm",[r("ValidatedInput",{attrs:{type:"text",label:"Nama",rules:"required|max:500"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}}),e._v(" "),r("ValidatedInput",{attrs:{type:"email",label:"Email",rules:"required|email|max:500"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}}),e._v(" "),r("ValidatedInput",{attrs:{type:"text",label:"No.Telepon",rules:"numeric|max:15"},model:{value:e.formData.phone,callback:function(t){e.$set(e.formData,"phone",t)},expression:"formData.phone"}}),e._v(" "),r("ValidatedSelect",{attrs:{options:e.roleOptions,placeholder:"Pilih role",rules:"required",label:"Role",reduce:function(e){return e.value}},model:{value:e.formData.role,callback:function(t){e.$set(e.formData,"role",t)},expression:"formData.role"}}),e._v(" "),e.roleSelected?[e.roleBasedPermissions.length?r("div",{staticClass:"form-group",attrs:{role:"group"}},[e._v("\n          Hak Akses Berdasarkan Jabatan\n          "),e._l(e.roleBasedPermissions,(function(t,a){return r("CInputCheckbox",{key:a,attrs:{checked:"",disabled:""},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("\n              "+e._s(t.name)+"\n            ")]},proxy:!0}],null,!0)})}))],2):e._e(),e._v(" "),e.otherPermissions.length?r("div",{staticClass:"form-group",attrs:{role:"group"}},[e._v("\n          Hak Akses Tambahan\n          "),e._l(e.otherPermissions,(function(t,a){return r("CInputCheckbox",{key:a,attrs:{value:t.name,checked:e.formData.additionalPermissions.includes(t.name)},on:{"update:checked":e.handleAdditionalPermissionsChange},scopedSlots:e._u([{key:"label",fn:function(){return[e._v("\n              "+e._s(t.name)+"\n            ")]},proxy:!0}],null,!0)})}))],2):e._e()]:e._e(),e._v(" "),r("ValidatedInput",{attrs:{type:"password",label:"Password"},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],2)],1)]}}])})}),[],!1,null,null,null).exports,y=r(23),_=r(17),P=r(14),O=r(7),k={name:"UserTable",components:{DeleteButton:y.a,EditButton:_.a,TableNoItem:P.a,ContentPanel:O.a},props:{users:{type:Array,default:function(){return[]}},currentPage:{type:Number,default:1},pages:{type:Number,default:1}},methods:{edit:function(e){this.$emit("edit",e)},remove:function(e){this.$emit("remove",e)},changePage:function(e){this.$emit("changePage",e)}},fields:[{label:"Nama",key:"name"},{label:"Email",key:"email"},{label:"No. Telepon",key:"phone"},{label:"Role",key:"role"},{label:"Tgl. Dibuat",key:"created_at"},{label:"Update Terakhir",key:"updated_at"},{label:"",key:"actions"}]},D=Object(h.a)(k,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentPanel",{attrs:{"table-content":""}},[r("CDataTable",{staticClass:"mb-4",attrs:{items:e.users,fields:e.$options.fields,hover:""},scopedSlots:e._u([{key:"phone",fn:function(t){var a=t.item;return[r("td",[e._v(e._s(a.phone||"-"))])]}},{key:"role",fn:function(t){var a=t.item;return[r("td",[e._v(e._s(a.role?a.role.name:"-"))])]}},{key:"created_at",fn:function(t){var a=t.item;return[r("td",[e._v(e._s(e._f("toHumanDateTime")(a.created_at)))])]}},{key:"updated_at",fn:function(t){var a=t.item;return[r("td",[e._v(e._s(e._f("toHumanDateTime")(a.updated_at)))])]}},{key:"actions",fn:function(t){var a=t.item;return[r("td",[r("CButtonGroup",[r("EditButton",{on:{click:function(t){return e.edit(a)}}}),e._v(" "),r("DeleteButton",{on:{click:function(t){return e.remove(a)}}})],1)],1)]}}])},[r("TableNoItem",{attrs:{slot:"no-items-view"},slot:"no-items-view"})],1),e._v(" "),r("CPagination",{attrs:{"active-page":e.currentPage,pages:e.pages,align:"center"},on:{"update:activePage":e.changePage}})],1)}),[],!1,null,null,null).exports,w=r(18),j=r(3),S=r(0);function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(Object(r),!0).forEach((function(t){$(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function $(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var T={name:"UsersSettings",components:{CreateButton:n.a,PageTitle:o.a,UserForm:g,UserTable:D},mixins:[w.a],computed:x({},Object(a.e)(j.g,["permissions","roles","users","meta"])),methods:x({},Object(a.b)(j.g,{prepareData:function(e){var t=this;return Promise.all([e(S.N),e(S.I)]).then((function(){t.getPaginatedData()}))},getPaginatedData:function(e){return e(S.W,this.currentPage)},handleCreate:S.l,handleUpdate:S.sb,handleRemove:function(e,t){return e(S.v,t.id)}}),{setDeleteConfirmationPayload:function(e){return{title:e.email,data:e}},formatCreateSuccessMessage:function(e){return"User ".concat(e.email," berhasil ditambahkan")},formatUpdateSuccessMessage:function(e){return"User ".concat(e.email," berhasil diperbarui")},formatRemovalSuccessMessage:function(e){return"User ".concat(e.email," berhasil dihapus")},formatRemovalFailedMessage:function(e){return"User ".concat(e.email," gagal dihapus")}})},B=Object(h.a)(T,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("PageTitle",{attrs:{title:"Pengaturan Pengguna"},scopedSlots:e._u([{key:"actions",fn:function(){return[r("CreateButton",{attrs:{text:"Tambah Pengguna"},on:{click:e.create}})]},proxy:!0}])}),e._v(" "),r("UserTable",{attrs:{users:e.users,"current-page":e.currentPage,pages:e.pages},on:{edit:e.edit,remove:e.toggleDeleteConfirmation,changePage:e.changePage}}),e._v(" "),r("UserForm",{attrs:{show:e.showForm,"edit-mode":e.editModeForm,"edited-data":e.editFormData,roles:e.roles,permissions:e.permissions},on:{"update:show":function(t){e.showForm=t},save:e.save}})],1)}),[],!1,null,null,null);t.default=B.exports},32:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var a={name:"ValidatedInput",props:{options:{type:Array,default:function(){return[]}},placeholder:{type:String,default:""},rules:{type:String,default:""},label:{type:String,default:""},value:{default:null}}},n=r(1),o=Object(n.a)(a,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ValidationProvider",{attrs:{rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){t.validated;var a=t.errors;return[r("div",{staticClass:"form-group",attrs:{role:"group"}},[r("div",[e._v("\n      "+e._s(e.label)+"\n    ")]),e._v(" "),r("VueSelect",e._b({class:{"is-invalid":a.length},attrs:{value:e.value,options:e.options,placeholder:e.placeholder},on:{input:function(t){return e.$emit("input",t)}}},"VueSelect",e.$attrs,!1)),e._v(" "),r("div",{staticClass:"invalid-feedback"},[e._v("\n      "+e._s(a[0])+"\n    ")])],1)]}}])})}),[],!1,null,null,null).exports}}]);