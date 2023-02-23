<template>
<div></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        async start() {
            var obj = JSON.parse(this.$route.params.value);
            const form = {
                "username": obj[0],
                "password": obj[1]
            }

            var id = obj[5];
            try {
                const {
                    status,
                    data: response
                } = await this.axios.post(
                    "/auth/redirect",
                    form
                );
                if (status === 200) {
                    const {
                        data
                    } = await response;
                    const {
                        access_token,
                        user
                    } = await data;
                    localStorage.setItem("rol_user", user.roles[0].id)
                    localStorage.setItem("id_user", user.id);
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("name_user", user.name);
                    localStorage.setItem("email_user", user.email);
                    localStorage.setItem("mode", "private");
                    localStorage.setItem("showPrivateNavbar", true);
                    localStorage.setItem("showPublicNavbar", false);
                    localStorage.setItem("showPublicFooter", false);
                    localStorage.setItem("id_account_type",user.id_account_type );

                    if (obj[2] == 'course_intro') {
                        this.$router.push(`/producto/${obj[3]}/${obj[4]}`);
                    } else if (obj[2] == 'purchased_courses') {
                        this.$router.push(`/mis-cursos/`);
                    } else if (obj[2] == 'preview') {
                        //alert(user.email);
                        this.$router.push(`/buy-cursos/${id}`);
                        setTimeout(this.myFunction, 2000);
                        //window.location.reload();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        myFunction(){
            window.location.reload(true);
        },
    },
    mounted() {
        this.start();
    },
}
</script>
