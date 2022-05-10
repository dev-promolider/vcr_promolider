<template>
  <div>
      <VueWinwheel :segments="options" />
  </div>
</template>

<script>
import VueWinwheel from 'vue-winwheel/vue-winwheel'

export default {
  name: "Roulette",
  components:{
    VueWinwheel
  },
  data(){
    return{
      options:[
					{
						textFillStyle: '#fff',
						fillStyle: '#12364f',
						text:'Premio 1'
					},
					{
						textFillStyle: '#000',
						fillStyle: '#71c700',
						text:'Premio 2'
					},
					{
						textFillStyle: '#fff',
						fillStyle: '#12364f',
						text:'Premio 3'
					},
					{
						textFillStyle: '#000',
						fillStyle: '#71c700',
						text:'Premio 4'
					},
					{
						textFillStyle: '#fff',
						fillStyle: '#12364f',
						text:'Premio 5'
					},
					{
						textFillStyle: '#000',
						fillStyle: '#71c700',
						text:'Premio 6'
					}
				]
    }
  }
}
</script>

<style>
	.vue-winwheel{
		color: black;
	}
	
	.mobile-container h1{
		display: none;
	}

	.btn-play{
		background: var(--first-color-green) !important;
	}

	.canvas-wrapper::after{
		background: green !important;
	}

	.wheel-wrapper::before{
		z-index: 10 !important;
		background-image: none !important;
		font-family: "Font Awesome 5 Free";
		content: "\f0dd" !important;
		font-size: 100px;
		font-weight: 900 !important;
		top: -90px !important;
		color: #2f771d;
	}
	
</style>
