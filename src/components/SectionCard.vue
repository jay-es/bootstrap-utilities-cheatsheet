<script setup lang="ts">
import type { Section } from "@/types";
import { defineProps } from "vue";
import StyleBox from "./StyleBox.vue";

defineProps<{ section: Section; searchWord: string }>();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title h6">{{ section.title }}</h2>

      <div class="table-responsive">
        <table class="table table-sm mb-0">
          <tbody class="border-top align-text-top">
            <StyleBox
              v-for="style in section.styles"
              :key="style.selector"
              :style="style"
              :searchWord="searchWord"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-responsive {
  $scrollbar-size: 8px;

  &::-webkit-scrollbar {
    height: $scrollbar-size;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--bs-gray-300);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: calc($scrollbar-size / 2);
    background-color: var(--bs-gray-500);

    &:hover {
      background-color: var(--bs-gray-600);
    }
  }
}
</style>
