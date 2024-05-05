<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <!-- msg= mensagem retornada | msgClass= estatus retornado -->
        <form id="user-form" @submit="page === 'register' ? register($event) : update($event)">
            <!-- @submit serve como operador ternario que ao ser enviado, ele verifica se é atualização do user ou um novo registro -->

            <div class="input-container">
                <label for="name">Nome</label>
                <input type="text" id="name" name="name" v-model="name"  placeholder="Digite Seu Nome">
                <!-- o v-model name, serve para referenciar o valor do input apos o usuário digitar [==> -->
            </div>

            <div class="input-container">
                <label for="email">E-mail</label>
                <input type="text" id="email" name="email" v-model="email"  placeholder="Digite o seu E-mail">
                <!-- o v-model email, serve para referenciar o valor do input apos o usuário digitar [==> -->
            </div>

            <div class="input-container">
                <label for="password">Senha</label>
                <input type="password" id="password" name="password" v-model="password"  placeholder="Digite a sua senha">
            </div>

            <div class="input-container">
                <label for="confirmpassword">Senha</label>
                <input type="password" id="copnfirmpassword" name="copnfirmpassword" v-model="confirmpassword"  placeholder="Confirme a sua senha">
            </div>

            <InputSubmit :text="btnText"/>

        </form>
    </div>
</template>

<script>

    import InputSubmit from './form/InputSubmit.vue'
    import Message from '../components/Message.vue'

    export default{
        name: "RegisterForm",
        data() {
            return {
                name: null,
                /* ==>]  pois aqui inicialmente o valor do inmput é null*/
                email: null,
                password: null,
                confirmpassword: null,
                msg: null,
                msgClass: null,
                isVisible: false
            }
        },
        props: ["user", "page", "btnText"],
        components: {
            InputSubmit,
            Message
        },
        methods: {

            // quando a action for um registro
            async register(e) { 

                // não fazer mais submissao por html e sim por JS
                e.preventDefault()

                const data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    confirmpassword: this.confirmpassword
                }

                // transformando os dados em JSON
                const jsonData = JSON.stringify(data)

                await fetch("http://127.0.0.1:3000/api/auth/register", {

                    method: "POST",
                    headers: {"Content-type":"application/json"},
                    body: jsonData
                    
                })
                .then((respo) => respo.json())
                .then((data) => {

                    let auth = false

                    // verificando se há algum error
                    if(data.error){

                        this.msg = data.error // exibindo mensagem de error  na notificação
                        this.msgClass = "error" // definindo as classes de estatus como error

                        window.scrollTo({
                        top: 100,
                        behavior: 'smooth'
                        })

                    } else {

                        auth = true
                        
                        this.msg = data.msg
                        this.msgClass = 'sucess'

                        window.scrollTo({
                        top: 100,
                        behavior: 'smooth'
                        })

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

                    }, 2000)

                })
                .catch((err) => {

                    console.log(err);

                })

            }

        }

    }
</script>

<style scoped>
    #user-form{
        max-width: 600px;
        width: 60%;
        margin: auto;
        
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .input-container{
        height: 90px;
        width: calc(80% - 10px);
        min-width: 280px;
        max-width: 500px;
        margin: 10px 0;
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

    .input-container input{
        font-size: 0.9rem;
        margin: 10px 0 0 0;
        display: block;
        border: none;
        background-color: transparent;
        border-bottom: 0.001rem solid #6969699d;
        padding: 5px;
    }

    .input-container input:focus{
        outline: 0;
        border-bottom: 1px solid #4e4e4e;
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