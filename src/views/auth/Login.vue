<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

import api from '@/api';
import { useAuthStore } from '@/stores/auth';


import { useI18nPage, changeLanguage } from '@/i18n/useI18nPage';

const { t } = useI18n();
useI18nPage('auth'); 


const email = ref('');
const password = ref('');
const checked = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();
const toast = useToast();
const auth = useAuthStore();


const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }
];

const selectedLang = ref(localStorage.getItem('lang') || 'ru');

const onLangChange = async (lang) => {
  await changeLanguage(lang, 'auth');
};


const login = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = t('auth.errors.fillAll');
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    await api.get('/sanctum/csrf-cookie');

    const { data } = await api.post('/api/v1/login',
      {
        email: email.value,
        password: password.value
      }
    );

    // ✅ сохраняем пользователя в Pinia
    auth.user = data.user;
    auth.initialized = true;

    toast.add({
      severity: 'success',
      summary: t('auth.success.login'),
      life: 3000
    });

    router.push(route.query.redirect || '/');
  } catch (e) {
    errorMessage.value =
      e?.response?.data?.message || t('auth.errors.loginFailed');

    toast.add({
      severity: 'error',
      summary: t('auth.errors.loginFailed'),
      detail: errorMessage.value,
      life: 4000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <FloatingConfigurator />

  <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div
        style="border-radius: 56px; padding: 0.3rem;
        background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
      >
        <div class="auth-card w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
          <div class="text-center mb-8 auth-title">
            <img src="/logo.svg" alt="logo" class="mx-auto mb-2 w-48 object-contain" />
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-2">
              {{ t('auth.login.title') }}
            </div>
          </div>

          <!-- form -->
          <div>
            <FloatLabel variant="on" class="mb-5">
              <InputText v-model="email" class="w-full md:w-[30rem]" />
              <label>{{ t('auth.login.email') }}</label>
            </FloatLabel>

            <FloatLabel variant="on" class="mb-5">
              <Password v-model="password" toggleMask fluid :feedback="false" />
              <label>{{ t('auth.login.password') }}</label>
            </FloatLabel>

            <FloatLabel variant="on" class="mb-5">
              <Dropdown
                v-model="selectedLang"
                :options="languages"
                optionLabel="label"
                optionValue="code"
                class="w-full"
                @change="onLangChange($event.value)"
              />
              <label>{{ t('auth.login.language') }}</label>
            </FloatLabel>

            <div class="flex items-center justify-between mt-2 mb-4 gap-8">
              <div class="flex items-center">
                <Checkbox v-model="checked" binary class="mr-2" />
                <label>{{ t('auth.login.remember') }}</label>
              </div>

              <span class="font-medium text-primary cursor-pointer">
                {{ t('auth.login.forgot') }}
              </span>
            </div>

            <p v-if="errorMessage" class="text-red-500 text-sm mb-4">
              {{ errorMessage }}
            </p>

            <Button
              :label="t('auth.login.button')"
              class="w-full"
              :loading="loading"
              @click="login"
            />

            <div class="text-center text-sm text-muted-color mt-4">
              {{ t('auth.login.no_account') }}
              <RouterLink to="/auth/register" class="text-primary font-medium">
                {{ t('auth.login.create') }}
              </RouterLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye,
.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
