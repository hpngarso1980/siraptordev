(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["action-plan-categories~management-action-plan~performance-monitoring-action-plan~performance-monitor~fc4815ee"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'CreateButton',
  props: {
    text: {
      type: String,
      "default": 'Tambah'
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'DeleteButton'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EditButton'
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=template&id=089b3932&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=template&id=089b3932& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "CButton",
    {
      staticClass: "px-3",
      attrs: { color: "success" },
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [
      _c("CIcon", { staticClass: "mr-1", attrs: { name: "cil-plus" } }),
      _vm._v("\n  " + _vm._s(_vm.text) + "\n")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=template&id=88e88072&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=template&id=88e88072& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "CButton",
    {
      staticClass: "px-3",
      attrs: {
        size: "sm",
        color: "danger",
        variant: "outline",
        title: "Hapus"
      },
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [_c("CIcon", { staticClass: "mr-1", attrs: { name: "cil-trash" } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=template&id=23ab4a32&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=template&id=23ab4a32& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "CButton",
    {
      staticClass: "px-3",
      attrs: {
        size: "sm",
        color: "success",
        variant: "outline",
        title: "Edit"
      },
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [_c("CIcon", { staticClass: "mr-1", attrs: { name: "cil-pencil" } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/atoms/CreateButton/CreateButton.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/atoms/CreateButton/CreateButton.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CreateButton_vue_vue_type_template_id_089b3932___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateButton.vue?vue&type=template&id=089b3932& */ "./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=template&id=089b3932&");
/* harmony import */ var _CreateButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateButton.vue?vue&type=script&lang=js& */ "./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CreateButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CreateButton_vue_vue_type_template_id_089b3932___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CreateButton_vue_vue_type_template_id_089b3932___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/atoms/CreateButton/CreateButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=template&id=089b3932&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=template&id=089b3932& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateButton_vue_vue_type_template_id_089b3932___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateButton.vue?vue&type=template&id=089b3932& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/CreateButton/CreateButton.vue?vue&type=template&id=089b3932&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateButton_vue_vue_type_template_id_089b3932___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateButton_vue_vue_type_template_id_089b3932___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/atoms/CreateButton/index.js":
/*!*************************************************************!*\
  !*** ./resources/js/components/atoms/CreateButton/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CreateButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateButton */ "./resources/js/components/atoms/CreateButton/CreateButton.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CreateButton__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./resources/js/components/atoms/DeleteButton/DeleteButton.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/atoms/DeleteButton/DeleteButton.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeleteButton_vue_vue_type_template_id_88e88072___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeleteButton.vue?vue&type=template&id=88e88072& */ "./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=template&id=88e88072&");
/* harmony import */ var _DeleteButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeleteButton.vue?vue&type=script&lang=js& */ "./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DeleteButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeleteButton_vue_vue_type_template_id_88e88072___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DeleteButton_vue_vue_type_template_id_88e88072___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/atoms/DeleteButton/DeleteButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DeleteButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=template&id=88e88072&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=template&id=88e88072& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteButton_vue_vue_type_template_id_88e88072___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DeleteButton.vue?vue&type=template&id=88e88072& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/DeleteButton/DeleteButton.vue?vue&type=template&id=88e88072&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteButton_vue_vue_type_template_id_88e88072___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteButton_vue_vue_type_template_id_88e88072___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/atoms/DeleteButton/index.js":
/*!*************************************************************!*\
  !*** ./resources/js/components/atoms/DeleteButton/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeleteButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeleteButton */ "./resources/js/components/atoms/DeleteButton/DeleteButton.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _DeleteButton__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/components/atoms/EditButton/EditButton.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/atoms/EditButton/EditButton.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditButton_vue_vue_type_template_id_23ab4a32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditButton.vue?vue&type=template&id=23ab4a32& */ "./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=template&id=23ab4a32&");
/* harmony import */ var _EditButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditButton.vue?vue&type=script&lang=js& */ "./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditButton_vue_vue_type_template_id_23ab4a32___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditButton_vue_vue_type_template_id_23ab4a32___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/atoms/EditButton/EditButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=template&id=23ab4a32&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=template&id=23ab4a32& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditButton_vue_vue_type_template_id_23ab4a32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditButton.vue?vue&type=template&id=23ab4a32& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/EditButton/EditButton.vue?vue&type=template&id=23ab4a32&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditButton_vue_vue_type_template_id_23ab4a32___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditButton_vue_vue_type_template_id_23ab4a32___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/atoms/EditButton/index.js":
/*!***********************************************************!*\
  !*** ./resources/js/components/atoms/EditButton/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditButton */ "./resources/js/components/atoms/EditButton/EditButton.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _EditButton__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./resources/js/mixins/crud-page/crud-page.js":
/*!****************************************************!*\
  !*** ./resources/js/mixins/crud-page/crud-page.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_hub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/event-hub */ "./resources/js/event-hub.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var deleteConfirmationLabel = 'data-deletion';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showForm: false,
      editModeForm: false,
      editFormData: {}
    };
  },
  mounted: function mounted() {
    _event_hub__WEBPACK_IMPORTED_MODULE_0__["default"].$on('confirm-action', this.confirmAction);
    this.prepareData();
  },
  beforeDestroy: function beforeDestroy() {
    _event_hub__WEBPACK_IMPORTED_MODULE_0__["default"].$off('confirm-action', this.confirmAction);
  },
  methods: {
    /**
     * Customizable methods
     *
     * You can add implementation for these methods
     * to fulfill your requirement
     */
    prepareData: function prepareData() {
      // Implement data preparation when component mounted
      return Promise.resolve();
    },
    beforeCreate: function beforeCreate() {// Implement actions before create form is activated
    },
    beforeEdit: function beforeEdit() {// Implement actions before edit form is activated
    },
    handleCreate: function handleCreate(data) {
      // Implement save action
      return Promise.resolve(data);
    },
    handleUpdate: function handleUpdate(data) {
      // Implement save action
      return Promise.resolve(data);
    },
    handleRemove: function handleRemove(data) {
      // Implement remove action
      return Promise.resolve(data);
    },
    setDeleteConfirmationPayload: function setDeleteConfirmationPayload(data) {
      // Setup confirmation modal payload
      return {
        title: '',
        data: data
      };
    },
    formatCreateSuccessMessage: function formatCreateSuccessMessage() {
      // Alter create success message
      return 'Data berhasil ditambahkan';
    },
    // eslint-disable-next-line no-unused-vars
    formatUpdateSuccessMessage: function formatUpdateSuccessMessage(data) {
      // Alter update success message
      return 'Data berhasil diperbarui';
    },
    // eslint-disable-next-line no-unused-vars
    formatRemovalSuccessMessage: function formatRemovalSuccessMessage(data) {
      // Alter removal success message
      return 'Data berhasil dihapus';
    },
    // eslint-disable-next-line no-unused-vars
    formatRemovalFailedMessage: function formatRemovalFailedMessage(data, error) {
      // Alter removal failed message
      return 'Data gagal dihapus';
    },

    /**
     * Generic methods
     *
     * No need to alter these methods
     * since they're commonly used
     */
    create: function create() {
      this.beforeCreate();
      this.editModeForm = false;
      this.showForm = true;
    },
    edit: function edit(data) {
      this.beforeEdit(data);
      this.editFormData = _objectSpread({}, data);
      this.editModeForm = true;
      this.showForm = true;
    },
    save: function save(data) {
      var _this = this;

      var action = this.handleCreate;
      var successMessage = this.formatCreateSuccessMessage(data);

      if (this.editModeForm) {
        action = this.handleUpdate;
        successMessage = this.formatUpdateSuccessMessage(data);
      }

      return action(data).then(function () {
        _this.$root.showSuccessNotification(successMessage);

        _this.closeForm();
      });
    },
    toggleDeleteConfirmation: function toggleDeleteConfirmation(deletedData) {
      var _this$setDeleteConfir = this.setDeleteConfirmationPayload(deletedData),
          title = _this$setDeleteConfir.title,
          data = _this$setDeleteConfir.data;

      this.$root.confirmDeletion(this.$options.deleteConfirmationLabel, title, data);
    },
    confirmAction: function confirmAction(action) {
      var _this2 = this;

      if (action.type === this.$options.deleteConfirmationLabel) {
        this.handleRemove(action.payload).then(function () {
          _this2.$root.showSuccessNotification(_this2.formatRemovalSuccessMessage(action.payload));
        })["catch"](function (error) {
          _this2.$root.showErrorNotification(_this2.formatRemovalFailedMessage(action.payload, error));
        })["finally"](function () {
          _this2.$root.closeConfirmation();
        });
      }
    },
    closeForm: function closeForm() {
      this.showForm = false;
    }
  },
  deleteConfirmationLabel: deleteConfirmationLabel
});

/***/ }),

/***/ "./resources/js/mixins/crud-page/index.js":
/*!************************************************!*\
  !*** ./resources/js/mixins/crud-page/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _crud_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crud-page */ "./resources/js/mixins/crud-page/crud-page.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _crud_page__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/mixins/form/form.js":
/*!******************************************!*\
  !*** ./resources/js/mixins/form/form.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    editMode: {
      type: Boolean,
      "default": false
    },
    editedData: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      formData: _objectSpread({}, this.getInitialFormData())
    };
  },
  methods: {
    syncEditedData: function syncEditedData() {
      var formData = this.formatBeforeEdit(this.editedData);
      this.formData = _objectSpread({}, formData);
    },
    formatBeforeEdit: function formatBeforeEdit(formData) {
      return _objectSpread({}, this.getInitialFormData(), {}, formData);
    },
    save: function save() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var saveable, formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.beforeSave();

              case 2:
                saveable = _context.sent;

                if (saveable) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                formData = _this.formatBeforeSave(_this.formData);

                _this.$emit('save', formData);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    beforeSave: function beforeSave() {
      return true;
    },
    formatBeforeSave: function formatBeforeSave(formData) {
      return formData;
    },
    resetFormData: function resetFormData() {
      this.beforeReset();
      this.formData = _objectSpread({}, this.getInitialFormData());
    },
    beforeReset: function beforeReset() {},
    getInitialFormData: function getInitialFormData() {
      return this.$options.initialFormData;
    }
  },
  initialFormData: {}
});

/***/ }),

/***/ "./resources/js/mixins/form/index.js":
/*!*******************************************!*\
  !*** ./resources/js/mixins/form/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./resources/js/mixins/form/form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _form__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/mixins/modal-form/index.js":
/*!*************************************************!*\
  !*** ./resources/js/mixins/modal-form/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-form */ "./resources/js/mixins/modal-form/modal-form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _modal_form__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/mixins/modal-form/modal-form.js":
/*!******************************************************!*\
  !*** ./resources/js/mixins/modal-form/modal-form.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/form */ "./resources/js/mixins/form/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_form__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: {
    show: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    title: function title() {
      var mode = this.editMode ? 'Edit' : 'Tambah';
      return "".concat(mode, " ").concat(this.$options.formTitle);
    }
  },
  watch: {
    show: function show(_show) {
      var editedData = this.editedData,
          editMode = this.editMode;

      if (_show && editMode && editedData) {
        this.syncEditedData();
      } else {
        this.resetFormData();
      }
    }
  },
  methods: {
    updateShow: function updateShow(show) {
      this.$emit('update:show', show);
    }
  },
  formTitle: ''
});

/***/ }),

/***/ "./resources/js/mixins/paginated-table-page/index.js":
/*!***********************************************************!*\
  !*** ./resources/js/mixins/paginated-table-page/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _paginated_table_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paginated-table-page */ "./resources/js/mixins/paginated-table-page/paginated-table-page.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _paginated_table_page__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/mixins/paginated-table-page/paginated-table-page.js":
/*!**************************************************************************!*\
  !*** ./resources/js/mixins/paginated-table-page/paginated-table-page.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_crud_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/crud-page */ "./resources/js/mixins/crud-page/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_crud_page__WEBPACK_IMPORTED_MODULE_0__["default"]],
  computed: {
    currentPage: function currentPage() {
      var currentPage = Number(this.$route.query.page);
      return currentPage && currentPage > 0 ? currentPage : 1;
    },
    pages: function pages() {
      var _ref = this.meta || {},
          _ref$last_page = _ref.last_page,
          lastPage = _ref$last_page === void 0 ? 1 : _ref$last_page;

      return lastPage;
    }
  },
  methods: {
    /**
     * Customizable methods
     *
     * You can add implementation for these methods
     * to fulfill your requirement
     */
    getPaginatedData: function getPaginatedData() {
      // Implement get paginated data when paga is changed
      return Promise.resolve();
    },

    /**
     * Generic methods
     *
     * No need to alter these methods
     * since they're commonly used
     */
    changePage: function changePage(page) {
      this.$router.push({
        query: {
          page: page
        }
      });
    }
  }
});

/***/ })

}]);