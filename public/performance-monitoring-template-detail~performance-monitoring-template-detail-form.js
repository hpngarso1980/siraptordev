(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["performance-monitoring-template-detail~performance-monitoring-template-detail-form"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_molecules_ContentPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/molecules/ContentPanel */ "./resources/js/components/molecules/ContentPanel/index.js");
/* harmony import */ var _helpers_performance_monitoring_helpers_flatten_indicators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/helpers/performance-monitoring-helpers/flatten-indicators */ "./resources/js/helpers/performance-monitoring-helpers/flatten-indicators/index.js");
/* harmony import */ var _configs_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configs/fields */ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/configs/fields.js");
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
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TemplateDetail',
  components: {
    ContentPanel: _components_molecules_ContentPanel__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    indicatorGroups: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  computed: {
    groups: function groups() {
      return this.indicatorGroups.map(function (_ref) {
        var title = _ref.title,
            indicators = _ref.indicators;
        return {
          title: title,
          indicators: Object(_helpers_performance_monitoring_helpers_flatten_indicators__WEBPACK_IMPORTED_MODULE_1__["default"])(indicators)
        };
      });
    },
    deductionFields: function deductionFields() {
      return _configs_fields__WEBPACK_IMPORTED_MODULE_2__["default"].filter(function (_ref2) {
        var key = _ref2.key;
        return !['unit', 'weight'].includes(key);
      });
    }
  },
  methods: {
    calculateWeight: function calculateWeight(indicators) {
      return indicators.reduce(function (totalWeight, _ref3) {
        var weight = _ref3.weight;
        return totalWeight + weight;
      }, 0);
    }
  },
  fields: _configs_fields__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "tr.level-2 td:first-child {\n  padding-left: 28px;\n}\ntr.level-3 td:first-child {\n  padding-left: 36px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateDetail.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=template&id=86722a62&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=template&id=86722a62& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
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
    _vm._l(_vm.groups, function(group, index) {
      return _c(
        "ContentPanel",
        {
          key: index,
          attrs: { "table-content": "" },
          scopedSlots: _vm._u(
            [
              {
                key: "title",
                fn: function() {
                  return [
                    _c("div", { staticClass: "float-left" }, [
                      _vm._v("\n        " + _vm._s(group.title) + "\n      ")
                    ]),
                    _vm._v(" "),
                    !_vm.indicatorGroups[index].deduction
                      ? _c("div", { staticClass: "float-right" }, [
                          _vm._v(
                            "\n        Bobot: " +
                              _vm._s(
                                _vm.calculateWeight(
                                  _vm.indicatorGroups[index].indicators
                                )
                              ) +
                              "\n      "
                          )
                        ])
                      : _vm._e()
                  ]
                },
                proxy: true
              }
            ],
            null,
            true
          )
        },
        [
          _vm._v(" "),
          _c("CDataTable", {
            attrs: {
              items: group.indicators,
              fields: _vm.indicatorGroups[index].deduction
                ? _vm.deductionFields
                : _vm.$options.fields,
              hover: ""
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "unit",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("td", [
                        _vm._v(
                          "\n          " +
                            _vm._s(item.unit || "-") +
                            "\n        "
                        )
                      ])
                    ]
                  }
                }
              ],
              null,
              true
            )
          })
        ],
        1
      )
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateDetail_vue_vue_type_template_id_86722a62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateDetail.vue?vue&type=template&id=86722a62& */ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=template&id=86722a62&");
/* harmony import */ var _TemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateDetail.vue?vue&type=script&lang=js& */ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TemplateDetail.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TemplateDetail_vue_vue_type_template_id_86722a62___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TemplateDetail_vue_vue_type_template_id_86722a62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateDetail.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************!*\
  !*** ./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateDetail.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=template&id=86722a62&":
/*!**********************************************************************************************************************************!*\
  !*** ./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=template&id=86722a62& ***!
  \**********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_template_id_86722a62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TemplateDetail.vue?vue&type=template&id=86722a62& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue?vue&type=template&id=86722a62&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_template_id_86722a62___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateDetail_vue_vue_type_template_id_86722a62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/configs/fields.js":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/configs/fields.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  label: 'Kode',
  key: 'code'
}, {
  label: 'Indikator',
  key: 'indicator'
}, {
  label: 'Satuan',
  key: 'unit'
}, {
  label: 'Bobot',
  key: 'weight'
}]);

/***/ }),

/***/ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/index.js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/index.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateDetail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateDetail */ "./resources/js/components/organisms/PerformanceMonitoring/TemplateDetail/TemplateDetail.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TemplateDetail__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./resources/js/mixins/performance-monitoring/template-detail/index.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/mixins/performance-monitoring/template-detail/index.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_detail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-detail */ "./resources/js/mixins/performance-monitoring/template-detail/template-detail.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _template_detail__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/mixins/performance-monitoring/template-detail/template-detail.js":
/*!***************************************************************************************!*\
  !*** ./resources/js/mixins/performance-monitoring/template-detail/template-detail.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _configs_store_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/store/modules */ "./resources/js/configs/store/modules.js");
/* harmony import */ var _configs_store_action_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/store/action-types */ "./resources/js/configs/store/action-types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ __webpack_exports__["default"] = ({
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(_configs_store_modules__WEBPACK_IMPORTED_MODULE_1__["performanceMonitoring"], ['template', 'indicators']), {
    title: function title() {
      return this.template.name || '';
    }
  }),
  mounted: function mounted() {
    this.fetchData();
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(_configs_store_modules__WEBPACK_IMPORTED_MODULE_1__["performanceMonitoring"], [_configs_store_action_types__WEBPACK_IMPORTED_MODULE_2__["getTemplate"], _configs_store_action_types__WEBPACK_IMPORTED_MODULE_2__["getIndicators"]]), {
    fetchData: function fetchData() {
      var templateId = this.$route.params.id;
      Promise.all([this.getTemplate(templateId), this.getIndicators(templateId)]);
    }
  })
});

/***/ })

}]);