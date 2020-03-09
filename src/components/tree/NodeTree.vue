<template>
  <li
    class="leaf"
    :class="{
      'leaf--sublevel': rootLevel,
    }"
    :role="roleType"
    :aria-expanded="`${node.visible || false}`">
      <div
        class="leaf__content">
          <span
            class="leaf__expand"
            :class="{'leaf--open': node.visible}"
            v-if="node.children && node.children.length"
            @click="() => node.visible = !node.visible">
              <Icon
                pack="fas"
                :icon="iconFolderName"
                size="is-small" />
          </span>
          <Checkbox
            v-if="checkboxNode"
            v-model="node.checked"
            size="is-small"
            @input="getCheckedNode(node)"
            @change.native="changeChk"/>
          <span class="label" >
            {{ node.label }}
            <button @click="addLeaf(node)">
              <Icon custom-class="leaf__expand"
              pack="fas"
              icon="plus"
              size="is-small"/>
            </button>
          </span>
      </div>
      <ul
        class="leaf__tree"
        :class="visibleNodeCls"
        v-if="node.children && node.children.length"
        role="group">
          <node
            v-for="(child, idx) in node.children"
            :key="idx"
            :node="child"
            :rootLevel="true"
            :checkboxNode="checkboxNode"
            @updateSubTree="updateSubTree">
          </node>
      </ul>
  </li>
</template>

<script>
// https://codepen.io/labanino/pen/EPRKoJ
import Checkbox from '~/buefy/src/components/checkbox/Checkbox.vue';
import Icon from '~/buefy/src/components/icon/Icon.vue';

export default {
  name: 'node',
  props: {
    node: Object,
    checkboxNode: {
      type: Boolean,
      default: false,
    },
    rootLevel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    roleType() {
      return this.node.children ? 'treeitem' : 'none';
    },
    visibleNodeCls() {
      return this.node.visible ? 'leaf--visible' : 'leaf--invisible';
    },
    iconFolderName() {
      return this.node.visible ? 'folder-open' : 'folder';
    },
  },
  methods: {
    addLeaf(node) {
      const { children = [] } = node || {};

      if (children.length > 0) {
        children.push({ label: 'new children' });
      } else {
        this.$set(node, 'children', [
          { label: 'new children' },
        ]);
        this.$set(node, 'visible', true);
        if (this.checkboxNode) {
          this.$set(node, 'checked', false);
        }
      }
    },
    getCheckedNode(node) {
      const { children = [] } = node || {};
      debugger;

      if (children.length > 0) {
        children.forEach((subNode) => {
          this.$set(subNode, 'checked', node.checked);
        });
      }

      this.$emit('updateSubTree');
      this.updateSubTree();
    },
    updateSubTree() {
      this.$emit('updatedTree');
    },
    changeChk() {
      console.log(this.node.label, 'amudou');
    },
  },
  created() {
    if (this.node.children) {
      this.$set(this.node, 'visible', false);
    }

    if (this.checkboxNode) {
      this.$set(this.node, 'checked', false);
      this.node.checked = false;
    }
  },
  components: {
    Checkbox,
    Icon,
  },
};
</script>

<style lang="scss">
  .leaf {
    margin: 0;
    padding: 0 0.8em;
    line-height: 2em;
    color: #555;
    font-weight: 700;
    position: relative;

    &__expand, &__add {
      border: 0;
      margin-right: 6px;
      padding: 0;
      cursor: pointer;
    }

    &__content {
      align-items: center;
      display: flex;
      padding-left: 6px;
    }

    &__tree {
      margin-left: 0.4em;
      position: relative;

      &::before {
        content: "";
        display: block;
        width: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 4px;
        border-left: 1px solid;
      }
    }

    &--visible {
      height: auto;
      width: auto;
      visibility: visible;
    }

    &--invisible {
      height: 0;
      width: 0;
      visibility: hidden;
      overflow: hidden;
    }
  }
</style>
