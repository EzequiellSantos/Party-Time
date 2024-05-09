<template>
    
    <div class="dashboard">

        <div class="title-container">
            <h1>Gerencie seus eventos</h1>
            <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
        </div>
    
        <div v-if="parties.length > 0">

            <DataTable :parties="parties" />

        </div>

        <div v-else>

            <p>Você ainda não tem festas cadastradas. <router-link to="/newparty">Criar Agora!</router-link></p>

        </div>

    </div>

</template>

<script>

import DataTable from "../components/DataTable.vue"

export default {
    data(){
        return {
            parties: []
        }
    },
    components: {
        DataTable
    },
    created() {
        // load user parties
        this.getParties()
    },
    methods: {
        async getParties(){

            // get token
            const token = this.$store.getters.token

            await fetch('http://localhost:3000/api/party/userparties', {
                method: "GET",
                headers: {
                    "Content-type":"application/json",
                    "auth-token": token
                },
            })
            .then((resp) => resp.json())
            .then((data) => {

                this.parties = data.parties

            })
            .catch((error) => {

                console.log(error);

            })

        }
    }
}
</script>

<style scoped>
    h1{
        color: #333333;
        text-align: center;

    }

    .dashboard{
        text-align: center;
        margin: auto;
        margin-bottom: 50px;
        padding-top: 50px;
        padding-bottom: 100px;
    }

    .dashboard div{
        margin: auto;
        margin-bottom: 20px;
    }

    .title-container{
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .btn{
        height: 37px;
        padding: 10px 16px;
        background-color: #4d4d4d;
        color: #fff;
        text-decoration: none;
        border: none;
        border-radius: 7px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: .3s ease-in;
    }
    
    .btn:is(:hover, :active){
        background-color: #757575;
    }

    @media (width < 580px) {
        .title-container{
            flex-direction: column;
            justify-content: center;
        }

        .btn{
            margin-top: 20px;
        }
    }

</style>