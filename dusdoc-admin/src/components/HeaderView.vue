<script setup lang="ts">
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { api } from "../defaults/axios";
defineProps({
  width_sidebar: {
    type: String,
    default: "82px",
  },

  toggle: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

async function handleLogout() {
  try {
    await api.get("/auth_admin/logout");
  } catch {
    //
  }

  setTimeout(() => {
    router.push({ name: "login" });
  }, 1000);
}

const expand_sidebar = ref(false);
const toggler = ref(false);
const computeExpand = computed(() => (expand_sidebar.value ? "250px" : "82px"));

const emit = defineEmits(["update:width_sidebar", "update:toggle"]);

watch(expand_sidebar, () => {
  return emit("update:width_sidebar", computeExpand.value);
});

watch(toggler, () => {
  return emit("update:toggle", toggler.value);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a
        href="#"
        class="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto text-body-emphasis text-decoration-none"
        @click="
          expand_sidebar = !expand_sidebar;
          toggler = !toggler;
        "
      >
        <img
          src="@/assets/img/favicon.png"
          class="ms-2 bi pe-none me-2 rounded rounded-2"
          alt=""
          width="40"
          aria-hidden="true"
        />

        <span class="fs-4"> DusDoc </span>
      </a>
      <div class="d-flex gap-2" role="search">
        <button
          @click="handleLogout"
          class="btn btn-outline-danger d-flex justify-content-start align-items-start"
          type="submit"
        >
          <div>
            <FontAwesomeIcon :icon="faArrowRightFromBracket" />
          </div>
          <span class="ms-2 fw-bold">Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>
