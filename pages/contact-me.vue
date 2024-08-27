<template>
  <main id="contact-me" class="page">
    <div id="mobile-page-title">
      <h2>_contact-me</h2>
    </div>

    <div class="flex flex-col w-full">
      <!-- windows tab -->
      <div
        class="tab-height w-full hidden lg:flex border-right border-bot items-center"
      >
        <div class="flex items-center border-right h-full">
          <p class="font-fira_regular text-menu-text text-sm px-3">contacts</p>
          <img src="/icons/close.svg" alt="" class="m-3" />
        </div>
      </div>

      <!-- main -->
      <div class="flex lg:grid lg:grid-cols-2 h-full w-full">
        <div
          id="left"
          class="h-full w-full flex flex-col border-right items-center"
        >
          <ContactForm
            :name="name"
            :email="email"
            :message="message"
            @submited="submited"
          />
        </div>

        <div id="right" class="h-full w-full hidden lg:flex">
          <div class="form-content">
            <FormContentCode :name="name" :email="email" :message="message" />
          </div>
          <!-- scroll bar -->
          <div
            id="scroll-bar"
            class="h-full border-left flex justify-center py-1"
          >
            <div id="scroll"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { Home } from "~/types/ContentIndex";
const name = ref("");
const email = ref("");
const message = ref("");

useSeoMeta({
  title: "Contact me",
  description: "Contact me developer page of my portfolio",
  ogImage: "/demo.png",
  msapplicationTileImage: "/demo.png",
  msapplicationTileColor: "#000000",
  author: "Fede David",
  twitterCard: "summary_large_image",
  twitterTitle: "Contact me | Portfolio",
  twitterDescription: "Contact me developer page of my portfolio",
  twitterImage: "/demo.png",
});

onMounted(() => {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const messageInput = document.getElementById("message-input");

  if (nameInput) {
    nameInput.addEventListener("input", (event) => {
      name.value = (event.target as HTMLInputElement).value;
    });
  }
  if (emailInput) {
    emailInput.addEventListener("input", (event) => {
      email.value = (event.target as HTMLInputElement).value;
    });
  }

  if (messageInput) {
    messageInput.addEventListener("input", (event) => {
      message.value = (event.target as HTMLInputElement).value;
    });
  }
  /**
   * * Close all submenus
   * ! This is a temporary solution.
   * ! This is needed because when the page is loaded, height style on #links are not applied.
   */
  const links = document.getElementsByClassName("submenu");
  for (let i = 0; i < links.length; i++) {
    if (window.innerWidth > 1024) {
      const linksElement = links[i].querySelector("#links");
      if (linksElement) {
        (linksElement as HTMLDivElement).style.display = "block";
        /* (linksElement as HTMLDivElement).style.transform = "rotate(90deg)"; */
      }
    } else {
      const linksElement = links[i].querySelector("#links");
      if (linksElement) {
        (linksElement as HTMLDivElement).style.display = "none";
      }
    }
  }
});

const submited = () => {
  name.value = "";
  email.value = "";
  message.value = "";
};
</script>

<style>
.arrow {
  transition: 0.1s;
  margin-right: 10px;
  width: 9px;
  height: 9px;
}

.submenu {
  display: flex;
  flex-direction: column;
}

.submenu .title h3 {
  @apply font-fira_regular;
  color: white;
  font-size: 16px;
}

.link {
  display: flex;
  align-items: center;
  padding: 4px 25px;
}

.link img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

#links {
  padding: 10px 0px;
}

.form-content {
  padding: 75px 50px 0px 75px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-size: 15px;
}
@media (min-width: 1024px) {
  .submenu .title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #1e2d3d;
    padding: 0px 25px;
    height: 35px;
    padding: 0px 25px;
  }
  .submenu .title:hover {
    cursor: pointer;
  }
  .submenu .title h3 {
    font-size: 14px;
  }
}
</style>
