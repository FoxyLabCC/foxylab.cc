import DefaultTheme from 'vitepress/theme'
import CustomLayout from './Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout
}
