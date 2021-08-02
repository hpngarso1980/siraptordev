(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{11:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n={name:"SaveButton",props:{text:{type:String,default:"Simpan"}}},o=r(1),a=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("CButton",{staticClass:"px-3",attrs:{color:"success"},on:{click:function(e){return t.$emit("click")}}},[r("CIcon",{staticClass:"mr-1",attrs:{name:"cil-check-circle"}}),t._v("\n  "+t._s(t.text)+"\n")],1)}),[],!1,null,null,null).exports},12:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(76),o=r(77),a={name:"PasswordInput",props:{value:{type:String,default:""},label:{type:String,default:""},error:{type:String,default:""}},data:function(){return{showPassword:!1}},computed:{passwordFieldType:function(){return this.showPassword?"text":"password"}},methods:{togglePassword:function(){this.showPassword=!this.showPassword}}},s=r(1),i=Object(s.a)(a,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("CInput",t._b({attrs:{value:t.value,type:t.passwordFieldType,required:""},on:{input:function(e){return t.$emit("input",e)}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v("\n    "+t._s(t.label)+"\n  ")]},proxy:!0},{key:"prepend-content",fn:function(){return[r("CIcon",{attrs:{name:"cil-lock-locked"}})]},proxy:!0},{key:"append-content",fn:function(){return[r("div",{staticStyle:{cursor:"pointer"},on:{click:t.togglePassword}},[t._v("\n      "+t._s(t.showPassword?"sembunyikan":"tampilkan")+"\n    ")])]},proxy:!0}])},"CInput",t.$attrs,!1),[t._v(" "),t._v(" "),t._v(" "),r("div",{staticClass:"invalid-feedback text-sentence-case",attrs:{slot:"invalid-feedback"},slot:"invalid-feedback"},[t._v("\n    "+t._s(t.error)+"\n  ")])])}),[],!1,null,null,null).exports,l={name:"ValidatedInput",components:{Datepicker:n.a,PasswordInput:i},props:{type:{type:String,default:"text"},rules:{type:String,default:""},vid:{type:String,default:""},label:{type:String,default:""},value:{type:[String,Number,Boolean,Date],default:null},errors:{type:Array,default:function(){return[]}},disabledDates:{type:Object,default:function(){return{}}}},methods:{getError:function(t){return t.length?t[0]:this.errors[0]}},id:o.id},c=Object(s.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ValidationProvider",{attrs:{rules:t.rules,vid:t.vid},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.errors;return["date"===t.type?[r("div",{staticClass:"form-group",attrs:{role:"group"}},[r("div",[t._v("\n        "+t._s(t.label)+"\n      ")]),t._v(" "),r("Datepicker",t._b({attrs:{value:t.value,language:t.$options.id,"input-class":{"is-invalid":t.getError(n),"form-control bg-white":!0},highlighted:{dates:[new Date]},"disabled-dates":t.disabledDates},on:{input:function(e){return t.$emit("input",e)}}},"Datepicker",t.$attrs,!1)),t._v(" "),t.getError(n)?r("div",{staticClass:"invalid-feedback text-sentence-case"},[t._v("\n        "+t._s(t.getError(n))+"\n      ")]):t._e()],1)]:"textarea"===t.type?r("CTextarea",t._b({attrs:{value:t.value,type:t.type,"is-valid":!t.getError(n)&&null},on:{input:function(e){return t.$emit("input",e)}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v("\n      "+t._s(t.label)+"\n    ")]},proxy:!0}])},"CTextarea",t.$attrs,!1),[t._v(" "),r("div",{staticClass:"invalid-feedback text-sentence-case",attrs:{slot:"invalid-feedback"},slot:"invalid-feedback"},[t._v("\n      "+t._s(t.getError(n))+"\n    ")])]):"password"===t.type?r("PasswordInput",t._b({attrs:{label:t.label,value:t.value,"is-valid":!t.getError(n)&&null,error:t.getError(n)},on:{input:function(e){return t.$emit("input",e)}}},"PasswordInput",t.$attrs,!1)):r("CInput",t._b({attrs:{value:t.value,type:t.type,"is-valid":!t.getError(n)&&null},on:{input:function(e){return t.$emit("input",e)}},scopedSlots:t._u([{key:"label",fn:function(){return[t._v("\n      "+t._s(t.label)+"\n    ")]},proxy:!0}])},"CInput",t.$attrs,!1),[t._v(" "),r("div",{staticClass:"invalid-feedback text-sentence-case",attrs:{slot:"invalid-feedback"},slot:"invalid-feedback"},[t._v("\n      "+t._s(t.getError(n))+"\n    ")])])]}}])})}),[],!1,null,null,null).exports},137:function(t,e,r){"use strict";var n=r(73);r.n(n).a},138:function(t,e,r){(t.exports=r(26)(!1)).push([t.i,".card-table .card-body {\n  padding: 0;\n}\n.card-table table thead tr th {\n  border-top: none;\n}",""])},169:function(t,e,r){"use strict";var n=r(90);r.n(n).a},170:function(t,e,r){(t.exports=r(26)(!1)).push([t.i,'.hidden-file-input[data-v-5dff3f3e] {\n  position: absolute;\n  height: 0;\n  width: 0;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\n.input-wrapper[data-v-5dff3f3e] {\n  position: relative;\n  cursor: pointer;\n}\n.input-wrapper[data-v-5dff3f3e]::after {\n  content: "Ganti";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 128px;\n  height: 128px;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #ffffff;\n  border-radius: 50%;\n  line-height: 128px;\n  transform: translate(-50%, -50%);\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n}\n.input-wrapper[data-v-5dff3f3e]:hover::after {\n  opacity: 1;\n}',""])},223:function(t,e,r){"use strict";r.r(e);var n=r(4),o=r(24),a=r(11),s=r(7),i=r(12),l={name:"PasswordForm",components:{ContentPanel:s.a,SaveButton:a.a,ValidatedInput:i.a},props:{errors:{type:Object,default:function(){return{}}}},data:function(){return{password:"",passwordConfirmation:""}},mounted:function(){o.a.$on("confirm-action",this.save)},beforeDestroy:function(){o.a.$off("confirm-action",this.save)},methods:{changeInput:function(){this.$emit("changeInput")},confirmSaveAction:function(){this.$root.confirmAction({type:"password-save",message:"Yakin ingin mengganti password?",successActionText:"Update Password"})},save:function(t){"password-save"===t.type&&this.$emit("save",{password:this.password,password_confirmation:this.passwordConfirmation})}}},c=r(1),u=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentPanel",{attrs:{title:"Ganti Password"}},[r("ValidationObserver",{ref:"formObserver",attrs:{slim:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.valid;return[r("CForm",[r("CRow",[r("CCol",{attrs:{lg:"10"}},[r("ValidatedInput",{attrs:{errors:t.errors.password,vid:"password",type:"password",label:"Password",rules:"required|max:255"},on:{input:t.changeInput},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),t._v(" "),r("CRow",[r("CCol",{attrs:{lg:"10"}},[r("ValidatedInput",{attrs:{errors:t.errors.password_confirmation,type:"password",label:"Konfirmasi Password",rules:"required|max:255|confirmed:password"},on:{input:t.changeInput},model:{value:t.passwordConfirmation,callback:function(e){t.passwordConfirmation=e},expression:"passwordConfirmation"}})],1)],1),t._v(" "),r("CRow",[r("CCol",[r("SaveButton",{attrs:{disabled:!n},on:{click:t.confirmSaveAction}})],1)],1)],1)]}}])})],1)}),[],!1,null,null,null).exports,d={name:"PhotoForm",components:{ContentPanel:s.a},props:{image:{type:String,default:""},errors:{type:Array,default:function(){return[]}}},data:function(){return{password:"",passwordConfirmation:""}},methods:{toggleFileExplorer:function(){var t=new MouseEvent("click");this.$refs.file.dispatchEvent(t)},setFile:function(t){var e=t.target.files;e.length>0&&this.$emit("input",e[0]),this.$refs.form.reset()}}},p=(r(169),Object(c.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentPanel",{attrs:{title:"Foto Profil"}},[r("form",{ref:"form"},[r("div",{staticClass:"text-center mt-3 input-wrapper",class:{"is-invalid":t.errors.length},on:{click:t.toggleFileExplorer}},[r("input",{ref:"file",staticClass:"hidden-file-input",attrs:{type:"file"},on:{input:t.setFile}}),t._v(" "),r("CImg",{staticClass:"border",attrs:{src:t.image||"/images/logo-dark-initial.png",width:"128",height:"128",shape:"rounded-circle"}})],1),t._v(" "),t.errors.length?r("div",{staticClass:"mt-2 invalid-feedback text-sentence-case text-center"},[t._v("\n      "+t._s(t.errors[0])+"\n    ")]):t._e()]),t._v(" "),r("CAlert",{staticClass:"mt-4 text-left",attrs:{color:"light"}},[t._v("\n    Ukuran foto maksimal 1MB dalam format .jpg, .jpeg atau .png.\n  ")]),t._v(" "),r("CButton",{staticClass:"mt-4",attrs:{color:"light",block:""},on:{click:function(e){return t.$emit("input",null)}}},[t._v("\n    Hapus Foto\n  ")])],1)}),[],!1,null,"5dff3f3e",null).exports),f={name:"ProfileForm",components:{ContentPanel:s.a,SaveButton:a.a,ValidatedInput:i.a},props:{profile:{type:Object,default:function(){return{}}}},data:function(){return{name:"",email:"",phone:""}},watch:{profile:function(){this.syncLocalData()}},mounted:function(){o.a.$on("confirm-action",this.save),this.syncLocalData()},beforeDestroy:function(){o.a.$off("confirm-action",this.save)},methods:{syncLocalData:function(){var t=this;Object.keys(this.profile).forEach((function(e){t[e]=t.profile[e]}))},confirmSaveAction:function(){this.$root.confirmAction({type:"profile-save",message:"Pastikan data profil sudah benar. Update profil?",successActionText:"Update profil"})},save:function(t){"profile-save"===t.type&&this.$emit("save",{name:this.name,email:this.email,phone:this.phone})}}},v=Object(c.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentPanel",{attrs:{title:"Profil"}},[r("ValidationObserver",{ref:"formObserver",attrs:{slim:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.valid;return[r("CForm",[r("CRow",[r("CCol",[r("ValidatedInput",{attrs:{type:"text",label:"Nama",rules:"required|max:500"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)],1),t._v(" "),r("CRow",[r("CCol",{attrs:{lg:"6"}},[r("ValidatedInput",{attrs:{type:"email",label:"Email",rules:"required|email|max:500"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),t._v(" "),r("CRow",[r("CCol",{attrs:{lg:"6"}},[r("ValidatedInput",{attrs:{type:"text",label:"No.Telepon",rules:"numeric|max:15"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1)],1),t._v(" "),r("CRow",[r("CCol",[r("SaveButton",{attrs:{disabled:!n},on:{click:t.confirmSaveAction}})],1)],1)],1)]}}])})],1)}),[],!1,null,null,null).exports,m=r(3),h=r(0);function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){w(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var y={name:"ProfileSettings",components:{PasswordForm:u,PhotoForm:p,ProfileForm:v},data:function(){return{passwordErrors:{},photoErrors:{}}},computed:g({},Object(n.e)(m.a,["profile"])),methods:g({},Object(n.b)(m.a,{updateProfile:function(t,e){var r=this;return t(h.mb,e).then((function(){r.$root.showSuccessNotification("Profil berhasil diperbarui."),r.$root.closeConfirmation()}))},updatePassword:function(t,e){var r=this;return t(h.kb,e).then((function(){r.$root.showSuccessNotification("Password berhasil diperbarui."),r.$root.closeConfirmation()})).catch((function(t){if(t.response){var e=t.response.data.errors;r.passwordErrors=e}}))},updatePhoto:function(t,e){var r=this;return t(h.lb,e).then((function(){r.$root.showSuccessNotification("Foto berhasil diperbarui.")})).catch((function(t){if(t.response){var e=t.response.data.errors;r.photoErrors=e}}))}}),{changePasswordInput:function(){this.passwordErrors={}}})},C=Object(c.a)(y,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("CRow",[r("CCol",{attrs:{lg:"6"}},[r("ProfileForm",{attrs:{profile:t.profile},on:{save:t.updateProfile}}),t._v(" "),r("PasswordForm",{attrs:{errors:t.passwordErrors},on:{changeInput:t.changePasswordInput,save:t.updatePassword}})],1),t._v(" "),r("CCol",{attrs:{lg:"4"}},[r("PhotoForm",{attrs:{image:t.profile.photo,errors:t.photoErrors.photo},on:{input:t.updatePhoto}})],1)],1)],1)}),[],!1,null,null,null);e.default=C.exports},7:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n={name:"ContentPanel",props:{title:{type:String,default:""},tableContent:{type:Boolean,default:!1},type:{type:String,default:""},backgroundColor:{type:String,default:""}},computed:{cardStyle:function(){return this.isScoreBoard&&this.backgroundColor?"border-color: ".concat(this.backgroundColor," !important;"):""},headerStyle:function(){return this.isScoreBoard&&this.backgroundColor?"background: ".concat(this.backgroundColor,";"):""},isScoreBoard:function(){return"score-board"===this.type}}},o=(r(137),r(1)),a=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("CCard",{staticClass:"mb-3 shadow-sm",class:{"border-0":!t.isScoreBoard,"card-table":t.tableContent},style:t.cardStyle,on:{click:function(e){return t.$emit("click")}}},[t.title||t.$slots.title?r("CCardHeader",{staticClass:"d-flex font-weight-bold py-3 text-uppercase",style:t.headerStyle},[t.isScoreBoard?t._e():r("CIcon",{staticClass:"flex-shrink-1 mr-3",attrs:{name:"cil-stream"}}),t._v(" "),r("div",{staticClass:"w-100"},[t._t("title",[t._v("\n        "+t._s(t.title)+"\n      ")])],2)],1):t._e(),t._v(" "),r("CCardBody",[t._t("default")],2)],1)}),[],!1,null,null,null).exports},73:function(t,e,r){var n=r(138);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(27)(n,o);n.locals&&(t.exports=n.locals)},90:function(t,e,r){var n=r(170);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(27)(n,o);n.locals&&(t.exports=n.locals)}}]);