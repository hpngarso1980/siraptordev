(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{236:function(s,t,r){"use strict";r.r(t);r(5);var e={name:"UserLogin",data:function(){return{email:"",password:"",fieldErrors:{email:"",password:""},showPassword:!1}},computed:{fieldErrorsOccurred:function(){var s=this.fieldErrors;return s.email||s.password},emailIsValid:function(){return!this.fieldErrors.email&&null},passwordIsValid:function(){return!this.fieldErrors.password&&null},passwordFieldType:function(){return this.showPassword?"text":"password"}},methods:{togglePassword:function(){this.showPassword=!this.showPassword},clearFieldErrors:function(){this.fieldErrors={email:"",password:""}},revalidateErrors:function(){this.fieldErrorsOccurred&&this.clearFieldErrors()},handleError:function(s){var t=this,r=s.data;if(422===s.status){var e=r.errors;Object.keys(e).forEach((function(s){t.fieldErrors[s]=e[s].join(" ")}))}},login:function(){var s=this;this.$root.login(this.email,this.password).catch((function(t){s.handleError(t.response)}))}}},a=r(1),o=Object(a.a)(e,(function(){var s=this,t=s.$createElement,r=s._self._c||t;return r("CContainer",{staticClass:"d-flex align-items-center justify-content-center min-vh-100"},[r("CRow",[r("CCol",{attrs:{md:"8"}},[r("CCard",{staticClass:"p-4 shadow-lg border-0",staticStyle:{width:"400px"}},[r("CCardBody",[r("CForm",{on:{submit:function(t){return t.preventDefault(),s.login(t)}}},[r("div",{staticClass:"d-block text-center mb-5"},[r("CImg",{staticClass:"w-50",attrs:{src:"/images/logo-full.png",alt:"Logo SIRAPTOR"}})],1),s._v(" "),r("CInput",{attrs:{placeholder:"Email",autocomplete:"email","is-valid":s.emailIsValid,required:""},on:{input:s.revalidateErrors},scopedSlots:s._u([{key:"prepend-content",fn:function(){return[r("CIcon",{attrs:{name:"cil-user"}})]},proxy:!0}]),model:{value:s.email,callback:function(t){s.email=t},expression:"email"}},[s._v(" "),r("div",{staticClass:"invalid-feedback text-capitalize",attrs:{slot:"invalid-feedback"},slot:"invalid-feedback"},[s._v("\n                "+s._s(s.fieldErrors.email)+"\n              ")])]),s._v(" "),r("CInput",{attrs:{placeholder:"Password",type:s.passwordFieldType,autocomplete:"curent-password","is-valid":s.passwordIsValid,required:""},on:{input:s.revalidateErrors},scopedSlots:s._u([{key:"prepend-content",fn:function(){return[r("CIcon",{attrs:{name:"cil-lock-locked"}})]},proxy:!0},{key:"append-content",fn:function(){return[r("div",{staticStyle:{cursor:"pointer"},on:{click:s.togglePassword}},[s._v("\n                  "+s._s(s.showPassword?"sembunyikan":"tampilkan")+"\n                ")])]},proxy:!0}]),model:{value:s.password,callback:function(t){s.password=t},expression:"password"}},[s._v(" "),s._v(" "),r("div",{staticClass:"invalid-feedback text-capitalize",attrs:{slot:"invalid-feedback"},slot:"invalid-feedback"},[s._v("\n                "+s._s(s.fieldErrors.password)+"\n              ")])]),s._v(" "),r("CRow",{staticClass:"mt-5"},[r("CCol",{attrs:{col:"12"}},[r("CButton",{staticClass:"px-4",attrs:{type:"submit",size:"lg",color:"success",block:""},on:{click:s.login}},[s._v("\n                  Masuk\n                ")])],1),s._v(" "),r("CCol",{staticClass:"text-center mt-3",attrs:{col:"12"}},[r("CButton",{staticClass:"px-0",attrs:{color:"link",block:""}},[s._v("\n                  Lupa kata sandi?\n                ")])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);