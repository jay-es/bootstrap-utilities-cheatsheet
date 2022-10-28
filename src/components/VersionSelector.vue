<script setup lang="ts">
import type { Version } from "@/lib/version";
import type { Section } from "@/types";
import { ref, watchEffect } from "vue";
import { getStorageVersion, setStorageVersion, versions } from "@/lib/version";

const emit = defineEmits<{
  (event: "change", sections: Section[]): void;
}>();

const version = ref<Version>(getStorageVersion());

watchEffect(async () => {
  if (version.value === "462") {
    emit("change", (await import("@/assets/data4.6.2.json")).default);
  } else if (version.value === "502") {
    emit("change", (await import("@/assets/data5.0.2.json")).default);
  }

  setStorageVersion(version.value);
});
</script>

<template>
  <small class="version-selector">
    Bootstrap Version:
    <select v-model="version" class="bg-dark border-secondary rounded-1">
      <option v-for="(text, key) in versions" :key="key" :value="key">
        {{ text }}
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
