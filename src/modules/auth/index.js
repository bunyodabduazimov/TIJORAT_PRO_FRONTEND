// экспортируем модуль как PLUGIN
import routes from './router'

export default {
  routes,            // маршруты
  name: 'auth',      // имя модуля
  i18n: true,        // есть ли i18n?
  api: true          // есть ли API?
}
