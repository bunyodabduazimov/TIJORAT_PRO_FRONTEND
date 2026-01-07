import { defineStore } from 'pinia';
import { productsApi } from '../api/products.api';
import { groupsApi } from '../api/groups.api';
import { brandsApi } from '../api/brands.api';
import { unitsApi } from '../api/units.api';

export const useCatalogStore = defineStore('catalog', {
    state: () => ({
        products: [],
        services: [],
        groups: [],
        brands: [],
        units: [],
        loading: false
    }),

    actions: {
        async loadProducts() {
            this.loading = true;
            const { data } = await productsApi.get({ type: 'product' });
            this.products = data.data ?? data;
            this.loading = false;
        },

        async loadServices() {
            const { data } = await productsApi.get({ type: 'service' });
            this.services = data.data ?? data;
        },

        async loadReferences() {
            const [g,b,u] = await Promise.all([
                groupsApi.get(),
                brandsApi.get(),
                unitsApi.get()
            ]);

            this.groups = g.data;
            this.brands = b.data;
            this.units = u.data;
        }
    }
});
