<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="username"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.username"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <p>
            Dont have an account??
            <router-link to="/signup">click here</router-link>
          </p>

          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Login
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/auth", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.makeToast("success", "Login Successful!");
          this.$router.push("/home");
        }
      } catch (err) {
        this.makeToast("danger", "Something went wrong!");

        console.log(err.response);
      }
    },
    makeToast(variant = "default", bodyContent) {
      this.$bvToast.toast(bodyContent, {
        title: "Success",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
