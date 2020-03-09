<script>
import folderIcon from '../assets/folder.svg?sprite';
import folderOpenIcon from '../assets/folder-open.svg?sprite';

export default {
  name: 'tree-item',
  props: {
    item: Object,
  },
  data() {
    return {
      folderIcon,
      folderOpenIcon,
      isOpen: false,
    };
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item);
        this.isOpen = true;
      }
    },
  },
};
</script>

<template>
  <li role="treeitem" :aria-expanded="isOpen.toString()">
    <div :class="{bold: isFolder}">
      <input type="checkbox" name id>
      <i v-show="isFolder" :class="{'fas fa-folder': !isOpen, 'fas fa-folder-open': isOpen}"></i>
      <svg role="presentation">
          <use :xlink:href="'#' + folderIcon"></use>
      </svg>
      <span @dblclick="makeFolder">{{ item.name }}</span>
      <span v-if="isFolder" @click="toggle">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder" role="group">
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></tree-item>
      <li class="add" @click="$emit('add-item', item)">+</li>
    </ul>
  </li>
</template>
<style>
.item_wrapper {
  display: flex;
  flex-direction: row;
}
</style>
