// src/layout/menuModel.js
import { useI18n } from 'vue-i18n';
export default function createMenuModel(t) {
  return [
    {
      label: t('menu.home'),
      icon: 'pi pi-fw pi-chart-pie',
      to: '/'
    },
    {
      label: t('menu.crm.title'),
      icon: 'pi pi-fw pi-at',
      items: [
        { label: t('menu.crm.kanban'), to: '/kanban', icon: 'pi pi-fw pi-th-large' },
        { label: t('menu.crm.leads'), to: '/lead', icon: 'pi pi-fw pi-bolt' },
        { label: t('menu.crm.calendar'), to: '/task-calendar', icon: 'pi pi-fw pi-calendar' },
        { label: t('menu.crm.messengers'), to: '/messengers', icon: 'pi pi-fw pi-comments' },
        { label: t('menu.crm.sms'), to: '/smssender', icon: 'pi pi-fw pi-envelope' }
      ],
      aside: {
        title: t('menu.crm.title'),
        text: t('menu.crm.description') || '',
        cta: { label: t('menu.crm.open'), to: '/crm' }
      }
    },
    // (Добавьте остальные секции аналогично — можно скопировать из вашего AppMenu.vue)
  ];
}
