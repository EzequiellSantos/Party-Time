<template>
  <div>
    <Navbar />
    <router-view class="container"></router-view>
    <Footer />
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'

  export default {
    name: "App",
    components: {
      Navbar,
      Footer
    }
  }
</script>


<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Helvetica;
    color: #444;
  }  

  .container{
    min-height: 300px;
  }

  a{
    transition: .4s ease-in;
  }

  a:is(:hover, :focus){
    color: #c1b695;
  }

</style>
