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

          <v-btn
            :disabled="loading"
            color="#009432"
            class="white--text "
            @click.prevent="handleforgotPassword"
          >
            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
            {{ loading ? '' : 'Login' }}
          </v-btn>
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
      email: ''
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
    ...mapActions(['forgotPassword']),
    handleforgotPassword() {
      if (this.$refs.form.validate()) {
        this.toggleLoading();
        this.snackbar = true;

        this.forgotPassword(this.model).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success(
              'Reset passsword link sent to your email successfully!'
            );
            this.$router.push('/');
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
