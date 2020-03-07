<template>
  <div>
    <div class="row">
      <div class="col-lg-3  col-xs-12">
        <div class="profile__sidebar ">
          <div>
            <v-list color="#009432" dark>
              <v-list-item-group
                v-model="item"
                color="#fff"
                class="white--text"
              >
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <!-- ADMIN -->

          <div>
            <v-list color="#009432" dark>
              <v-subheader>ADMIN</v-subheader>
              <v-divider></v-divider>
              <v-list-item-group
                v-model="item"
                color="#fff"
                class="white--text"
              >
                <v-list-item v-for="(item, i) in admin" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
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
          <h2 class="text-center headline">YOUR ACCOUNT SETTINGS</h2>

          <v-form ref="formm" v-model="valid">
            <v-text-field
              v-model="name"
              :counter="10"
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

            <div class="d-flex align-items-center mt-4">
              <v-avatar>
                <img
                  :src="`http://localhost:8000/img/users/${getProfile.photo}`"
                  alt="user"
                />
              </v-avatar>
              <p class="ml-5">Choose new Photo</p>
            </div>

            <v-btn color="success" class="mr-4 float-right">
              SAVE SETTINGS
            </v-btn>
          </v-form>
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

            <v-btn :disabled="!valid" color="success" class="mr-4 float-right">
              SAVE PASSWORD
            </v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: mapGetters(['getProfile', 'getProfileErrors']),
  data: () => ({
    item: 1,
    items: [
      { text: 'SETTINGS', icon: 'mdi-settings-outline' },
      { text: 'MY BILLING', icon: 'mdi-account-card-details' },
      { text: 'MY REVIEWS', icon: 'mdi-star-four-points' },
      { text: 'MY BOOKINGS', icon: 'mdi-credit-card' }
    ],
    admin: [
      { text: 'MANAGE TOURS', icon: 'mdi-bookmark-check-outline' },
      { text: 'MANAGE USERS', icon: 'mdi-account-supervisor-outline' },
      { text: 'MANAGE REVIEWS', icon: 'mdi-star-four-points' },
      { text: 'MANAGE BOOKINGS', icon: 'mdi-credit-card' }
    ],
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
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
    ...mapActions(['myProfile'])
  },
  created() {
    this.myProfile();
    this.name = this.getProfile.name;
    this.email = this.getProfile.email;
  }
};
</script>

<style scoped>
.profile__sidebar {
  background: #009432;
  height: 100vh;
}
.main_profile {
  margin: 1rem 15vw;
  /* width: 60vh; */
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
