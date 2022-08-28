<template>
  <div class="login">
    <login />
    <img
      src="@/assets/img1.jpg"
      alt=""
      width="600"
      height="350"
      class="rounded mx-auto d-block"
    />
  </div>
</template>
<script>
import login from "@/components/login";
export default {
  components: {
    login,
  },
};
</script>
