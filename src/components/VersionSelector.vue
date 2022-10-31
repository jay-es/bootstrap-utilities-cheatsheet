<script setup lang="ts">
import type { Version } from "@/lib/version";
import type { Section } from "@/types";
import { ref, watchEffect } from "vue";
import { getStorageVersion, setStorageVersion, versions } from "@/lib/version";

const emit = defineEmits<{
  (event: "change", sections: Section[]): void;
}>();

const selected = ref<Version>(getStorageVersion());

watchEffect(async () => {
  emit("change", (await import(`@/assets/data${selected.value}.json`)).default);
  setStorageVersion(selected.value);
});
</script>

<template>
  <small class="version-selector">
    Bootstrap Version:
    <select v-model="selected" class="bg-dark border-secondary rounded-1">
      <option v-for="version in versions" :key="version" :value="version">
        {{ version }}
      </option>
    </select>
  </small>
</template>

<style scoped>
.version-selector {
  color: var(--bs-gray-500);
}
select {
  color: var(--bs-gray-300);
}
</style>
