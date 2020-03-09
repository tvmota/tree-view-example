<template>
  <div>
    <ul class="tree" role="tree" aria-labelledby="tree1">
      <node-tree
        :node="nodeData"
        :checkboxNode="showCheckbox"
        v-for="(nodeData, idx) in treeData"
        :key="idx"
        @updatedTree="updatedTree">
      </node-tree>
    </ul>
  </div>
</template>

<script>
import NodeTree from './NodeTree.vue';

export default {
  props: {
    treeData: Array,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updatedTree() {
      console.log(this.treeData);
    },
  },
  components: {
    NodeTree,
  },
};
</script>

<style lang="scss">
.tree, .tree ul {
  margin: 0;
  padding: 0;
  list-style: none;

  ul li {
    &::before {
      content: "";
      display: block;
      width: 10px;
      height: 0;
      border-top: 1px solid;
      margin-top: -1px;
      position: absolute;
      top: 1em;
      left: 4px;
    }

    &:last-child:before {
      background: #fff;
      height: auto;
      top: 1em;
      bottom: 0;
    }
  }

  ul:nth-child(n+1) {
    margin-left: .6rem;
  }
}

.tree .btn-default.active {
  background-color: #1c90c1;
  color: #fff;
}

.tree .btn-default {
  background-color: #eee;
}

.tree .fa-info-circle {
  color: #1c90c1;
}
</style>
