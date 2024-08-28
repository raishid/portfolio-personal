<template>
  <main v-if="!loading" id="about-me" class="page">
    <div id="mobile-page-title">
      <h2>_about-me</h2>
    </div>

    <div id="page-menu" class="w-full flex">
      <!-- DESKTOP section icons -->
      <div id="sections">
        <div
          id="section-icon"
          v-for="section in config?.about.sections"
          :key="section.title"
          :class="{ active: isSectionActive(section.title) }"
        >
          <img
            :id="'section-icon-' + section.title"
            :src="section.icon"
            :alt="section.title + '-section'"
            @click="focusCurrentSection(section)"
          />
        </div>
      </div>

      <!-- focused section content -->
      <div
        id="section-content"
        class="hidden lg:block w-full h-full border-right"
      >
        <!-- title -->
        <div
          id="section-content-title"
          class="hidden lg:flex items-center min-w-full"
        >
          <img
            id="section-arrow-menu"
            src="/icons/arrow.svg"
            alt=""
            class="section-arrow mx-3 open"
          />
          <p
            v-html="config?.about.sections[currentSection].title"
            class="font-fira_regular text-white text-sm"
          ></p>
        </div>

        <!-- folders -->
        <ul id="folders">
          <li
            v-for="(folder, key, index) in config?.about.sections[
              currentSection
            ].info"
            :key="key"
            class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text"
            @click="focusCurrentFolder($event, folder, index)"
            :data-accordion="folder.files ? folder.title : ''"
          >
            <div class="flex col-span-2 hover:text-white hover:cursor-pointer">
              <img
                id="diple"
                src="/icons/diple.svg"
                alt=""
                :class="{ open: isOpen(folder.title) }"
              />
              <img
                :src="'/icons/folder' + (index + 1) + '.svg'"
                alt=""
                class="mr-3"
              />
              <span
                :id="folder.title"
                v-html="key"
                :class="{ active: isActive(folder.title) }"
              ></span>
            </div>
            <ul
              v-if="folder.files !== undefined"
              class="col-span-2 pl-2 hidden h-0 overflow-hidden transition-all duration-500"
              :aria-label="`files-accordion-content-${index + 1}`"
            >
              <li
                v-for="(file, key) in folder.files"
                :key="key"
                @click="toggleFiles(key as string, file)"
                :data-folder="`${folder.title}`"
                class="hover:text-white hover:cursor-pointer flex my-2"
              >
                <img src="/icons/markdown.svg" alt="" class="ml-8 mr-3" />
                <p>{{ key }}</p>
              </li>
            </ul>
          </li>
        </ul>

        <!-- contact -->
      </div>

      <!-- mobile -->
      <div id="section-content" class="lg:hidden w-full font-fira_regular">
        <div v-for="section in config?.about.sections" :key="section.title">
          <!-- section title (mobile) -->
          <div
            :key="section.title"
            :src="section.icon"
            id="section-content-title"
            class="flex lg:hidden mb-1"
            @click="focusCurrentSection(section)"
          >
            <img
              src="/icons/arrow.svg"
              :id="'section-arrow-' + section.title"
              alt=""
              class="section-arrow"
            />
            <p v-html="section.title" class="text-white text-sm"></p>
          </div>

          <!-- folders -->
          <ul :id="'folders-' + section.title" class="hidden">
            <!-- <div :id="'folders-' + section.title" :class="currentSection == section.title ? 'block' : 'hidden'"> -->
            <li
              v-for="(folder, key, index) in config?.about.sections[
                section.title
              ].info"
              :key="key"
              class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text hover:text-white hover:cursor-pointer"
              @click="focusCurrentFolder($event, folder, index)"
              :data-accordion="folder.files ? folder.title : ''"
            >
              <div class="flex col-span-2">
                <img id="diple" src="/icons/diple.svg" />
                <img
                  :src="'icons/folder' + (index + 1) + '.svg'"
                  alt=""
                  class="mr-3"
                />
                <span
                  :id="folder.title"
                  v-html="key"
                  :class="{ active: isActive(folder.title) }"
                ></span>
              </div>
              <ul v-if="folder.files !== undefined" class="col-span-2">
                <li
                  v-for="(file, key) in folder.files"
                  :key="key"
                  @click="toggleFiles(key as string, file)"
                  :data-folder="`${folder.title}`"
                  class="hover:text-white hover:cursor-pointer flex my-2"
                >
                  <img src="/icons/markdown.svg" alt="" class="ml-8 mr-3" />
                  <p>{{ key }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- section content title -->

        <!-- section content folders -->
        <div id="contacts" class="hidden">
          <div
            v-for="(source, key) in Datacontacts?.contacts.direct.sources"
            :key="key"
            class="flex items-center my-2"
          >
            <img :src="'/icons/' + key + '.svg'" alt="" />
            <a
              v-html="source"
              :href="`mailto:${source}`"
              class="font-fira_retina text-menu-text hover:text-white ml-4"
            ></a>
          </div>
        </div>
      </div>
    </div>
    <!-- MENU END -->

    <!-- content -->
    <div class="flex flex-col lg:grid lg:grid-cols-2 h-full w-full">
      <div id="left" class="w-full flex flex-col border-right">
        <!-- windows tab desktop -->
        <div class="tab-height w-full hidden lg:flex border-bot items-center">
          <div
            class="flex items-center border-right h-full tab-primary tab-active"
          >
            <p
              v-html="windowTab"
              class="font-fira_regular text-menu-text text-sm px-3"
            ></p>
            <img src="/icons/close.svg" alt="" class="mx-3" />
          </div>
          <div
            class="flex items-center border-right h-full tab-file"
            v-if="isFileOpen"
          >
            <p
              v-html="filesTab"
              class="font-fira_regular text-menu-text text-sm px-3"
            ></p>
            <img src="/icons/close.svg" alt="" class="mx-3" />
          </div>
        </div>

        <!-- windows tab mobile -->
        <div id="tab-mobile" class="flex lg:hidden font-fira_retina">
          <span class="text-white">// </span>
          <h3
            v-html="config?.about.sections[currentSection].title"
            class="text-white px-2"
          ></h3>
          <span class="text-menu-text"> / </span>
          <h3
            v-html="config?.about.sections[currentSection].info[folder]?.title"
            class="text-menu-text pl-2"
          ></h3>
        </div>

        <!-- text -->
        <div
          id="commented-text"
          class="flex h-full w-full lg:border-right overflow-hidden"
        >
          <div class="w-full h-full ml-5 mr-10 lg:my-5 overflow-scroll">
            <CommentedText :text="infoText" v-if="infoText" />
          </div>

          <!-- scroll bar -->
          <div
            id="scroll-bar"
            class="h-full border-left hidden lg:flex justify-center py-1"
          >
            <div id="scroll"></div>
          </div>
        </div>
      </div>

      <div id="right" class="max-w-full flex flex-col">
        <!-- windows tab -->
        <div
          class="tab-height w-full h-full hidden lg:flex border-bot items-center"
        ></div>

        <!-- windows tab mobile -->
        <div
          class="tab-height w-full h-full flex-none lg:hidden items-center"
        ></div>

        <div id="gists-content" class="flex">
          <div
            id="gists"
            class="flex flex-col lg:px-6 lg:py-4 w-full overflow-hidden"
          >
            <!-- title -->
            <h3 class="text-white lg:text-menu-text mb-4 text-sm">
              // Code snippet showcase:
            </h3>

            <div class="flex flex-col overflow-scroll">
              <!-- snippets -->
              <GistSnippet
                data-aos="fade-down"
                v-for="(gist, key) in config?.gists"
                :key="key"
                :id="gist"
              />
            </div>
          </div>

          <!-- scroll bar -->
          <div
            id="scroll-bar"
            class="h-full border-left hidden lg:flex justify-center py-1"
          >
            <div id="scroll"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { About } from "~/types/ContentAbout";
import type { Home } from "~/types/ContentIndex";

useSeoMeta({
  title: "About me",
  description: "About me page of my portfolio",
  ogImage: "/demo.png",
  msapplicationTileImage: "/demo.png",
  msapplicationTileColor: "#000000",
  author: "Fede David",
  twitterCard: "summary_large_image",
  twitterTitle: "About me | Portfolio",
  twitterDescription: "About me page of my portfolio",
  twitterImage: "/demo.png",
});

const currentSection = ref(
  "personal-info" as "personal-info" | "professional-info" | "hobbies-info"
);
const folder = ref("bio");
const loading = ref(true);

const { data: config } = await useAsyncData("about-me", () =>
  queryContent<About>("about-me").findOne()
);

const { data: Datacontacts } = await useAsyncData("contacts", () =>
  queryContent<Home>("/").only("contacts").findOne()
);

const isActive = computed(() => {
  return (folderv2: string) => folderv2 === folder.value;
});
const isSectionActive = computed(() => {
  return (section: string) => currentSection.value === section;
});

const isOpen = computed(() => {
  return (folderv2: string) => folderv2 === folder.value;
});

const isFileOpen = ref(false);

const infoText = ref<string | undefined>(undefined);

const windowTab = ref(folder.value);
const filesTab = ref("");

const focusCurrentSection = (section) => {
  currentSection.value = section.title;
  folder.value = Object.keys(section.info)[0];

  const foldersElement = document.getElementById("folders-" + section.title);
  if (foldersElement !== null) {
    foldersElement.classList.toggle("hidden"); // show folders
  }
  const sectionArrow = document.getElementById(
    "section-arrow-" + section.title
  );
  if (sectionArrow !== null) {
    sectionArrow.classList.toggle("rotate-90"); // rotate arrow
  }
};

type folder = {
  title: string;
  value: string;
  description: string;
  files?: Record<string, string>;
};

const focusCurrentFolder = (event: Event, $folder: folder, index: number) => {
  const target = event.target as HTMLElement;

  if (
    target.closest("li")?.getAttribute("data-folder") === `${$folder.title}`
  ) {
    return;
  }
  isFileOpen.value = false;
  folder.value = $folder.title;
  windowTab.value = $folder.title;
  infoText.value = $folder.description;
  document.querySelector(".tab-primary")?.classList.add("tab-active");

  document.querySelectorAll("#folders li").forEach((el) => {
    if (el.getAttribute("data-accordion") !== $folder.title) {
      el.querySelectorAll("ul").forEach((ul) => {
        ul.style.height = "0px";
        setTimeout(() => {
          ul.classList.add("hidden");
        }, 500);
      });
    }
  });
  if ($folder.files) {
    const fileElement = document.querySelector(
      `[aria-label="files-accordion-content-${index + 1}"]`
    ) as HTMLElement;
    if (fileElement !== null) {
      if (fileElement.classList.contains("hidden")) {
        fileElement.classList.remove("hidden");
        fileElement.style.height = fileElement.scrollHeight + "px";
      } else {
        fileElement.style.height = "0px";
        setTimeout(() => {
          fileElement.classList.add("hidden");
        }, 500);
      }
    }
  }
};

const toggleFiles = ($key: string, $file: string) => {
  infoText.value = $file;
  filesTab.value = $key;
  isFileOpen.value = true;
  document.querySelector(".tab-active")?.classList.remove("tab-active");
  setTimeout(() => {
    document.querySelector(".tab-file")?.classList.add("tab-active");
  }, 500);
};
const showContacts = () => {
  const contactsElement = document.getElementById("contacts");
  if (contactsElement !== null) {
    contactsElement.classList.toggle("hidden");
  }
  const sectionArrow = document.getElementById("section-arrow");
  if (sectionArrow !== null) {
    sectionArrow.classList.toggle("rotate-90"); // rotate arrow
  }
};

onMounted(() => {
  loading.value = false;
  infoText.value =
    config.value?.about.sections["personal-info"].info.bio.description;
});
</script>
<style>
#sections {
  width: 5rem; /* 80px */
  height: 100%;
  display: none;
  border-right: 1px solid #1e2d3d;
}

/* LG */
@media (min-width: 1024px) {
  #sections {
    display: block;
  }
}

#section-icon {
  @apply my-6 hover:cursor-pointer flex justify-center;
  opacity: 0.4;
}

#section-icon.active {
  opacity: 1;
}

#section-icon:hover {
  opacity: 1;
}

.tab-height {
  min-height: 35px;
  max-height: 35px;
}

#tab-mobile {
  padding: 25px 20px 0px 25px;
  align-items: flex-end;
}

#scroll-bar {
  width: 20px;
}

#scroll {
  width: 14px;
  height: 7px;
  background-color: #607b96;
}

#diple {
  @apply mx-3 w-2 max-w-fit;
}

.open {
  transform: rotate(90deg);
}

.active {
  color: white;
}

#right,
#left {
  height: 100%;
  overflow: hidden;
}

#gists-content {
  height: 100%;
  overflow: hidden;
}

@media (max-width: 1024px) {
  #gists-content {
    height: 100%;
    padding: 0px 25px;
    overflow: hidden;
  }

  #about {
    min-height: stretch;
  }
}

.section-arrow {
  transition: 0.1s;
}

#section-content #contacts {
  padding: 0px 25px;
}
.tab-active {
  background-color: #0b304d;
}
</style>
