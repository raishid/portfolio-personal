<template>
  <div id="mobile-menu" class="w-full z-10 lg:hidden">
    <!-- header -->
    <div
      id="mobile-header"
      class="w-full h-16 flex justify-between items-center"
    >
      <NuxtLink
        class="text-menu-text font-fira_retina flex h-full items-center mx-5"
        to="/"
        @click="goHome()"
      >
        {{ config?.logo_name }}
      </NuxtLink>
      <img
        src="/icons/burger.svg"
        v-if="!menuOpen"
        @click="toggleMobileMenu()"
        class="w-5 h-5 mx-5 my-auto"
      />
      <img
        src="/icons/burger-close.svg"
        v-else
        @click="toggleMobileMenu()"
        name="icon-park-outline:close"
        class="w-5 h-5 mx-5 my-auto"
      />
    </div>

    <!-- mobile menu -->
    <div id="menu" class="bg-mobile-menu-blue z-10 hidden">
      <NuxtLink
        id="nav-link-mobile"
        to="/"
        :class="{ active: isActive('/') }"
        @click="toggleMobileMenu()"
      >
        _hello
      </NuxtLink>

      <NuxtLink
        id="nav-link-mobile"
        to="/about-me"
        :class="{ active: isActive('/about-me') }"
        @click="toggleMobileMenu()"
      >
        _about-me
      </NuxtLink>

      <NuxtLink
        id="nav-link-mobile"
        to="/projects"
        :class="{ active: isActive('/projects') }"
        @click="toggleMobileMenu()"
      >
        _projects
      </NuxtLink>

      <NuxtLink
        id="nav-link-mobile"
        to="/contact-me"
        :class="{ active: isActive('/contact-me') }"
        @click="toggleMobileMenu()"
      >
        _contact-me
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Home } from "~/types/ContentIndex";

const menuOpen = ref(false);

const { data: config } = await useAsyncData("logo_name", () =>
  queryContent<Home>("/").only("logo_name").findOne()
);

const router = useRoute();

const isActive = computed(() => (route: string) => router.path === route);

const toggleMobileMenu = () => {
  menuOpen.value ? (menuOpen.value = false) : (menuOpen.value = true);

  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("hidden");
  }

  const page = document.getElementsByTagName("main")[0];
  if (page.style.display === "none") {
    page.style.display = "flex";
  } else {
    page.style.display = "none";
  }
};
const goHome = () => {
  const menu = document.getElementById("menu");
  if (menu && !menu.classList.contains("hidden")) {
    menu.classList.toggle("hidden");
    document.getElementsByTagName("main")[0].style.display = "flex";
    menuOpen ? (menuOpen.value = false) : (menuOpen.value = true);
  }
};
</script>

<style>
#mobile-header {
  border-bottom: 1px solid #1e2d3d;
}

#nav-link-mobile {
  border-bottom: 1px solid #1e2d3d;
  @apply text-menu-text font-fira_retina px-6 py-4 flex items-center;
}

#nav-link-mobile.active {
  color: white;
}
</style>
