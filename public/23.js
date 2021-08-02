(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_atoms_BaseActionButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/atoms/BaseActionButton */ "./resources/js/components/atoms/BaseActionButton/index.js");
/* harmony import */ var _components_molecules_PageTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/molecules/PageTitle */ "./resources/js/components/molecules/PageTitle/index.js");
/* harmony import */ var _components_organisms_PerformanceMonitoring_TemplateDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/organisms/PerformanceMonitoring/TemplateDetail */ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/index.js");
/* harmony import */ var _mixins_performance_monitoring_template_detail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/mixins/performance-monitoring/template-detail */ "./resources/js/mixins/performance-monitoring/template-detail/index.js");
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
  name: 'PerformanceMonitoringTemplateDetail',
  components: {
    BaseActionButton: _components_atoms_BaseActionButton__WEBPACK_IMPORTED_MODULE_0__["default"],
    PageTitle: _components_molecules_PageTitle__WEBPACK_IMPORTED_MODULE_1__["default"],
    TemplateDetail: _components_organisms_PerformanceMonitoring_TemplateDetail__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_mixins_performance_monitoring_template_detail__WEBPACK_IMPORTED_MODULE_3__["default"]],
  computed: {
    breadcrumbItems: function breadcrumbItems() {
      return [{
        text: 'Template Monitoring Kinerja',
        to: {
          name: 'PerformanceMonitoringTemplate'
        }
      }, {
        text: this.title
      }];
    }
  },
  methods: {
    edit: function edit() {
      var id = this.$route.params.id;
      this.$router.push({
        name: 'PerformanceMonitoringTemplateDetailFormEdit',
        params: {
          id: id
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    "div",
    [
      _c("CBreadcrumb", {
        staticClass: "p-0 mb-4 border-0",
        attrs: { items: _vm.breadcrumbItems }
      }),
      _vm._v(" "),
      _c("PageTitle", {
        attrs: { title: _vm.title },
        scopedSlots: _vm._u([
          {
            key: "actions",
            fn: function() {
              return [
                _c("BaseActionButton", {
                  attrs: {
                    text: "Ubah ke Tampilan Edit",
                    size: "",
                    icon: "cil-pencil"
                  },
                  on: { click: _vm.edit }
                })
              ]
            },
            proxy: true
          }
        ])
      }),
      _vm._v(" "),
      _c("TemplateDetail", { attrs: { "indicator-groups": _vm.indicators } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PerformanceMonitoringTemplateDetail_vue_vue_type_template_id_7fd5ed7d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d& */ "./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d&");
/* harmony import */ var _PerformanceMonitoringTemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js& */ "./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PerformanceMonitoringTemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PerformanceMonitoringTemplateDetail_vue_vue_type_template_id_7fd5ed7d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PerformanceMonitoringTemplateDetail_vue_vue_type_template_id_7fd5ed7d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PerformanceMonitoringTemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PerformanceMonitoringTemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PerformanceMonitoringTemplateDetail_vue_vue_type_template_id_7fd5ed7d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/PerformanceMonitoringTemplateDetail.vue?vue&type=template&id=7fd5ed7d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PerformanceMonitoringTemplateDetail_vue_vue_type_template_id_7fd5ed7d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PerformanceMonitoringTemplateDetail_vue_vue_type_template_id_7fd5ed7d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);