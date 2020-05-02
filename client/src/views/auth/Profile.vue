<template>
  <div v-if="auth">
    <div class="row">
      <div class="col-lg-3  col-xs-12 profile__sidebar pt-10">
        <div>
          <div>
            <v-list color="#f4f4f4" light flat>
              <v-list-item-group v-model="item" color="#333">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  link
                  :to="{ name: item.route }"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <!-- MAIN CONTAINER -->
        <div class="main_profile">
          <h2 class="text-center headline mt-5">YOUR ACCOUNT SETTINGS</h2>

          <v-form ref="formm" v-model="valid">
            <v-text-field
              v-model="name"
              :counter="50"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-btn color="success" class="my-4 " @click="updateUser">
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? '' : 'SAVE SETTINGS' }}
            </v-btn>
          </v-form>
          <div class="my-5">
            <Uploads />
          </div>
        </div>
        <div class="mt-12 pb-5 main_profile">
          <!-- PASSWORD CHANGE -->
          <v-divider></v-divider>
          <h2 class="text-center headline">PASSWORD CHANGE</h2>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="currentPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Current Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="newPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="New Password"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show3 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password"
              hint="At least 8 characters"
              counter
              @click:append="show3 = !show3"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 mb-6 float-right"
              @click="updatePassword"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? '' : 'SAVE PASSWORD' }}
            </v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Uploads from '@layouts/Uploads';
import formMixin from '@mixins/formMixin.js';
export default {
  components: {
    Uploads
  },
  computed: mapGetters(['getProfile', 'getProfileErrors', 'getErrors']),
  mixins: [formMixin],
  data: () => ({
    file: '',
    item: 1,
    items: [
      {
        text: ' Favorite Tours',
        icon: 'mdi-heart',
        route: 'favorite'
      },
      {
        text: 'My Reviews',
        icon: 'mdi-star-four-points',
        route: 'my-reviews'
      },
      { text: 'My Bookings', icon: 'mdi-credit-card', route: 'bookings' }
    ],

    valid: true,
    name: '',
    nameRules: [
      v => !!v || ' Name is required',
      v => (v && v.length <= 50) || 'Name must be more than 50 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    currentPassword: '',
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    newPassword: '',
    show2: false,

    confirmPassword: '',
    show3: false
  }),
  methods: {
    ...mapActions(['updateProfiledetails', 'updateProfilePassword']),
    OnfileChange(e) {
      this.file = e.target.files[0];
    },
    // UPDATE USER DETAILS ACTION
    updateUser() {
      this.toggleLoading();
      if (this.$refs.formm.validate()) {
        this.snackbar = true;
        const user = {
          name: this.name,
          email: this.email
        };
        this.updateProfiledetails(user).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success('Profile Details Updated successfully!');
            localStorage.setItem('auth', JSON.stringify(res.data));
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.token}`;
          } else {
            this.$noty.error(this.getProfileErrors);
          }
        });
      }
    },
    // UPDATE PASSWORD ACTION
    updatePassword() {
      this.toggleLoading();
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        const user = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          passwordConfirm: this.confirmPassword
        };

        this.updateProfilePassword(user).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success('Password Updated successfully!');
          } else {
            this.$noty.error(this.getErrors);
          }
        });
      }
    }
  },

  created() {
    this.name = this.setUser.name;
    this.email = this.setUser.email;
  }
};
</script>

<style scoped>
.profile__sidebar {
  background: #f4f4f4;
  min-height: 100vh;
}
.main_profile {
  margin: 3rem 12vw;
}

.flex {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.col-lg-9,
.col-lg-3,
.col-md-9,
.col-md-3,
.col-sm-12 {
  padding: 0 10px !important;
}

@media only screen and (max-width: 768px) {
  .profile__sidebar {
    background: red;
    height: 100vh;
  }

  .main_profile {
    margin: 17rem 10vw 2rem 10vw;
  }
}
</style>
