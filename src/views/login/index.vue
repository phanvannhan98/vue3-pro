<script setup lang="ts">
  import { get } from 'lodash-es';

  import { regexEmail } from '@/constants/index';
  import { useAuthStore } from '@/store/modules/auth';

  interface IFormData {
    email: string;
    password: string;
  }

  const formData = reactive<IFormData>({
    email: '',
    password: '',
  });

  const rules: TRules<IFormData> = {
    email: {
      required: true,
      pattern: regexEmail,
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 20,
    },
  };

  const loginError = ref<TFormMessageAttr>();

  const { login } = useAuthStore();

  const onSubmit = () => {
    login(formData).catch((res) => {
      // if (res.response?.status === 422) {
      //   formErrors.value = get(res, 'response.data.error', '');
      //   return;
      // }

      loginError.value = get(res, 'response.data.errors', '');
    });
  };
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="flex w-[415px] flex-col flex-nowrap justify-center rounded-md border p-7 text-center"
    >
      <div class="login-icon flex items-center justify-center">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full border bg-gradient-to-r from-cpurple-2 to-cpurple-4"
        >
          <g-icon class="text-white" icon="user-circle-white" />
        </div>
      </div>
      <div class="mt-6 flex w-full flex-col justify-center pb-5 text-center">
        <h5 class="text-cblue-6 pb-4 text-2xl font-medium">Sign up to Team Management</h5>
        <div class="">
          <p class="text-cblack-4">
            Already have an account?
            <span class="text-cviolet-400">Login</span>
          </p>
        </div>
      </div>

      <div class="login-social flex flex-col justify-center">
        <button class="mb-3 flex rounded-md border p-3">
          <g-icon class="w-6" :icon="'calendar'" />
          <span class="pl-20">Sign up with Google</span>
        </button>
        <button class="mb-4 flex rounded-md border p-3">
          <g-icon class="w-6" :icon="'chat'" />
          <span class="pl-20">Sign up with Facebook</span>
        </button>
      </div>

      <div class="relative mb-4">
        <span class="bg-white px-3">OR</span>
        <div class="absolute top-1/2 -z-10 w-full -translate-y-1/2 border-t"></div>
      </div>

      <g-form :model="formData" :rules="rules" @finish="onSubmit">
        <g-form-item class="mb-5" label="Email" name="email">
          <input
            v-model="formData.email"
            autocomplete="off"
            class="h-9 w-full rounded-lg border pl-2"
            name="email"
          />
        </g-form-item>
        <g-form-item class="mb-5" label="Password" name="password">
          <input
            v-model="formData.password"
            autocomplete="off"
            class="h-9 w-full rounded-lg border pl-2"
            name="password"
            type="password"
          />
        </g-form-item>

        <label class="mb-2 flex items-start justify-start">
          <input id="policy_1" class="mr-3 mt-1.5" name="cb-1" type="checkbox" />
          <span class="text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </span>
        </label>

        <label class="mb-5 flex items-start justify-start">
          <input id="policy_2" class="mr-3 mt-1.5" name="cb-2" type="checkbox" />
          <span class="text-left">It is a long established fact that a reader</span>
        </label>

        <button class="w-full rounded-lg bg-black py-3.5 text-white" type="submit">Login</button>

        <div v-if="loginError">
          <p class="text-cred-5">{{ $t('message.' + loginError.code, loginError.params) }}</p>
        </div>
      </g-form>
    </div>
  </div>
</template>
