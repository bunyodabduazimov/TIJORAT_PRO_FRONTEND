<!-- AppMenu.vue -->
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AppMenuItem from './AppMenuItem.vue'; // как у тебя

const { t } = useI18n(); // мультиязычность

const model = ref([
    {
        items: [
            { label: t('menu.home'), icon: 'pi pi-fw pi-chart-pie', to: '/' },

            {
                label: t('menu.crm.title'),
                icon: 'pi pi-fw pi-at',
                items: [
                    { label: t('menu.crm.kanban'), to: '/kanban', icon: 'pi pi-fw pi-th-large' },
                    { label: t('menu.crm.leads'), to: '/lead', icon: 'pi pi-fw pi-bolt' },
                    { label: t('menu.crm.calendar'), to: '/task-calendar', icon: 'pi pi-fw pi-calendar' },
                    { label: t('menu.crm.messengers'), to: '/messengers', icon: 'pi pi-fw pi-comments' },
                    { label: t('menu.crm.sms'), to: '/smssender', icon: 'pi pi-fw pi-envelope' }
                ]
            },

            // ------ БУХГАЛТЕРИЯ ------
            {
                label: t('menu.accounting.title'),
                icon: 'pi pi-fw pi-calculator',
                items: [
                    { label: t('menu.accounting.kassa'), to: '/kassaDDS', icon: 'pi pi-fw pi-wallet' },
                    { label: t('menu.accounting.cash'), to: '/cashbalances', icon: 'pi pi-fw pi-money-bill' },
                    { label: t('menu.accounting.account_statement'), to: '/accountstatement', icon: 'pi pi-fw pi-file' },
                    { label: t('menu.accounting.debt'), to: '/debtcredit', icon: 'pi pi-fw pi-briefcase' },
                    { label: t('menu.accounting.price'), to: '/prices', icon: 'pi pi-fw pi-list' },
                    { label: t('menu.accounting.currency'), to: '/currencyrates', icon: 'pi pi-fw pi-chart-line' }
                ]
            },

            // ------ ПРОДАЖИ ------
            {
                label: t('menu.sales.title'),
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    { label: t('menu.sales.add'), to: '/addsale', icon: 'pi pi-fw pi-plus' },
                    { label: t('menu.sales.list'), to: '/sales', icon: 'pi pi-fw pi-list-check' },
                    { label: t('menu.sales.mobile'), to: '/salemobile', icon: 'pi pi-fw pi-tablet' },
                    { label: t('menu.sales.pos'), to: '/possale', icon: 'pi pi-fw pi-desktop' },
                    { label: t('menu.sales.returns'), to: '/salesreturns', icon: 'pi pi-fw pi-refresh' }
                ]
            },

            // ------ ЗАКУП ------
            {
                label: t('menu.purchase.title'),
                icon: 'pi pi-fw pi-truck',
                items: [
                    { label: t('menu.purchase.add'), to: '/addpurchase', icon: 'pi pi-fw pi-download' },
                    { label: t('menu.purchase.list'), to: '/purchases', icon: 'pi pi-fw pi-list' },
                    { label: t('menu.purchase.returns'), to: '/purchasereturns', icon: 'pi pi-fw pi-undo' }
                ]
            },

            // ------ СКЛАД ------
            {
                label: t('menu.warehouse.title'),
                icon: 'pi pi-fw pi-box',
                items: [
                    { label: t('menu.warehouse.stock_balance'), to: '/stockbalance', icon: 'pi pi-fw pi-database' },
                    { label: t('menu.warehouse.inventory'), to: '/inventories', icon: 'pi pi-fw pi-search' },
                    { label: t('menu.warehouse.transfers'), to: '/transfers', icon: 'pi pi-fw pi-share-alt' },
                    { label: t('menu.warehouse.write_off'), to: '/writeoff', icon: 'pi pi-fw pi-trash' },
                    { label: t('menu.warehouse.print'), to: '/print', icon: 'pi pi-fw pi-print' }
                ]
            },

            // ------ СПРАВОЧНИКИ ------
            {
                label: t('menu.references.title'),
                icon: 'pi pi-fw pi-book',
                items: [
                    { label: t('menu.references.counterparties'), to: '/references/counterparties', icon: 'pi pi-fw pi-users' },
                    { label: t('menu.references.products'), to: '/references/products', icon: 'pi pi-fw pi-box' },
                    { label: t('menu.references.departments'), to: '/books?type=department', icon: 'pi pi-fw pi-building' },
                    { label: t('menu.references.articles'), to: '/articles', icon: 'pi pi-fw pi-file' }
                ]
            },

            // ------ КАДРЫ ------
            {
                label: t('menu.hr.title'),
                icon: 'pi pi-fw pi-users',
                items: [
                    { label: t('menu.hr.employees'), to: '/employees', icon: 'pi pi-fw pi-user' },
                    { label: t('menu.hr.salary_calc'), to: '/calcsalary', icon: 'pi pi-fw pi-money-bill' },
                    { label: t('menu.hr.salary_pay'), to: '/paysalary', icon: 'pi pi-fw pi-credit-card' },
                    { label: t('menu.hr.debt'), to: '/employeedebitcred', icon: 'pi pi-fw pi-briefcase' },
                    { label: t('menu.hr.position'), to: '/positionemployee', icon: 'pi pi-fw pi-arrow-right-arrow-left' }
                ]
            },

            // ------ ОТЧЕТЫ ------
            {
                label: t('menu.report.title'),
                icon: 'pi pi-fw pi-chart-bar',
                items: [
                    { label: t('menu.report.sales'), to: '/reportsales', icon: 'pi pi-fw pi-chart-line' },
                    { label: t('menu.report.purchase'), to: '/reportpurchase', icon: 'pi pi-fw pi-chart-line' },
                    { label: t('menu.report.goods'), to: '/reportgoods', icon: 'pi pi-fw pi-chart-line' },
                    { label: t('menu.report.finance'), to: '/reportfinance', icon: 'pi pi-fw pi-chart-line' },
                    { label: t('menu.report.kassa'), to: '/reportkassa', icon: 'pi pi-fw pi-chart-line' },
                    { label: t('menu.report.employee'), to: '/reportemployee', icon: 'pi pi-fw pi-chart-line' }
                ]
            },

            // ------ НАСТРОЙКИ ------
            {
                label: t('menu.settings.title'),
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: t('menu.settings.account'), to: '/account', icon: 'pi pi-fw pi-user' },
                    { label: t('menu.settings.general'), to: '/settings/general', icon: 'pi pi-fw pi-sliders-h' },
                    { label: t('menu.settings.stores'), to: '/settings/stores', icon: 'pi pi-fw pi-map-marker' },
                    { label: t('menu.settings.users'), to: '/settings/users', icon: 'pi pi-fw pi-users' },
                    { label: t('menu.settings.plans'), to: '/plans', icon: 'pi pi-fw pi-calendar-plus' },
                    { label: t('menu.settings.currency'), to: '/currencysettings', icon: 'pi pi-fw pi-dollar' },
                    { label: t('menu.settings.accounts'), to: '/cashesettings', icon: 'pi pi-fw pi-money-bill' },
                    { label: t('menu.settings.warehouses'), to: '/stocksettings', icon: 'pi pi-fw pi-box' },
                    { label: t('menu.settings.begin_balance'), to: '/begin_balance', icon: 'pi pi-fw pi-database' },
                    { label: t('menu.settings.documents'), to: '/documents', icon: 'pi pi-fw pi-file' }
                ]
            },

            // ------ ПОДДЕРЖКА ------
            {
                label: t('menu.support.title'),
                icon: 'pi pi-fw pi-question-circle',
                items: [
                    { label: t('menu.support.guide'), to: '/stepbystep', icon: 'pi pi-fw pi-book' },
                    { label: t('menu.support.soft'), to: '/softs', icon: 'pi pi-fw pi-download' },
                    { label: t('menu.support.faq'), to: '/faq', icon: 'pi pi-fw pi-comment' },
                    { label: t('menu.support.video'), url: 'https://www.youtube.com/@tijorat-pro', icon: 'pi pi-fw pi-video', target: '_blank' }
                ]
            }
        ]
    },
]);

</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <AppMenuItem :item="item" :index="i" />
        </template>
    </ul>
</template>

<style scoped></style>
