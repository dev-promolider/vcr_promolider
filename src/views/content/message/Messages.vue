<template>
  <Message :user="user"/>
</template>

<script>
import Message from "@/components/message";
export default {
  name: "Messages",
  components: {
    Message,
  },

  data() {
    return {
      user: {
        id: localStorage.getItem("id_user"),
        photo_user: localStorage.getItem("photo_user"),
      },
    };
  },
  mounted() {},
  created() {},
  methods: {
    // async listPreferences() {
    //   const resp = await this.axios.get("category/list");
    //   if (resp.status == 200) {
    //     const { data } = resp.data;
    //     const preferences = this.setSelected(data);
    //     this.preferences = preferences;
    //     this.isLoading = true;
    //   }
    // },
  },
};
</script>
<style>
</style>