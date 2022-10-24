<script setup lang="ts">
import type { Style } from "@/types";
import { computed, defineProps } from "vue";

const props = defineProps<{ style: Style; searchWord: string }>();
const selector = props.style.selector.split(", ").join("\n");

const visible = computed(() => {
  const { searchWord, style } = props;

  return (
    !searchWord ||
    style.selector.includes(searchWord) ||
    style.contents.includes(searchWord)
  );
});
</script>

<template>
  <tr v-show="visible">
    <td class="selector">
      <pre><code>{{ selector }}</code></pre>
    </td>
    <td>
      <pre><code>{{ style.contents }}</code></pre>
    </td>
  </tr>
</template>

<style scoped>
.selector {
  color: var(--bs-code-color);
}

pre {
  margin: 0;
}
code {
  font-size: 12px;
}
</style>
