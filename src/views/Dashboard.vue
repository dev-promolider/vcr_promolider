<template>
    <b-container>
        <b-row>
            <b-col cols="8">
                <!-- obtener los datos totales de cursos, ventas, tipo de plan, afiliacion -->
                <DataPrimaryUser />

                <!-- Coleccion de mensajes para el productor -->
                <MessengerColletion />
            </b-col>
            <b-col cols="4"></b-col>
        </b-row>
    </b-container>
</template>
<script>
import DataPrimaryUser from '@/components/dashboard/DataPrimaryUser.vue'
import MessengerColletion from '@/components/dashboard/MessengerColletion.vue'

export default {
    name: 'Dashboard',
    components: {
        DataPrimaryUser,
        MessengerColletion
    }
}
</script>