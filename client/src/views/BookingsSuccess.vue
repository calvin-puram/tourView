<template>
  <div>
    <h1 class="text-center mt-5">Payment Success</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['tour', 'user', 'price'],
  methods: {
    ...mapActions(['bookingsCheckout'])
  },
  created() {
    const details = {
      tour: this.tour,
      user: this.user,
      price: this.price
    };

    this.bookingsCheckout(details).then(res => {
      if (res && res.data.success) {
        this.$router.push('/');
        this.$noty.info('Tour Booked successfully!');
      }
    });
  }
};
</script>
