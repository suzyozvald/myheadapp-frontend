<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Home</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" @click="logUserOut">
                Logout, {{ user.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main-table :userId="user._id" />
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import MainTable from "../components/main-table.vue";
export default {
  components: {
    MainTable,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
  },

  created() {
    this.getUserDetails();
  },
};
</script>

<style scoped></style>
