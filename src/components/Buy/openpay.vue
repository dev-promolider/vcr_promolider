<template>
    <div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            'order': "",
            'charge_id': "",
        }
    },
    props: {
        openpayData: Object,
    },  
    methods: {
        async generateOpenpayOrder(){
            console.log("generate order")
            await this.axios.post("/pay/openpay-order").then((r) => {
                this.order = "promolider2023-"+r.data;
            })
            this.sendOpenpayData();
        },
        async sendOpenpayData(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", this.openpayData.key_openpay);
            myHeaders.append("Content-Type", "application/json");
            let fechaFormateada = this.generateDatetime();

            var raw = JSON.stringify({
            "method": "card",
            "amount": this.openpayData.product_price,
            "currency": "USD",
            "description": this.openpayData.product_detail,
            "order_id": this.order,
            "confirm": "false",
            "send_email": "false",
            "redirect_url": "https://vcr.promolider.org/suscription-user",
            "due_date": fechaFormateada,
            "customer": {
                "name": this.openpayData.user_name,
                "last_name": this.openpayData.user_lastname,
                "phone_number": this.openpayData.user_phone,
                "email": this.openpayData.user_email
                }
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            var redirection;
            await fetch(`https://sandbox-api.openpay.pe/v1/${this.openpayData.id_openpay}/charges`, requestOptions).then(r => r.json())
                .then(r => {
                    console.log("charge id")
                    console.log(this.charge_id)
                    this.charge_id = r.id;
                    redirection = r.payment_method.url;
                    this.storePaymentData();
                });
            console.log("redirection openpay")
            console.log(redirection)
            window.location.href = redirection;
        },
        generateDatetime(){
            let fechaActual = new Date();
            let anio = fechaActual.getFullYear();
            let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
            let dia = fechaActual.getDate().toString().padStart(2, '0');
            let hora = fechaActual.getHours().toString().padStart(2, '0');
            let minuto = fechaActual.getMinutes().toString().padStart(2, '0');
            let segundo = fechaActual.getSeconds().toString().padStart(2, '0');
            let fechaFormateada = `${anio}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
            return fechaFormateada;
        },
        async storePaymentData(){
            const formData = new FormData();
            // validar metodo de pago vacio y demas
            formData.append('product_id', this.openpayData.product_id);
            formData.append('user_id', this.openpayData.user_id);
            formData.append('openpay_order_id', this.charge_id);
            formData.append('product_name', this.openpayData.product_name);
            formData.append('product_detail', this.openpayData.product_detail);
            formData.append('product_price', this.openpayData.product_price);

            this.axios.post('/pay/unverified-payment/create', formData);
        }
    },
    mounted() {
        this.generateOpenpayOrder();
    },
}
</script>