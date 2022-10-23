<script setup lang="ts">
import SectionCard from "@/components/SectionCard.vue";

import sections from "@/assets/data.json";
import { ref } from "vue";

const searchWord = ref("");
</script>

<template>
  <header class="container-fluid py-3 bg-dark">
    <div class="d-md-flex align-items-center row-cols-xl-3">
      <div class="flex-grow-1">
        <h1 class="h4 mb-0 text-white">Bootstrap Utilities Cheatsheet</h1>
      </div>
      <div class="flex-grow-1 order-md-3 text-md-end">
        <small class="text-muted">Bootstrap Version: 4.6.2</small>
      </div>
      <div class="flex-grow-1 order-md-2 mt-2 mt-md-0">
        <input
          v-model="searchWord"
          class="form-control"
          placeholder="Search..."
          autofocus
        />
      </div>
    </div>
  </header>

  <main class="container-fluid py-3">
    <div class="masonry">
      <SectionCard
        v-for="section in sections"
        :key="section.title"
        :section="section"
        :searchWord="searchWord"
      />
    </div>
  </main>

  <footer class="pb-3 text-center">
    <small class="text-muted">&copy;2022 jay-es</small>
  </footer>
</template>

<style scoped lang="scss">
.masonry {
  $space: 1rem;
  column-gap: $space;

  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
    column-count: 2;
  }
  @media (min-width: 992px) {
    column-count: 3;
  }
  @media (min-width: 1200px) {
    column-count: 4;
  }
  @media (min-width: 1400px) {
  }

  > .card {
    margin-bottom: $space;
    break-inside: avoid;
  }
}
</style>
