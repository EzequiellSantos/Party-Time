<template>

    <div id="form">
        <Message :msg="msg" msgClass="msgClass" />
        <form id="loginForm" @submit="login($event)">

            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Digite o seu email">
            </div>

            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" name="password" id="password" v-model="password" placeholder="Digite a sua senha">
            </div>

            <InputSubmit text="Entrar" />

        </form>
    </div>

</template>

<script>

import Message from './Message.vue'
import InputSubmit from './form/InputSubmit.vue'

export default {
    name: "LoginForm",
    components: {
        Message,
        InputSubmit
    },
    methods: {
        login(e){
            e.preventDefault
        }
    }
}
</script>

<style scoped>

    #form{
        margin: auto;
        display: flex;
        align-content: center;
        justify-content: center;
    }

    #login-form{
        max-width: 600px;
        margin: 40px 0;
    }

    .input-container{
        height: 90px;
        width: calc(80% - 10px);
        min-width: 280px;
        max-width: 500px;
        margin: 30px 0;
        padding: 15px;
        background-color: #f7f7f7;
        border-radius: 15px;

        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .input-container label{
        font-size: 1.2rem;
        text-align: left;
        display: inline-block;
        color: #575757;
    }

    .input-container > input{
        font-size: 0.9rem;
        margin: 10px 0 0 0;
        display: block;
        border: none;
        background-color: transparent;
        border-bottom: 0.001rem solid #6969699d;
        padding: 5px;
    }

    .input-container > input:focus{
        outline: 0;
        border-bottom: 1px solid #4e4e4e;
    }

</style>