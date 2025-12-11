<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

import api from '@/api';
import { getCookie } from '@/utils/cookies';
import { setAuthUser } from '@/router';

import i18n from '@/i18n'
import { ensureModuleLoaded } from '@/i18n/registerModule'

// состояние формы
const email = ref('');
const password = ref('');
const checked = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();
const toast = useToast();
const { t, locale } = useI18n();

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }
];

const selectedLang = ref('ru');

const STORAGE_KEY = 'lang';

onMounted(async () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    selectedLang.value = saved;
    locale.value = saved;
    await ensureModuleLoaded(i18n, saved, 'auth');
    console.log('[i18n] loaded lang from localStorage:', saved);
  } else {
    if (locale?.value) {
      selectedLang.value = locale.value;
      await ensureModuleLoaded(i18n, locale.value, 'auth');
      console.log('[i18n] using locale.value as initial:', locale.value);
    } else {
      locale.value = selectedLang.value;
      localStorage.setItem(STORAGE_KEY, selectedLang.value);
      await ensureModuleLoaded(i18n, selectedLang.value, 'auth');
      console.log('[i18n] set default lang:', selectedLang.value);
    }
  }
});

watch(selectedLang, async (val) => {
  if (!val) return;
  console.log('[i18n] selectedLang changed ->', val);

  locale.value = val;

  localStorage.setItem(STORAGE_KEY, val);

  try {
    await ensureModuleLoaded(i18n, val, 'auth');
  } catch (e) {
    console.warn('[i18n] failed to load auth module for', val, e);
  }
});

const login = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = t('auth.errors.fillAll') || 'Fill all fields';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    await api.get('/sanctum/csrf-cookie');
    const xsrfToken = getCookie('XSRF-TOKEN');

    const { data } = await api.post('/api/v1/login', {
      email: email.value,
      password: password.value
    }, { headers: { 'X-XSRF-TOKEN': xsrfToken } });

    if (data?.user) {
      setAuthUser(data.user);
    }

    toast.add({ severity: 'success', summary: t('auth.success.login') || 'Welcome', life: 3000 });

    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (e) {
    errorMessage.value = e?.response?.data?.message || t('auth.errors.loginFailed') || 'Login failed';
    toast.add({ severity: 'error', summary: t('auth.errors.loginFailed') || 'Error', detail: errorMessage.value, life: 4000 });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <FloatingConfigurator />

  <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="auth-card w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
            <div class="text-center mb-8 auth-title">
                <img src="/logo.svg" alt="logo" class="mx-auto mb-2 w-48 object-contain" />

                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-2 auth-title-text">
                {{ t('auth.login.title') }}
                </div>
            </div>

          <!-- form -->
          <div>
            <FloatLabel variant="on" class="mb-5">
              <InputText id="email1" v-model="email" :invalid="!email" class="w-full md:w-[30rem]" />
              <label for="email1">{{ t('auth.login.email') }}</label>
            </FloatLabel>

            <FloatLabel variant="on" class="mb-5">
              <Password id="password1" v-model="password" :toggleMask="true" fluid :feedback="false" class="w-full" />
              <label for="password1">{{ t('auth.login.password') }}</label>
            </FloatLabel>

            <FloatLabel variant="on" class="mb-5">
            <Dropdown
                id="langSelect"
                v-model="selectedLang"
                :options="languages"
                optionLabel="label"
                optionValue="code"
                class="w-full"
                :placeholder="t('auth.login.select_language')"
            />
            <label for="langSelect">{{ t('auth.login.language') }}</label>
            </FloatLabel>


            <div class="flex items-center justify-between mt-2 mb-4 gap-8">
              <div class="flex items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2" />
                <label for="rememberme1">
                  {{ t('auth.login.remember') }}
                </label>
              </div>

              <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">
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
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
