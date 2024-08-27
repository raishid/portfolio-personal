<template>
  <notifications
    position="top right"
    :classes="error ? 'not-succ error' : 'not-succ'"
  />
  <form id="contact-form" class="text-sm" @submit.prevent="sendEmail">
    <div class="flex flex-col">
      <label for="name" class="mb-3">_name:</label>
      <input
        type="text"
        id="name-input"
        name="name"
        :placeholder="name"
        :value="name"
        class="p-2 mb-5 placeholder-slate-600"
        required
      />
    </div>
    <div class="flex flex-col">
      <label for="email" class="mb-3">_email:</label>
      <input
        type="email"
        id="email-input"
        name="email"
        :placeholder="email"
        :value="email"
        class="p-2 mb-5 placeholder-slate-600"
        required
      />
    </div>
    <div class="flex flex-col">
      <label for="message" class="mb-3">_message:</label>
      <textarea
        id="message-input"
        name="message"
        :placeholder="message"
        :value="message"
        class="placeholder-slate-600"
        required
      ></textarea>
    </div>
    <div class="mt-4">
      <NuxtTurnstile ref="turnstile" v-model="token" />
    </div>
    <button
      id="submit-button"
      type="submit"
      class="py-2 px-4"
      :disabled="sending"
    >
      submit-message
    </button>
  </form>
</template>
<script setup lang="ts">
import { useNotification } from "@kyvg/vue3-notification";

const props = defineProps({
  name: String,
  email: String,
  message: String,
});

const turnstile = ref(null);
const token = ref("");
const sending = ref(false);

const { notify } = useNotification();
const error = ref(false);

const emit = defineEmits(["submited"]);

const sendEmail = async () => {
  console.log("Sending email...");
  sending.value = true;
  try {
    await $fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: props.name,
        email: props.email,
        message: props.message,
        token: token.value,
      }),
    });
    notify({
      title: "Email sent",
      text: "Email sent successfully!",
    });
  } catch (err) {
    error.value = true;
    notify({
      title: "Error",
      text: "An error occurred while sending the email",
    });
  }

  emit("submited");

  setTimeout(() => {
    error.value = false;
    turnstile.value?.reset();
    sending.value = false;
  }, 2000);
};
</script>

<style>
.not-succ {
  background: #273e53;
  color: #e99287;
  @apply px-4 py-2;

  .notification-title {
    color: #5565e8;
  }
}
.not-succ.error {
  .notification-title {
    color: #9d2f1e;
  }
}
form {
  @apply font-fira_retina text-menu-text;
}
input {
  background-color: #011221;
  border: 2px solid #1e2d3d;
  border-radius: 7px;
}
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: rgb(190, 190, 190);
  transition: background-color 5000s ease-in-out 0s;
  border: 2px solid #607b96;
}

#message-input {
  background-color: #011221;
  border: 2px solid #1e2d3d;
  border-radius: 7px;
  resize: none;
  height: 150px;
  padding: 10px;
}

#submit-button {
  @apply font-fira_retina text-white text-sm mt-[10px] lg:mt-[20px];
  background-color: #1e2d3d;
  border-radius: 7px;
  cursor: pointer;
}

#submit-button:hover {
  background-color: #263b50;
}

input:focus,
#message-input:focus {
  outline: none;
  transition: none;
  border: 2px solid #607b96;
  box-shadow: #607b9669 0px 0px 0px 2px;
}

#contact-form {
  max-width: 370px;
  width: 100%;
}

@media (max-width: 1920px) {
  #contact-form {
    max-width: 320px;
    max-height: 400px;
  }
  #submit-button {
    /* width: 100%; */
    font-size: 12px;
  }
  textarea {
    font-size: 13px;
    max-height: 130px !important;
  }
  input {
    font-size: 13px;
  }
}
</style>
