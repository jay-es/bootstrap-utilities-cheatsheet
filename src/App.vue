<script setup lang="ts">
import SectionCard from "@/components/SectionCard.vue";

import sections from "@/assets/data.json";
</script>

<template>
  <header class="navbar bg-dark">
    <div class="container-fluid">
      <h1 class="h4 mb-0 text-white">Bootstrap Utilities Cheatsheet</h1>
    </div>
  </header>

  <main class="container-fluid py-3">
    <div class="masonry">
      <SectionCard
        v-for="section in sections"
        :key="section.title"
        :section="section"
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
