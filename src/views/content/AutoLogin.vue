<template>
<div></div>
</template>

<script>
import { authSet } from "../../helpers/authStorage";

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
                    const roleId =
                        (user?.roles && user.roles[0]?.id) ||
                        (user?.roles && user.roles[0]) ||
                        (data?.role && data.role[0]?.id) ||
                        (data?.role && data.role[0]) ||
                        user?.id_account_type ||
                        "";
                    authSet("rol_user", roleId);
                    authSet("id_user", user.id);
                    authSet("access_token", access_token);
                    authSet("name_user", user.name);
                    authSet("email_user", user.email);
                    authSet("id_account_type", user.id_account_type);
                    localStorage.setItem("mode", "private");
                    localStorage.setItem("showPrivateNavbar", true);
                    localStorage.setItem("showPublicNavbar", false);
                    localStorage.setItem("showPublicFooter", false);

                    // Limpiar credenciales de la URL inmediatamente para reducir exposición
                    this.$router.replace({ name: "home" }).catch(() => {});

                    if (obj[2] == 'course_intro') {
                        this.$router.push(`/producto/${obj[3]}/${obj[4]}`);
                    } else if (obj[2] == 'purchased_courses') {
                        this.$router.push(`/mis-cursos/`);
                    } else if (obj[2] == 'preview') {
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
