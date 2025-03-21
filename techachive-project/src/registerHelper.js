import {ref} from "vue";

export const showRegister = ref(false);

export function toggleRegister() {
    showRegister.value = !showRegister.value;
}