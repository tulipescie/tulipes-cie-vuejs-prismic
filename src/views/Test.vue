<template>
  <div> 
    slt
    <br>

    <br>
    <div id='vrview'></div>

    <video src="../assets/img/360video.mp4" autoplay=true muted></video>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
    };
  },
  methods: {
  },
  mounted () {
    // var vrView = new VRView.Player('#vrview', {
    // image: '../assets/img/360.jpg',
    // is_stereo: true
  // });
  }
}
</script>
