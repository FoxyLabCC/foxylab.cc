<template>
  <aside class="wiki-sidebar">
    <nav v-for="group in items" :key="group.text">
      <ul>
        <li v-for="item in group.items" :key="item.link">
          <a :href="item.link" :class="{ active: isActive(item.link) }">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { theme, site } = useData()
const route = useRoute()

const items = computed(() => {
  const path = route.path
  const locale = site.value.lang === 'zh' ? '/zh/wiki/' : '/wiki/'
  return theme.value.sidebar?.[locale] || []
})

const isActive = (link) => {
  return route.path === link || route.path === link + '.html'
}
</script>

<style scoped>
.wiki-sidebar {
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: 220px;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

li {
  margin: 0.25rem 0;
}

a {
  display: block;
  padding: 0.4rem 0.8rem;
  color: #666;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}

a:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

a.active {
  background: rgba(0, 0, 0, 0.08);
  color: #000;
  font-weight: 500;
}
</style>
