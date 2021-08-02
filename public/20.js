(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_es_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es/capitalize */ "./node_modules/lodash-es/capitalize.js");
/* harmony import */ var lodash_es_differenceBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es/differenceBy */ "./node_modules/lodash-es/differenceBy.js");
/* harmony import */ var _components_atoms_SaveButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/atoms/SaveButton */ "./resources/js/components/atoms/SaveButton/index.js");
/* harmony import */ var _components_molecules_ValidatedInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/molecules/ValidatedInput */ "./resources/js/components/molecules/ValidatedInput/index.js");
/* harmony import */ var _components_molecules_ValidatedSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/molecules/ValidatedSelect */ "./resources/js/components/molecules/ValidatedSelect/index.js");
/* harmony import */ var _mixins_modal_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/mixins/modal-form */ "./resources/js/mixins/modal-form/index.js");
/* harmony import */ var _helpers_array_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/helpers/array-helpers */ "./resources/js/helpers/array-helpers/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
//
//







var formTitle = 'User';
var initialFormData = {
  name: '',
  email: '',
  phone: '',
  role: '',
  permissions: [],
  additionalPermissions: []
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'UserForm',
  components: {
    SaveButton: _components_atoms_SaveButton__WEBPACK_IMPORTED_MODULE_2__["default"],
    ValidatedInput: _components_molecules_ValidatedInput__WEBPACK_IMPORTED_MODULE_3__["default"],
    ValidatedSelect: _components_molecules_ValidatedSelect__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  mixins: [_mixins_modal_form__WEBPACK_IMPORTED_MODULE_5__["default"]],
  props: {
    roles: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    permissions: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  computed: {
    roleOptions: function roleOptions() {
      return this.roles.map(function (_ref) {
        var name = _ref.name;
        return {
          value: name,
          label: Object(lodash_es_capitalize__WEBPACK_IMPORTED_MODULE_0__["default"])(name)
        };
      });
    },
    roleSelected: function roleSelected() {
      return this.formData.role;
    },
    roleBasedPermissions: function roleBasedPermissions() {
      var _this = this;

      var role = this.roles.find(function (role) {
        return role.name === _this.formData.role;
      });
      return role ? role.permissions : [];
    },
    otherPermissions: function otherPermissions() {
      return Object(lodash_es_differenceBy__WEBPACK_IMPORTED_MODULE_1__["default"])(this.permissions, this.roleBasedPermissions, 'id');
    }
  },
  methods: {
    handleAdditionalPermissionsChange: function handleAdditionalPermissionsChange(checked, $event) {
      var permission = $event.target.value;
      var additionalPermissions = this.formData.additionalPermissions;

      if (checked) {
        this.formData.additionalPermissions = Object(_helpers_array_helpers__WEBPACK_IMPORTED_MODULE_6__["uniquePush"])(additionalPermissions, permission);
      } else {
        this.formData.additionalPermissions = Object(_helpers_array_helpers__WEBPACK_IMPORTED_MODULE_6__["removeItem"])(additionalPermissions, permission);
      }
    },
    formatBeforeEdit: function formatBeforeEdit(formData) {
      return _objectSpread({}, this.$options.initialFormData, {}, formData, {
        role: formData.role ? formData.role.name : null
      });
    },
    formatBeforeSave: function formatBeforeSave(formData) {
      var roleBasedPermissions = formData.permissions.map(function (_ref2) {
        var name = _ref2.name;
        return name;
      });
      var permissions = roleBasedPermissions.concat(this.formData.additionalPermissions);

      var finalData = _objectSpread({}, formData, {
        permissions: permissions
      });

      delete finalData.additionalPermissions;
      return finalData;
    },
    beforeReset: function beforeReset() {
      this.$refs.formObserver.reset();
    },
    beforeSave: function beforeSave() {
      return this.$refs.formObserver.validate();
    }
  },
  formTitle: formTitle,
  initialFormData: initialFormData
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_atoms_DeleteButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/atoms/DeleteButton */ "./resources/js/components/atoms/DeleteButton/index.js");
/* harmony import */ var _components_atoms_EditButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/atoms/EditButton */ "./resources/js/components/atoms/EditButton/index.js");
/* harmony import */ var _components_atoms_TableNoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/atoms/TableNoItem */ "./resources/js/components/atoms/TableNoItem/index.js");
/* harmony import */ var _components_molecules_ContentPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/molecules/ContentPanel */ "./resources/js/components/molecules/ContentPanel/index.js");
/* harmony import */ var _configs_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./configs/fields */ "./resources/js/components/organisms/UserSettings/UserTable/configs/fields.js");
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
  name: "UserTable",
  components: {
    DeleteButton: _components_atoms_DeleteButton__WEBPACK_IMPORTED_MODULE_0__["default"],
    EditButton: _components_atoms_EditButton__WEBPACK_IMPORTED_MODULE_1__["default"],
    TableNoItem: _components_atoms_TableNoItem__WEBPACK_IMPORTED_MODULE_2__["default"],
    ContentPanel: _components_molecules_ContentPanel__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    users: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    currentPage: {
      type: Number,
      "default": 1
    },
    pages: {
      type: Number,
      "default": 1
    }
  },
  methods: {
    edit: function edit(user) {
      this.$emit("edit", user);
    },
    remove: function remove(id) {
      this.$emit("remove", id);
    },
    changePage: function changePage(page) {
      this.$emit('changePage', page);
    }
  },
  fields: _configs_fields__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/UsersSettings.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/pages/UsersSettings.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_atoms_CreateButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/atoms/CreateButton */ "./resources/js/components/atoms/CreateButton/index.js");
/* harmony import */ var _components_molecules_PageTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/molecules/PageTitle */ "./resources/js/components/molecules/PageTitle/index.js");
/* harmony import */ var _components_organisms_UserSettings_UserForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/organisms/UserSettings/UserForm */ "./resources/js/components/organisms/UserSettings/UserForm/index.js");
/* harmony import */ var _components_organisms_UserSettings_UserTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/organisms/UserSettings/UserTable */ "./resources/js/components/organisms/UserSettings/UserTable/index.js");
/* harmony import */ var _mixins_paginated_table_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/mixins/paginated-table-page */ "./resources/js/mixins/paginated-table-page/index.js");
/* harmony import */ var _configs_store_modules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/configs/store/modules */ "./resources/js/configs/store/modules.js");
/* harmony import */ var _configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/configs/store/action-types */ "./resources/js/configs/store/action-types.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  name: "UsersSettings",
  components: {
    CreateButton: _components_atoms_CreateButton__WEBPACK_IMPORTED_MODULE_1__["default"],
    PageTitle: _components_molecules_PageTitle__WEBPACK_IMPORTED_MODULE_2__["default"],
    UserForm: _components_organisms_UserSettings_UserForm__WEBPACK_IMPORTED_MODULE_3__["default"],
    UserTable: _components_organisms_UserSettings_UserTable__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  mixins: [_mixins_paginated_table_page__WEBPACK_IMPORTED_MODULE_5__["default"]],
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(_configs_store_modules__WEBPACK_IMPORTED_MODULE_6__["userSettings"], ['permissions', 'roles', 'users', 'meta'])),
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(_configs_store_modules__WEBPACK_IMPORTED_MODULE_6__["userSettings"], {
    prepareData: function prepareData(dispatch) {
      var _this = this;

      return Promise.all([dispatch(_configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__["getRoles"]), dispatch(_configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__["getPermissions"])]).then(function () {
        _this.getPaginatedData();
      });
    },
    getPaginatedData: function getPaginatedData(dispatch) {
      return dispatch(_configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__["getUsers"], this.currentPage);
    },
    handleCreate: _configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__["createUser"],
    handleUpdate: _configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__["updateUser"],
    handleRemove: function handleRemove(dispatch, data) {
      return dispatch(_configs_store_action_types__WEBPACK_IMPORTED_MODULE_7__["deleteUser"], data.id);
    }
  }), {
    setDeleteConfirmationPayload: function setDeleteConfirmationPayload(data) {
      return {
        title: data.email,
        data: data
      };
    },
    formatCreateSuccessMessage: function formatCreateSuccessMessage(data) {
      return "User ".concat(data.email, " berhasil ditambahkan");
    },
    formatUpdateSuccessMessage: function formatUpdateSuccessMessage(data) {
      return "User ".concat(data.email, " berhasil diperbarui");
    },
    formatRemovalSuccessMessage: function formatRemovalSuccessMessage(data) {
      return "User ".concat(data.email, " berhasil dihapus");
    },
    formatRemovalFailedMessage: function formatRemovalFailedMessage(data) {
      return "User ".concat(data.email, " gagal dihapus");
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=template&id=3c418eb2&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=template&id=3c418eb2& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  return _c("ValidationObserver", {
    ref: "formObserver",
    attrs: { slim: "" },
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function(ref) {
          var valid = ref.valid
          return [
            _c(
              "CModal",
              {
                attrs: {
                  title: _vm.title,
                  show: _vm.show,
                  size: "sm",
                  "close-on-backdrop": false,
                  centered: ""
                },
                on: { "update:show": _vm.updateShow },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "footer-wrapper",
                      fn: function() {
                        return [
                          _c(
                            "div",
                            { staticClass: "p-3" },
                            [
                              _c("SaveButton", {
                                staticClass: "float-right",
                                attrs: { disabled: !valid },
                                on: { click: _vm.save }
                              })
                            ],
                            1
                          )
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
                _c(
                  "CForm",
                  [
                    _c("ValidatedInput", {
                      attrs: {
                        type: "text",
                        label: "Nama",
                        rules: "required|max:500"
                      },
                      model: {
                        value: _vm.formData.name,
                        callback: function($$v) {
                          _vm.$set(_vm.formData, "name", $$v)
                        },
                        expression: "formData.name"
                      }
                    }),
                    _vm._v(" "),
                    _c("ValidatedInput", {
                      attrs: {
                        type: "email",
                        label: "Email",
                        rules: "required|email|max:500"
                      },
                      model: {
                        value: _vm.formData.email,
                        callback: function($$v) {
                          _vm.$set(_vm.formData, "email", $$v)
                        },
                        expression: "formData.email"
                      }
                    }),
                    _vm._v(" "),
                    _c("ValidatedInput", {
                      attrs: {
                        type: "text",
                        label: "No.Telepon",
                        rules: "numeric|max:15"
                      },
                      model: {
                        value: _vm.formData.phone,
                        callback: function($$v) {
                          _vm.$set(_vm.formData, "phone", $$v)
                        },
                        expression: "formData.phone"
                      }
                    }),
                    _vm._v(" "),
                    _c("ValidatedSelect", {
                      attrs: {
                        options: _vm.roleOptions,
                        placeholder: "Pilih role",
                        rules: "required",
                        label: "Role",
                        reduce: function(item) {
                          return item.value
                        }
                      },
                      model: {
                        value: _vm.formData.role,
                        callback: function($$v) {
                          _vm.$set(_vm.formData, "role", $$v)
                        },
                        expression: "formData.role"
                      }
                    }),
                    _vm._v(" "),
                    _vm.roleSelected
                      ? [
                          _vm.roleBasedPermissions.length
                            ? _c(
                                "div",
                                {
                                  staticClass: "form-group",
                                  attrs: { role: "group" }
                                },
                                [
                                  _vm._v(
                                    "\n          Hak Akses Berdasarkan Jabatan\n          "
                                  ),
                                  _vm._l(_vm.roleBasedPermissions, function(
                                    permission,
                                    index
                                  ) {
                                    return _c("CInputCheckbox", {
                                      key: index,
                                      attrs: { checked: "", disabled: "" },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "label",
                                            fn: function() {
                                              return [
                                                _vm._v(
                                                  "\n              " +
                                                    _vm._s(permission.name) +
                                                    "\n            "
                                                )
                                              ]
                                            },
                                            proxy: true
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  })
                                ],
                                2
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.otherPermissions.length
                            ? _c(
                                "div",
                                {
                                  staticClass: "form-group",
                                  attrs: { role: "group" }
                                },
                                [
                                  _vm._v(
                                    "\n          Hak Akses Tambahan\n          "
                                  ),
                                  _vm._l(_vm.otherPermissions, function(
                                    permission,
                                    index
                                  ) {
                                    return _c("CInputCheckbox", {
                                      key: index,
                                      attrs: {
                                        value: permission.name,
                                        checked: _vm.formData.additionalPermissions.includes(
                                          permission.name
                                        )
                                      },
                                      on: {
                                        "update:checked":
                                          _vm.handleAdditionalPermissionsChange
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "label",
                                            fn: function() {
                                              return [
                                                _vm._v(
                                                  "\n              " +
                                                    _vm._s(permission.name) +
                                                    "\n            "
                                                )
                                              ]
                                            },
                                            proxy: true
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  })
                                ],
                                2
                              )
                            : _vm._e()
                        ]
                      : _vm._e()
                  ],
                  2
                )
              ],
              1
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=template&id=6682bccf&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=template&id=6682bccf& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
    "ContentPanel",
    { attrs: { "table-content": "" } },
    [
      _c(
        "CDataTable",
        {
          staticClass: "mb-4",
          attrs: { items: _vm.users, fields: _vm.$options.fields, hover: "" },
          scopedSlots: _vm._u([
            {
              key: "phone",
              fn: function(ref) {
                var item = ref.item
                return [_c("td", [_vm._v(_vm._s(item.phone || "-"))])]
              }
            },
            {
              key: "role",
              fn: function(ref) {
                var item = ref.item
                return [
                  _c("td", [_vm._v(_vm._s(item.role ? item.role.name : "-"))])
                ]
              }
            },
            {
              key: "created_at",
              fn: function(ref) {
                var item = ref.item
                return [
                  _c("td", [
                    _vm._v(_vm._s(_vm._f("toHumanDateTime")(item.created_at)))
                  ])
                ]
              }
            },
            {
              key: "updated_at",
              fn: function(ref) {
                var item = ref.item
                return [
                  _c("td", [
                    _vm._v(_vm._s(_vm._f("toHumanDateTime")(item.updated_at)))
                  ])
                ]
              }
            },
            {
              key: "actions",
              fn: function(ref) {
                var item = ref.item
                return [
                  _c(
                    "td",
                    [
                      _c(
                        "CButtonGroup",
                        [
                          _c("EditButton", {
                            on: {
                              click: function($event) {
                                return _vm.edit(item)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("DeleteButton", {
                            on: {
                              click: function($event) {
                                return _vm.remove(item)
                              }
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              }
            }
          ])
        },
        [
          _c("TableNoItem", {
            attrs: { slot: "no-items-view" },
            slot: "no-items-view"
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("CPagination", {
        attrs: {
          "active-page": _vm.currentPage,
          pages: _vm.pages,
          align: "center"
        },
        on: { "update:activePage": _vm.changePage }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/UsersSettings.vue?vue&type=template&id=6d745925&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/pages/UsersSettings.vue?vue&type=template&id=6d745925& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
      _c("PageTitle", {
        attrs: { title: "Pengaturan Pengguna" },
        scopedSlots: _vm._u([
          {
            key: "actions",
            fn: function() {
              return [
                _c("CreateButton", {
                  attrs: { text: "Tambah Pengguna" },
                  on: { click: _vm.create }
                })
              ]
            },
            proxy: true
          }
        ])
      }),
      _vm._v(" "),
      _c("UserTable", {
        attrs: {
          users: _vm.users,
          "current-page": _vm.currentPage,
          pages: _vm.pages
        },
        on: {
          edit: _vm.edit,
          remove: _vm.toggleDeleteConfirmation,
          changePage: _vm.changePage
        }
      }),
      _vm._v(" "),
      _c("UserForm", {
        attrs: {
          show: _vm.showForm,
          "edit-mode": _vm.editModeForm,
          "edited-data": _vm.editFormData,
          roles: _vm.roles,
          permissions: _vm.permissions
        },
        on: {
          "update:show": function($event) {
            _vm.showForm = $event
          },
          save: _vm.save
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue":
/*!******************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserForm_vue_vue_type_template_id_3c418eb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserForm.vue?vue&type=template&id=3c418eb2& */ "./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=template&id=3c418eb2&");
/* harmony import */ var _UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserForm.vue?vue&type=script&lang=js& */ "./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserForm_vue_vue_type_template_id_3c418eb2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserForm_vue_vue_type_template_id_3c418eb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/organisms/UserSettings/UserForm/UserForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=template&id=3c418eb2&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=template&id=3c418eb2& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_template_id_3c418eb2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserForm.vue?vue&type=template&id=3c418eb2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue?vue&type=template&id=3c418eb2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_template_id_3c418eb2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_template_id_3c418eb2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserForm/index.js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserForm/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserForm */ "./resources/js/components/organisms/UserSettings/UserForm/UserForm.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _UserForm__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserTable_vue_vue_type_template_id_6682bccf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserTable.vue?vue&type=template&id=6682bccf& */ "./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=template&id=6682bccf&");
/* harmony import */ var _UserTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserTable.vue?vue&type=script&lang=js& */ "./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserTable_vue_vue_type_template_id_6682bccf___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserTable_vue_vue_type_template_id_6682bccf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/organisms/UserSettings/UserTable/UserTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=template&id=6682bccf&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=template&id=6682bccf& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTable_vue_vue_type_template_id_6682bccf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserTable.vue?vue&type=template&id=6682bccf& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue?vue&type=template&id=6682bccf&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTable_vue_vue_type_template_id_6682bccf___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTable_vue_vue_type_template_id_6682bccf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserTable/configs/fields.js":
/*!************************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserTable/configs/fields.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  label: 'Nama',
  key: 'name'
}, {
  label: 'Email',
  key: 'email'
}, {
  label: 'No. Telepon',
  key: 'phone'
}, {
  label: 'Role',
  key: 'role'
}, {
  label: 'Tgl. Dibuat',
  key: 'created_at'
}, {
  label: 'Update Terakhir',
  key: 'updated_at'
}, {
  label: '',
  key: 'actions'
}]);

/***/ }),

/***/ "./resources/js/components/organisms/UserSettings/UserTable/index.js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/organisms/UserSettings/UserTable/index.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserTable */ "./resources/js/components/organisms/UserSettings/UserTable/UserTable.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _UserTable__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/components/pages/UsersSettings.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/pages/UsersSettings.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersSettings_vue_vue_type_template_id_6d745925___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersSettings.vue?vue&type=template&id=6d745925& */ "./resources/js/components/pages/UsersSettings.vue?vue&type=template&id=6d745925&");
/* harmony import */ var _UsersSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersSettings.vue?vue&type=script&lang=js& */ "./resources/js/components/pages/UsersSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UsersSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UsersSettings_vue_vue_type_template_id_6d745925___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UsersSettings_vue_vue_type_template_id_6d745925___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/pages/UsersSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/pages/UsersSettings.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/pages/UsersSettings.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UsersSettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/UsersSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/pages/UsersSettings.vue?vue&type=template&id=6d745925&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/pages/UsersSettings.vue?vue&type=template&id=6d745925& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersSettings_vue_vue_type_template_id_6d745925___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UsersSettings.vue?vue&type=template&id=6d745925& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pages/UsersSettings.vue?vue&type=template&id=6d745925&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersSettings_vue_vue_type_template_id_6d745925___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersSettings_vue_vue_type_template_id_6d745925___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/helpers/array-helpers/index.js":
/*!*****************************************************!*\
  !*** ./resources/js/helpers/array-helpers/index.js ***!
  \*****************************************************/
/*! exports provided: removeItem, uniquePush */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _remove_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./remove-item */ "./resources/js/helpers/array-helpers/remove-item/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeItem", function() { return _remove_item__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _unique_push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unique-push */ "./resources/js/helpers/array-helpers/unique-push/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniquePush", function() { return _unique_push__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./resources/js/helpers/array-helpers/remove-item/index.js":
/*!*****************************************************************!*\
  !*** ./resources/js/helpers/array-helpers/remove-item/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _remove_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./remove-item */ "./resources/js/helpers/array-helpers/remove-item/remove-item.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _remove_item__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/helpers/array-helpers/remove-item/remove-item.js":
/*!***********************************************************************!*\
  !*** ./resources/js/helpers/array-helpers/remove-item/remove-item.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return removeItem; });
function removeItem(list, removedItem) {
  return list.filter(function (item) {
    return item !== removedItem;
  });
}

/***/ }),

/***/ "./resources/js/helpers/array-helpers/unique-push/index.js":
/*!*****************************************************************!*\
  !*** ./resources/js/helpers/array-helpers/unique-push/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unique_push__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unique-push */ "./resources/js/helpers/array-helpers/unique-push/unique-push.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _unique_push__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/helpers/array-helpers/unique-push/unique-push.js":
/*!***********************************************************************!*\
  !*** ./resources/js/helpers/array-helpers/unique-push/unique-push.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uniquePush; });
function uniquePush(list, item) {
  var available = list.includes(item);
  if (available) return list;
  return list.concat(item);
}

/***/ })

}]);