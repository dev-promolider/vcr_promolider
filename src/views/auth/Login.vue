<template>
    <div>
        <h2>Sign In | Virtual Class Room</h2>
        <FormLogin />
    </div>
</template>
<script>
import FormLogin from '@/components/auth/FormLogin.vue'
export default {
    name: 'Login',
    components: {
        FormLogin
    }
}
</script>