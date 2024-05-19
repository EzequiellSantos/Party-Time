<template>

    <div id="form">
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="loginForm" @submit="login($event)">

            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Digite o seu email">
            </div>

            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" name="password" id="password" v-model="password" placeholder="Digite a sua senha" minlength="4" min="4" value="0" required>
            </div>

            <InputSubmit text="Entrar" />

            <p id="linkToRegister">Não tem uma conta? <router-link to="/register">Criar uma conta</router-link></p>

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
    data() {
        return {
            email: null,
            password: null,
            msg: null,
            msgClass: null
        }
    },
    methods: {
        async login(e){

<<<<<<< HEAD
            const baseUrl = process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3000'
            : 'https://party-time-eight.vercel.app';

            const verceLink = 'https://party-time-eight.vercel.app'

            const loginUrl = `${verceLink}/api/auth/login`;

=======
>>>>>>> parent of c4a5c5d (add execution in two ambients)
            e.preventDefault()

            const data = {
                email: this.email,
                password: this.password
            }

            const jsonData = JSON.stringify(data)

            await fetch("https://party-time-eight.vercel.app/api/auth/login", {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: jsonData
            })
            .then((res) => res.json())
            .then((data) => {

                let auth = false

                if(data.error){

                    this.msg = data.error
                    this.msgClass = 'error'

                } else {

                    auth = true
                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    // emit event for auth an user
                    this.$store.commit("authenticated", { token: data.token, userId: data.userId })

                }
                    
                setTimeout(() => {
                    if(!auth){

                        this.msg = null

                    } else {

                        //redirect
                        this.$router.push("Dashboard")

                    }

                }, 1500)

            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

    #form{
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
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

    #linkToRegister{
        margin: 30px 0 50px;
    }

</style>