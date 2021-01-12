<template>
  <form @submit.prevent="onsubmit()">

      <va-input
      v-model="firstName"
      type="firstName"
      :label="$t('firstName')"
      :error="!!firstNameError.length"
      :error-messages="firstNameError"
    />

      <va-input
      v-model="lastName"
      type="lastName"
      :label="$t('lastName')"
      :error="!!lastNameError.length"
      :error-messages="lastNameError"
    />

    <va-input
      v-model="telephone"
      type="telephone"
      :label="$t('telephone')"
      :error="!!telephoneError.length"
      :error-messages="telephoneError"
    />

    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :errorMessages="agreedToTermsErrors"
      >
        <template slot="label">
          {{ $t('auth.agree') }}
          <span class="link">{{ $t('auth.termsOfUse') }}</span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">
        {{$t('auth.recover_password')}}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      firstName : '',
      lastName: '',
      telephone: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],

      firstNameError : [],
      lastNameError:[],
      telephoneError: [],

      agreedToTermsErrors: [],
    }
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.firstNameError = this.firstName ? [] : ['FirstName is required']
      this.lastNameError = this.lastName ? [] : ['LastName is required']
      this.telephoneError = this.telephone ? [] : ['Telephone is required']

      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['You must agree to the terms of use to continue']
      if (!this.formReady) {
        return
      }
     this.$axios
        .post(`${this.$apiURL}register`, {
          firstName: this.firstName,
          lastName: this.lastName,
          roleID: 1,
          telephone : this.telephone,
          email : this.email,
          password : this.password,

        })
        .then(results => {
           this.$router.push({ name: 'login'})
        })
        .catch(error => {
            console.log(error);
        });

    },
  },
  computed: {
    formReady () {
      return !(this.emailErrors.length || this.passwordErrors.length || this.agreedToTermsErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
