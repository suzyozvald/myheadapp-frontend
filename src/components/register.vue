<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="registerUser"
        >
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Name"
            v-model="register.name"
            required
          />
          <input
            type="email"
            id="username"
            class="form-control mb-5"
            placeholder="Email"
            v-model="register.username"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="register.password"
            required
          />
          <p>
            Already have an account??
            <router-link to="/">click here</router-link>

            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Register
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/user", this.register);
        //console.log(response);
        //let token = response.data.token;

        if (response.status == 201) {
          //localStorage.setItem("jwt", token);
          this.$router.push("/");
          this.makeToast("success", "Registration was successful!");
        } else {
          this.makeToast("danger", "Something went wrong!");
        }
      } catch (err) {
        console.log(err);
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
