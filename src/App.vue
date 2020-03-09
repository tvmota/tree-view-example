<template>
  <div id="app">
    <TreeView />
    <hr>
    <Tree :treeData="tree" :showCheckbox="true"/>
  </div>
</template>

<script>
import TreeView from './components/TreeView.vue';
import Tree from './components/tree/Tree.vue';

export default {
  name: 'App',
  data() {
    return {
      tree: [
        {
          label: 'A cool sub-folder 1',
          children: [
            { label: 'A cool sub-sub-folder 1' },
            { label: 'A cool sub-sub-folder 2' },
          ],
        },
        { label: 'This one is not that cool' },
        {
          label: 'This one is not that cool',
          children: [
            {
              label: 'A cool sub-sub-folder 1',
              children: [
                {
                  label: 'This one is not that cool',
                  children: [
                    { label: 'This one is not that cool' },
                  ],
                },
              ],
            },
            { label: 'A cool sub-sub-folder 2' },
          ],
        },
      ],
    };
  },
  components: {
    TreeView,
    Tree,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
