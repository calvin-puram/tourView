<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto xs-12 mt-12">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="model.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="model.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <div class=" d-flex justify-content-between align-items-center mt-4">
            <v-btn
              :disabled="loading"
              color="#009432"
              class="white--text "
              @click.prevent="handleLogin"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? '' : 'Login' }}
            </v-btn>

            <router-link to="/forgot/password">Forgot Password?</router-link>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import formMixin from '@mixins/formMixin.js';

export default {
  computed: mapGetters(['getErrors']),
  mixins: [formMixin],
  data: () => ({
    model: {
      email: '',
      password: ''
    },
    valid: true,
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => "The email and password you entered don't match"
    },

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    ...mapActions(['login']),
    handleLogin() {
      if (this.$refs.form.validate()) {
        this.toggleLoading();
        this.snackbar = true;

        this.login(this.model).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.setAuth(res.data);
            this.$noty.success("You're logged In successfully!");
          } else {
            this.$noty.error(this.getErrors);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 80vh;
}
</style>
