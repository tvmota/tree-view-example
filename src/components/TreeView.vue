<script>
import TreeItem from './TreeItem.vue';

const treeData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }],
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }],
        },
      ],
    },
  ],
};
export default {
  name: 'Treview',
  data() {
    return {
      treeData,
    };
  },
  methods: {
    makeFolder(item) {
      this.$set(item, 'children', []);
      this.addItem(item);
    },
    addItem(item) {
      item.children.push({
        name: 'new stuff',
      });
    },
  },
  components: {
    TreeItem,
  },
};
</script>

<template>
  <div>
    <h3 id="tree_label">
      File Viewer
    </h3>
    <ul
      aria-labelledby="tree_label"
      id="demo"
      role="tree">
        <tree-item
          class="item"
          :item="treeData"
          @make-folder="makeFolder"
          @add-item="addItem">
        </tree-item>
    </ul>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  line-height: 1.8em;
  list-style-type: none;
  text-align: start;
  padding-left: 22px;
}
</style>
