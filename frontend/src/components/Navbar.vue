<template>
    <div id="nav">

        <router-link to="/" id="logo-container">
            <img src="/img/partytimelogo.png" alt="logo party time">
        </router-link>
        <h2 id="nav-title">Party Time</h2>

        <div id="nav-links" ref="links">
            <router-link to="/" class="links-menu">Home</router-link>
            <router-link to="/login" class="links-menu" v-show="!authenticated">Entrar</router-link>
            <router-link to="/register" class="links-menu" v-show="!authenticated">Cadastrar</router-link>
            <router-link to="/dashboard" class="links-menu" v-show="authenticated">Dashboard</router-link>
            <router-link to="/profile" class="links-menu" v-show="authenticated">Configuração</router-link>
        </div>

        <button id="exitContainer" @click="logout($event)" v-show="authenticated">
            <img id="exitImage" width="48" height="36" src="https://img.icons8.com/sf-regular/48/exit.png" alt="exit" />
        </button>

        <div id="menu" @click="clicou">
            <img id="iconMenuHambuger" ref="iconMenuHambuger" width="48" height="38" src="https://img.icons8.com/sf-regular/48/menu.png" alt="menu"/>
            <img ref="iconMenuArrow" id="iconMenuArrow" width="48" height="38" src="https://img.icons8.com/sf-regular/48/collapse-arrow.png" alt="collapse-arrow"/>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default ({
        name: "Navbar",
        methods: {
            clicou(){
                const links = this.$refs.links
                const iconMenuArrow = this.$refs.iconMenuArrow
                const iconMenuHambuger = this.$refs.iconMenuHambuger

                if(links.style.display == 'block' && window.innerWidth < 750){
                    links.style.display = 'none'
                    iconMenuHambuger.style.display = 'block'
                    iconMenuArrow.style.display = 'none'
                } else if(window.innerWidth < 750){
                    links.style.display = 'block'
                    iconMenuHambuger.style.display = 'none'
                    iconMenuArrow.style.display = 'block'
                }
                    
            },
            logout(e){

                e.preventDefault()
            
                // emit event for auth an user
                this.$store.commit('logout') //enviando os dados para o state() ./store

                // redirect
                this.$router.push('/')

            }

        },
        computed: { // quando acomtecer alguma alteração na págoina ele será chamado
            ...mapState([
                'authenticated'
            ])
        }       
    })

</script>


<style scoped>

    #nav{ 
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px 30px 20px;
        border-bottom: 1px solid #EEE;
    }

    #nav a{
        text-decoration: none;
        margin-right: 15px;
    }

    #menu{
        display: none;
        align-content: center;
        justify-content: center;
    }

    #iconMenuHambuger, #iconMenuArrow{
        display: none;
    }

    #nav img{
        width: 35px;
    }

    #nav-title {
        font-size: 3rem;
        font-weight: 300;  
        text-align: center; 
    }

    #logo-container, #nav-links, #nav-title {
        width: 400px;
    } 

    #exitContainer{
        width: 35px;
        height: 55px;
        margin: 0;
        background-color: transparent;
    }

    #nav-links {
        display: flex;
        justify-content: flex-end;
    }

    button{
        background-color: #fff;
        border: none;
        font-size: 16px;
        cursor: pointer;
    }

    button:is(:hover, :focus){
        color: #c1b696;
    }

    @media (750px > width) {
        
        #nav-title{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            margin: auto;
            text-align: center;
            font-size: clamp(1.75rem, 1.3712rem + 0.6061vw, 1.8rem);
        }

        #nav-links{
            display: none;
            position: absolute;
            top: 75px;
            left: 51%;
            transform: translateX(-50%);
            width: auto;
        }
        
        #menu{
            display: flex;
            justify-content: flex-start;
            cursor: default;
            width: 48px;
            height: 55px;
            padding-left: 10px;
        }

        #iconMenuArrow{
            display: none;
        }

        #iconMenuHambuger{
            display: block;
        }

        #logo-container{
            width: 30px;
        }

        #exitContainer{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            
            right: calc(15vw + 20px) ;
            width: 5vw;
        }

        #exitImage{
            margin: 0;
        }

    }

</style>