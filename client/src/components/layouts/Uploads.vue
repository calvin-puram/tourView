<template>
  <div class="d-flex justify-content-center align-items-center text-center">
    <v-avatar>
      <img :src="`/img/users/${setUser.photo}`" alt="user" />
    </v-avatar>
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="#009432" class=" white--text mb-3 ml-5 mt-2 " v-on="on">
          <v-icon class="white--text">mdi-grease-pencil</v-icon>
          <span>Upload Image</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Upload An Image</v-card-title>
        <v-card-text>
          <form @submit.prevent="uploadFile" encType="multipart/form-data">
            <div class="form-group">
              <input
                type="file"
                class="form-control-file"
                @change="OnfileChange"
                required
              />
            </div>

            <div @click="dialog = false">
              <button class="btn btn-primary btn-block">
                Upload Image
              </button>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '../../router/index';
export default {
  name: 'Uploads',
  computed: mapGetters(['getProfileErrors']),
  data() {
    return {
      dialog: false,
      file: ''
    };
  },
  methods: {
    ...mapActions(['updateUsers']),
    OnfileChange(e) {
      this.file = e.target.files[0];
    },
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      this.updateUsers(formData).then(res => {
        if (res && res.data.success) {
          this.setAuth(res.data);
          this.$noty.success('profile image uploaded successfully!');
        } else {
          this.$noty.error(this.getProfileErrors);
        }
      });
    }
  }
};
</script>
