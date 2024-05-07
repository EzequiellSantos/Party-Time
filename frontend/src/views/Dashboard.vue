<template>
    
    <div class="dashboard">

        <div class="title-container">
            <h1>Gerencie seus eventos</h1>
            <nav-link to="/newparty" class="btn">Cadastrar Festa</nav-link>
        </div>
    
        <div v-if="parties.length > 0">

            <h1>Tabela de festa</h1>

        </div>

        <div v-else>

            <p>Você ainda não tem festas cadastradas, <router-link to="/newparty">Clique aqui para cria suas festa!</router-link></p>

        </div>

    </div>

</template>

<script>
export default {
    components: {

    },
    data(){
        return {
            parties: []
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
</style>