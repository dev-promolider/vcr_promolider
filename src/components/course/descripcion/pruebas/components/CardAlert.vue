<template>
    <v-card :color="color" class="text-center" style="border-radius: 15px" :width="width">
          <v-img style="position: absolute; top: -45px; left:0; right: 0; text-align: center; margin-left: auto; margin-right: auto;"   width="80px" :src="img"></v-img>
          <v-card-text class="text-h5 white--text pt-10 font-weight-bold pb-1" v-if="title" >
            {{title}}
          </v-card-text>
           <v-card-subtitle class="py-0 my-0 white--text text-subtitle-2 font-weight-bold" >
            {{subtitle}}
          </v-card-subtitle>
          <v-card-subtitle  class="py-0 my-0 white--text text-subtitle-1 font-weight-bold" >
            {{rank}}
          </v-card-subtitle>
           <v-card-subtitle  class="py-0 my-0 white--text text-subtitle-1 font-weight-bold" >
            {{rate}}
          </v-card-subtitle>
          <v-card-actions>
              <v-btn color="black" @click="comeBack" class="white--text mt-1 rounded-xl"  block >Regresar</v-btn>
          </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'card-alert',
    props:{
        title: {
            type: String,
            default: 'Lorem Ipsom',
        },
        subtitle: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '350px',
        },
        img: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'red'
        },
        rank: {
            type: String,
            default: ''
        },
        rate: {
            type: String,
            default: ''
        }
    },
    methods:{
        comeBack(){
            this.$router.push({name: 'suscription-user'})
        }
    }
}
</script>