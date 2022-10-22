<script setup lang="ts">
import SectionCard from "@/components/SectionCard.vue";

import sections from "@/assets/data.json";
import { ref } from "vue";

const searchWord = ref("");
</script>

<template>
  <header class="py-3 container-fluid bg-dark">
    <div class="row row-cols-md-2 row-cols-lg-3">
      <div class="col-md">
        <h1 class="h4 mb-0 text-white">Bootstrap Utilities Cheatsheet</h1>
      </div>
      <small class="col-md text-md-end order-lg-3">
        <span class="text-muted">Bootstrap Version: 4.6.2</span>
      </small>
      <div class="col-md order-lg-2 mt-2 mt-lg-0">
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

  <footer class="py-2 text-center text-muted">&copy;jay-es</footer>
</template>

<style scoped lang="scss">
main {
  background-color: var(--bs-gray-100);
}

.masonry {
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
}
</style>
