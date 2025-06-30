<script setup lang="ts">
import { faAt, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref, watch } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "Type Here...",
  },
  modelValue: {
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

const emit = defineEmits(["update:modelValue"]);

const localRef = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    localRef.value = newValue;
  },
);

watch(localRef, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
<template>
  <div class="input-group">
    <span class="input-group-text" v-if="props.type !== 'password'">
      <FontAwesomeIcon :icon="props.icon" />
    </span>
    <div class="form-floating">
      <input
        :type="computedType"
        class="form-control"
        id="floatingInput"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      />
      <label for="floatingInput">{{ props.label }}</label>
    </div>
    <span class="input-group-text" v-if="props.type === 'password'">
      <button type="button" @click="showPassword = !showPassword">
        <FontAwesomeIcon :icon="faEye" />
      </button>
    </span>
  </div>
</template>

<style lang="css" scoped>
@import "tailwindcss";
</style>
