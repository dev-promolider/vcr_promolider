<template>
    <div>
            <div v-for="item in items" :key="item.id">
                <p>
                        {{item.price}}
                </p>
            </div>
    </div>
</template>

<script>
export default {
    name: 'VirtualClassroomBuyCursos',

    data() {
        return {
            items:[],
            pao_id: null,
        };
    },

   

    methods: {
        getAttributes() {

 this.pao_id = this.$route.params.ide;
        console.log(this.pao_id)
      this.axios.get("course/list?id="+ this.pao_id).then((datos) => {
        const array = datos.data.data;
          this.items = array[0].courses_related;
          
      

          console.log(this.items[1])

    

      });
    },
    },
    created() {
    this.getAttributes();
  },
   
};
</script>

<style lang="scss" scoped>

</style>