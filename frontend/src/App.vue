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

  input[type=submit]{
    width: 100px;
    padding: 10px;
    margin: 10px 0;
    font-size: 1rem;
    border-radius: 7px;
    border: none;
    background-color: #4d4d4d;
    color: #fff;
    outline: 0;
    cursor: pointer;
    transition: .2s ease-in;
  }

  input[type=submit]:is(:hover, :active){
    background-color: #757575;
  }

</style>
