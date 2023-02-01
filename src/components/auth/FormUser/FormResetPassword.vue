<template>
    <div class="pt-5 pb-16">
        <div class="d-flex justify-content-center align-items-center mt-5 mb-5">
            <img src="@/assets/promolider_logo_2.png" class="mx-1" style="width: 30%" />
        </div>
    
        <h4 class="text-white d-flex justify-content-center align-items-center">Formulario de recuperación de cuenta</h4>
    
        <div class="p-4">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field dark v-model="form.email" label="Correo" required></v-text-field>
    
                <v-text-field dark v-model="form.code" label="Codigo" required></v-text-field>
    
                <v-text-field dark v-model="form.password" label="Nueva contraseña" required></v-text-field>
    
                <v-text-field dark v-model="form.password2" label="Confirmar contraseña" required></v-text-field>
    
                <div class="d-flex justify-content-center align-items-center mt-5 mb-5">
                    <v-btn color="#20e404" class="mr-4 d-flex justify-content-center align-items-center" @click="login">
                        Reestablecer contraseña
                    </v-btn>
                </div>
                <br><br>
            </v-form>
        </div>
    
        <div class="text-center">
            <h5 style="font-size: 0.7em; color: #989898">
                Copyright &copy; {{ year }}. Todos los derechos reservados para IPSSOMA
            </h5>
        </div>
    
    </div>
    </template>
    
    <script>
    import {
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        name: "FormLogin",
        data() {
            return {
                message: "",
                statusRegister: false,
                statusErrorRegister: false,
                form: {},
                documentType: {},
                country: {},
                error: false,
                userRules: [(v) => !!v || "El usuario es requerido"],
                passwordRules: [(v) => !!v || "La contraseña es requerida"],
                valid: true,
                year: "",
                date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10),
                menu: false,
            };
        },
        methods: {
            showAlert() {
                this.error = true;
            },
            validateFields() {
                if (!this.form.email || this.form.email.trim() === '' || this.form.email.length === 0) {
                    alert('Email esta vacío!');
                    return false;
                }
    
                if (this.form.email.length > 60) {
                    alert('Email demasiado largo!');
                    return false;
                }
    
    
                if (!this.form.code || this.form.code.trim() === '' || this.form.code.length === 0) {
                    alert('Código esta vacío!');
                    return false;
                }
    
                if (!this.form.password || this.form.password.trim() === '' || this.form.password.length === 0) {
                    alert('Nuevo password esta vacío!');
                    return false;
                }
    
                if (!this.form.password2 || this.form.password2.trim() === '' || this.form.password2.length === 0) {
                    alert('Confirmación de password esta vacío!');
                    return false;
                }
    
                if (this.form.password != this.form.password2) {
                    alert('Las contraseñas no coinciden!');
                    return false;
                }
                return true;
            },
            async login() {
                console.log(this.form)
                if(this.validateFields()){
                try {
                    const {
                        status
                    } = await this.axios.post(
                        "/public/recoveryPassword",
                        this.form
                    );
                    console.log(status)
                    if (status === 200) {
    
                        alert('La contraseña ha sido reestablecida correctamente');
                        this.$router.push("/login");
                    }
                } catch (error) {
                    console.log(error);
                    this.showAlert();
                    alert('ocurrió un problema, puede que los datos ingresados no sean los correctos');
                }
                }
            },
            ...mapActions("user", {
                actionUser: "actionUser",
            }),
    
            setYear() {
                this.year = new Date().getFullYear();
            },
        },
        computed: {
            ...mapGetters("user", ["getStatusRequest"]),
        },
        created() {
            this.setYear();
        },
    };
    </script>
    
    <style>
    a>img {
        max-width: 45px;
    }
    
    :root {
        --color-prin: #20e404;
    }
    
    .submit-iniciar {
        background: var(--seventh-color-green) !important;
        border: none !important;
        color: white !important;
    }
    
    .submit-iniciar:hover {
        background: var(--eighth-color-green) !important;
    }
    
    .subtitle {
        font-size: 1em;
    }
    
    .holder-form {
        border: 1px solid #35424a;
        border-radius: 30px;
        font-size: 12px;
        padding: 8px 10px;
        padding-left: 21px;
    }
    
    .form-values {
        margin-bottom: 30px;
    }
    
    .remember {
        font-size: 12px;
    }
    
    .remember input {
        align-self: center;
    }
    
    .change {
        color: var(--color-prin);
        font-size: 12px;
    }
    
    .loguear {
        border: 1px;
        background-color: var(--color-prin);
        border-radius: 30px;
        width: 100%;
        height: 50px;
    }
    
    .form-check {
        margin-bottom: 25px;
        flex-flow: row wrap;
    }
    
    .form-check>a {
        font-weight: bold;
    }
    </style>
    