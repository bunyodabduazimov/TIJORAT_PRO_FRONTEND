<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

import api from '@/api';
import { useI18nPage } from '@/i18n/useI18nPage';

const { t } = useI18n();
useI18nPage('auth');


const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const agree = ref(false);
const loading = ref(false);
const errorMessage = ref('');


const router = useRouter();
const toast = useToast();


const register = async () => {
  if (!name.value || !email.value || !password.value || !password_confirmation.value) {
    errorMessage.value = t('auth.errors.fillAll');
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = t('auth.errors.password_too_short', { min: 6 });
    return;
  }

  if (password.value !== password_confirmation.value) {
    errorMessage.value = t('auth.errors.passwords_mismatch');
    return;
  }

  if (!agree.value) {
    errorMessage.value = t('auth.errors.mustAgree');
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    await api.get('/sanctum/csrf-cookie');

    await api.post('/api/v1/register',
      {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
    );

    toast.add({
      severity: 'success',
      summary: t('auth.success.register'),
      life: 4000
    });

    router.push('/auth/login');
  } catch (e) {
    errorMessage.value =
      e?.response?.data?.message || t('auth.errors.registerFailed');

    toast.add({
      severity: 'error',
      summary: t('auth.errors.registerFailed'),
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
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">

          <div class="text-center mb-8">
            <img src="/logo.svg" alt="logo" class="mx-auto mb-2 w-48 object-contain" />
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium">
              {{ t('auth.register.title') }}
            </div>
          </div>

          <div>
            <!-- Name -->
            <FloatLabel variant="on" class="mb-5">
              <InputText v-model="name" class="w-full md:w-[30rem]" />
              <label>{{ t('auth.register.name') }}</label>
            </FloatLabel>

            <!-- Email -->
            <FloatLabel variant="on" class="mb-5">
              <InputText v-model="email" class="w-full" />
              <label>{{ t('auth.register.email') }}</label>
            </FloatLabel>

            <!-- Password -->
            <FloatLabel variant="on" class="mb-5">
              <Password
                v-model="password"
                toggleMask
                fluid
                feedback
                :promptLabel="t('auth.register.password_prompt')"
                :weakLabel="t('auth.register.password_weak')"
                :mediumLabel="t('auth.register.password_medium')"
                :strongLabel="t('auth.register.password_strong')"
              />
              <label>{{ t('auth.register.password') }}</label>
            </FloatLabel>

            <!-- Password confirm -->
            <FloatLabel variant="on" class="mb-5">
              <Password
                v-model="password_confirmation"
                toggleMask
                fluid
                :feedback="false"
              />
              <label>{{ t('auth.register.passwordConfirm') }}</label>
            </FloatLabel>

            <div class="flex items-center mb-4">
              <Checkbox v-model="agree" binary class="mr-2" />
              <label class="select-none">{{ t('auth.register.agree') }}</label>
            </div>

            <p v-if="errorMessage" class="text-red-500 text-sm mb-4">
              {{ errorMessage }}
            </p>

            <Button
              :label="t('auth.register.button')"
              class="w-full mb-3"
              :loading="loading"
              @click="register"
            />

            <div class="text-center text-sm mt-2">
              {{ t('auth.register.haveAccount') }}
              <RouterLink to="/auth/login" class="text-primary font-medium">
                {{ t('auth.login.button') }}
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
