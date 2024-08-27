<template>
  <div
    id="project"
    :key="key"
    class="lg:mx-5"
    v-motion-slide-bottom="{
      initial: { y: 100, opacity: 0 },
      enter: {
        y: 0,
        opacity: 1,
        transition: transition,
      },
    }"
  >
    <span class="flex text-sm my-3">
      <h3 v-if="index == null" class="text-purplefy font-fira_bold mr-3">
        Project <span v-if="key">{{ key + 1 }}</span>
      </h3>
      <h3 v-else class="text-purplefy font-fira_bold mr-3">
        Project {{ index + 1 }}
      </h3>
      <h4 class="font-fira_retina text-menu-text">// {{ project.title }}</h4>
    </span>

    <div
      id="project-card"
      class="flex flex-col hover:scale-95 transition-all duration-300 ease-in-out"
    >
      <div id="window">
        <div class="absolute flex right-3 top-3">
          <img
            v-for="tech in project.tech"
            :key="tech"
            :src="`/icons/techs/filled/${tech.toLowerCase()}.svg`"
            alt=""
            class="w-6 h-6 mx-1 hover:opacity-75"
          />
        </div>
        <img
          id="showcase"
          :src="project.img"
          alt=""
          class="lg:min-w-[400px] lg:min-h-[200px] object-fill"
        />
      </div>

      <div
        class="pb-8 pt-6 px-6 border-top flex flex-col justify-between max-h-[240px] h-full lg:max-h-[none] lg:h-auto"
      >
        <p class="text-menu-text font-fira_retina text-sm mb-5">
          {{ project.description }}
        </p>
        <a
          id="view-button"
          :href="project.url"
          :target="project.url === '#' ? '_self' : '_blank'"
          class="text-white font-fira_retina px-2 py-3 block text-center md:py-2 md:px-4 md:w-fit text-xs rounded-lg"
        >
          view-project
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const { project, key, index } = defineProps([
  "project",
  "key",
  "index",
  "transition",
]);
</script>

<style scoped>
#project {
  min-width: 400px;
  margin-bottom: 5px;
}

#project-card {
  border: 1px solid #1e2d3d;
  background-color: #011221;
  border-radius: 15px;
  max-width: 400px;
  height: 350px;
}

#window {
  max-height: 200px;
  position: relative;
  overflow: hidden;
}

#showcase {
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

@media (max-width: 768px) {
  #project {
    min-width: 100%;
  }
}

@media (min-width: 768px) {
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 5px;
  }
}

@media (min-width: 1350px) {
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 20px;
  }
}
</style>
