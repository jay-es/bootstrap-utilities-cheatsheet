<script setup lang="ts">
import type { Style } from "@/types";
import { defineProps } from "vue";

const props = defineProps<{ style: Style }>();
const selector = props.style.selector.split(", ").join("\n");
</script>

<template>
  <tr>
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
