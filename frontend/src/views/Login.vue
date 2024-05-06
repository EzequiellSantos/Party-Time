<template>

    <div id="login">

        <h1>Entrar no Party Time</h1>

        <LoginForm />

    </div>

</template>

<script>

import LoginForm from '../components/LoginForm.vue'

export default {
    components:{
        LoginForm
    }
}
</script>

<style>
    #login{
        text-align: center;
        padding: 40px 0px 100px 0px;
    }

    #login h1{
        margin-bottom: 10px;
    }

</style>