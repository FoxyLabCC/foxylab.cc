<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { site, frontmatter } = useData()
const showLangMenu = ref(false)

const toggleLangMenu = () => {
  showLangMenu.value = !showLangMenu.value
}

const langs = [
  { code: 'en', label: 'English', path: '/' },
  { code: 'zh', label: '中文', path: '/zh/' }
]
</script>

<template>
  <div v-if="frontmatter.home" class="home-layout">
    <img src="/flabtail.svg" alt="" class="bg-logo" />
    <div class="content-box">
      <h1 class="title">
        <span class="title-line">Foxy</span>
        <span class="title-line">Lab</span>
      </h1>
      <p class="desc">{{ site.description }}</p>
      <div v-if="frontmatter.hero?.actions" class="actions">
        <a
          v-for="(action, idx) in frontmatter.hero.actions.slice(0, 3)"
          :key="idx"
          :href="action.link"
          class="btn"
        >
          {{ action.text }}
        </a>
      </div>
    </div>
    <div class="lang-switcher">
      <button @click="toggleLangMenu" class="lang-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </button>
      <div v-if="showLangMenu" class="lang-menu">
        <a v-for="lang in langs" :key="lang.code" :href="lang.path" class="lang-item">
          {{ lang.label }}
        </a>
      </div>
    </div>
  </div>
  <div v-else-if="frontmatter.products" class="products-layout">
    <a href="/" class="bg-logo-link">
      <img src="/flabtail.svg" alt="Back to home" class="bg-logo" />
    </a>
    <div class="products-container">
      <div
        v-for="(product, idx) in frontmatter.products"
        :key="idx"
        class="product-item"
        :style="{
          left: product.left,
          top: product.top,
          transform: `scale(${product.scale || 1}) rotate(${product.rotate || 0}deg)`
        }"
      >
        <a :href="product.link" class="product-link">
          <img :src="product.image" :alt="product.name" class="product-img" />
          <div class="product-info">
            <p class="product-desc">{{ product.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div v-else-if="frontmatter.resources" class="resources-layout">
    <a href="/" class="bg-logo-link">
      <img src="/flabtail.svg" alt="Back to home" class="bg-logo" />
    </a>
    <div class="resources-card">
      <div class="resources-grid">
        <a
          v-for="(resource, idx) in frontmatter.resources"
          :key="idx"
          :href="resource.link"
          class="resource-item"
          target="_blank"
        >
          <img :src="resource.icon" :alt="resource.name" class="resource-icon" />
          <span class="resource-name">{{ resource.name }}</span>
        </a>
      </div>
    </div>
  </div>
  <div v-else class="wiki-wrapper">
    <a href="/" class="bg-logo-link wiki-back-link">
      <img src="/flabtail.svg" alt="Back to home" class="wiki-bg" />
    </a>
    <DefaultTheme.Layout />
  </div>
</template>

<style>
.wiki-wrapper {
  position: relative;
  min-height: 100vh;
}

.wiki-bg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 60vw;
  height: auto;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.wiki-back-link {
  position: fixed;
  bottom: 0;
  left: 0;
  width: clamp(140px, 22vw, 320px);
  height: auto;
  display: block;
  z-index: 30;
}

.wiki-back-link .wiki-bg {
  position: static;
  width: 100%;
}

.bg-logo-link:hover .wiki-bg {
  opacity: 0.3;
}

.wiki-wrapper :deep(aside.VPSidebar) {
  position: fixed !important;
  top: 2rem !important;
  left: 2rem !important;
  width: 220px !important;
  max-height: calc(100vh - 4rem) !important;
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(15px) !important;
  -webkit-backdrop-filter: blur(15px) !important;
  border: 2px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  z-index: 20 !important;
}


.wiki-wrapper :deep(aside.VPSidebar *) {
  background: transparent !important;
}

.wiki-wrapper :deep(.VPNav),
.wiki-wrapper :deep(.VPNavBar) {
  display: none !important;
}

.wiki-wrapper :deep(.VPDoc) {
  background: transparent !important;
  padding-top: 0 !important;
}

@media (max-width: 768px) {
  .wiki-back-link {
    width: clamp(96px, 30vw, 180px);
    z-index: 40;
  }
}
</style>
