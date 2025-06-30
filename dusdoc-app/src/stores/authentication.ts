import { defineStore } from "pinia";
import { reactive } from "vue";

const authenticationStore = defineStore("authenticationStor", () => {
  const form = reactive({
    email: "",
    password: "",
  });

  return { form };
});

export default authenticationStore;
