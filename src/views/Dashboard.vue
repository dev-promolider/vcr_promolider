<template>
    <b-container>
        <b-row>
            <b-col cols="8">
                <!-- obtener los datos totales de cursos, ventas, tipo de plan, afiliacion -->
                <DataPrimaryUser />

                <!-- //importe atributos para verificar datos del api -->
                    <Attribute />

                    <!--pruba del cliente--->
                    <ClienteVenta />
                <!-- Coleccion de mensajes para el productor -->
                <MessengerColletion />
            </b-col>
            <b-col cols="4"></b-col>
        </b-row>
    </b-container>
</template>
<script>
import Attribute from '@/components/dashboard/Attribute.vue'
import DataPrimaryUser from '@/components/dashboard/DataPrimaryUser.vue'
import MessengerColletion from '@/components/dashboard/MessengerColletion.vue'
import ClienteVenta from '@/components/dashboard/ClienteVenta.vue'
export default {
    name: 'Dashboard',
    components: {
        DataPrimaryUser,
        MessengerColletion,
        Attribute,
        ClienteVenta
        
    }
}
</script>