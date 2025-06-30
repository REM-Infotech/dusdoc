<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAt, faEye } from "@fortawesome/free-solid-svg-icons";
import { computed, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "Type Here...",
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Enter your value",
  },

  icon: {
    type: Object,
    default: faAt,
  },
});

const showPassword = ref(false);

const computedType = computed(() => {
  return props.type === "password" && !showPassword.value ? "password" : "text";
});

const emit = defineEmits(["value", "type"]);
</script>
<template>
  <div class="input-group mb-4">
    <span class="input-group-text" id="basic-addon1" v-if="props.type !== 'password'">
      <FontAwesomeIcon :icon="props.icon" />
    </span>
    <div class="form-floating">
      <input
        :type="computedType"
        class="form-control"
        id="floatingInput"
        :placeholder="props.placeholder"
        :value="props.value"
        @input="emit('value', ($event.target as HTMLInputElement)?.value || props.value)"
      />
      <label for="floatingInput">{{ props.label }}</label>
    </div>
    <span class="input-group-text" id="basic-addon1" v-if="props.type === 'password'">
      <button type="button" @click="showPassword = !showPassword">
        <FontAwesomeIcon :icon="faEye" />
      </button>
    </span>
  </div>
</template>

<style lang="css" scoped>
@import "tailwindcss";
</style>
