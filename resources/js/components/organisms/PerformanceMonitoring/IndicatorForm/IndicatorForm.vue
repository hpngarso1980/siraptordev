<template>
  <div>
    <div
      v-for="(parent, parentIndex) in localIndicators"
      :key="parentIndex"
    >
      <ParentIndicatorForm
        v-bind="parent"
        :show-labels="parentIndex === 0"
        :weight-disabled="!!(parent.children && parent.children.length)"
        :deduction="deduction"
        @input="updateParent(parent, $event)"
        @remove="removeParentIndicator(parentIndex)"
      />

      <div
        v-for="(child, childIndex) in parent.children"
        :key="childIndex"
      >
        <ChildIndicatorForm
          v-bind="child"
          :show-labels="childIndex === 0"
          :weight-disabled="!!(child.children && child.children.length)"
          :deduction="deduction"
          @input="updateChild(child, $event)"
          @remove="removeChildIndicator(parentIndex, childIndex)"
        />

        <div
          v-for="(grandChild, grandChildIndex) in child.children"
          :key="grandChildIndex"
        >
          <ChildIndicatorForm
            v-bind="grandChild"
            :level="2"
            :show-labels="grandChildIndex === 0"
            :weight-disabled="!!(grandChild.children && grandChild.children.length)"
            :deduction="deduction"
            @input="updateGrandChild(grandChild, $event)"
            @remove="removeGrandChildIndicator(parentIndex, childIndex, grandChildIndex)"
          />
        </div>

        <CRow class="mb-4">
          <CCol lg="2" />
          <CCol>
            <a
              href="#"
              class="text-black-50 pb-1 border-bottom"
              style="text-decoration: none;"
              @click.prevent="addGrandChildIndicator(parentIndex, childIndex)"
            >
              <CIcon
                name="cil-plus"
                class="mr-1"
              />
              Tambah
            </a>
          </CCol>
        </CRow>
      </div>

      <CRow class="mb-4">
        <CCol lg="1" />
        <CCol>
          <a
            href="#"
            class="text-black-50 pb-1 border-bottom"
            style="text-decoration: none;"
            @click.prevent="addChildIndicator(parentIndex)"
          >
            <CIcon
              name="cil-plus"
              class="mr-1"
            />
            Tambah
          </a>
        </CCol>
      </CRow>
    </div>

    <CRow class="mb-4">
      <CCol>
        <a
          href="#"
          class="text-black-50 pb-1 border-bottom"
          style="text-decoration: none;"
          @click.prevent="addParentIndicator"
        >
          <CIcon
            name="cil-plus"
            class="mr-1"
          />
          Tambah
        </a>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import shortid from 'shortid';
import BaseActionButton from '@/components/atoms/BaseActionButton'
import ParentIndicatorForm from './components/ParentIndicatorForm'
import ChildIndicatorForm from './components/ChildIndicatorForm'

function itemMatch(item, { id, temp_id }) {
  if (item.id) {
    return item.id === id;
  } else {
    return item.temp_id === temp_id;
  }
}

function recalculateWeights(indicator) {
  const { children } = indicator

  if (children && children.length) {
    const newWeight = children.map(recalculateWeights).reduce((totalWeight, { weight }) =>
      totalWeight + weight
    , 0)
    indicator.weight = newWeight

    return indicator
  } else {
    return indicator
  }
}

export default {
  name: 'IndicatorForm',

  components: {
    BaseActionButton,
    ParentIndicatorForm,
    ChildIndicatorForm,
  },

  props: {
    indicatorGroupId: {
      type: Number,
      default: null,
    },

    indicators: {
      type: Array,
      default: () => [],
    },

    deduction: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localIndicators: [...this.indicators],
    }
  },

  watch: {
    localIndicators(localIndicators) {
      this.changeInput();
    },
  },

  methods: {
    addParentIndicator() {
      this.localIndicators = [
        ...this.localIndicators,
        {
          temp_id: shortid.generate(),
          code: '',
          indicator: '',
          children: [],
        },
      ]
    },

    addChildIndicator(parentIndex) {
      this.localIndicators = this.generateNewChildren(this.localIndicators, parentIndex)
    },

    addGrandChildIndicator(parentIndex, childIndex) {
      const parent = this.localIndicators[parentIndex]
      const newChildren = this.generateNewChildren(parent.children, childIndex)

      const newParent = {
        ...parent,
        children: newChildren,
      }
      const newParents = this.localIndicators
      newParents.splice(parentIndex, 1, newParent)
      this.localIndicators = newParents
    },

    removeParentIndicator(index) {
      const newIndicators = [...this.localIndicators]
      const removedIndicator = newIndicators[index];
      newIndicators.splice(index, 1)

      this.localIndicators = newIndicators
      this.recalculateWeights()
      this.remove(removedIndicator);
    },

    removeChildIndicator(parentIndex, childIndex) {
      const newIndicators = this.removeChild(this.localIndicators, parentIndex, childIndex)

      this.localIndicators = newIndicators
      this.recalculateWeights()
    },

    removeGrandChildIndicator(parentIndex, childIndex, grandChildIndex) {
      const newIndicators = [...this.localIndicators]
      const parent = newIndicators[parentIndex]
      parent.children = this.removeChild(parent.children, childIndex, grandChildIndex)
      newIndicators.splice(parentIndex, 1, parent)

      this.localIndicators = newIndicators
      this.recalculateWeights()
    },

    generateNewChildren(parents, parentIndex) {
      const parent = parents[parentIndex]
      const newChildren = [
        ...parent.children,
        {
          temp_id: shortid.generate(),
          code: '',
          indicator: '',
          children: [],
        },
      ]
      const newParent = {
        ...parent,
        children: newChildren,
      }
      const newParents = [...parents]
      newParents.splice(parentIndex, 1, newParent)

      return newParents
    },

    removeChild(parents, parentIndex, childIndex) {
      const newParents = [...parents]
      const removedChild = newParents[parentIndex].children[childIndex]
      newParents[parentIndex].children.splice(childIndex, 1)

      this.remove(removedChild)

      return newParents
    },

    updateParent(updatedParent, data) {
      this.localIndicators = this.localIndicators.map(parent => {
        if (itemMatch(parent, updatedParent)) {
          return {
            ...parent,
            ...data,
            performance_indicator_group_id: this.indicatorGroupId,
          }
        } else {
          return parent
        }
      })

      this.recalculateWeights()
    },

    updateChild(updatedChild, data) {
      this.localIndicators = this.localIndicators.map(parent => {
        const children = parent.children.map(child => {
          if (itemMatch(child, updatedChild)) {
            return {
              ...child,
              ...data,
              performance_indicator_group_id: this.indicatorGroupId,
            }
          } else {
            return child
          }
        })

        return {
          ...parent,
          children,
        }
      })

      this.recalculateWeights()
    },

    updateGrandChild(updatedGrandChild, data) {
      this.localIndicators = this.localIndicators.map(parent => {
        const children = parent.children.map(child => {
          const grandChildren = child.children.map(grandChild => {
            if (itemMatch(grandChild, updatedGrandChild)) {
              return {
                ...grandChild,
                ...data,
                performance_indicator_group_id: this.indicatorGroupId,
              }
            } else {
              return grandChild
            }
          })

          return {
            ...child,
            children: grandChildren,
          }
        })

        return {
          ...parent,
          children,
        }
      })

      this.recalculateWeights()
    },

    recalculateWeights() {
      this.localIndicators = this.localIndicators.map(recalculateWeights)
    },

    changeInput() {
      this.$emit('input', this.localIndicators);
    },

    remove({ id }) {
      if (id) {
        this.$emit('remove', id);
      }
    },
  },
};
</script>
