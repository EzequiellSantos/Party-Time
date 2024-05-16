<template>
    
    <div class="editparty">

        <h1>Edite a sua Festa:</h1>
        <PartyForm :party="party" page="editparty"  btnText="Editar Festa" :key="componentKey"/>

    </div>

</template>

<script>

    import PartyForm from '../components/PartyForm.vue'

    export default {
        components: {
            PartyForm
        },
        data() {
            
            return {
                party:{},
                componentKey: 0
            }

        },
        created() {
            // load party
            this.getParty()
        },
        methods: {
            async getParty() {

                // get id from URL and token id from store
                const id = this.$route.params.id
                const token = this.$store.getters.token
                
                await fetch(`https://party-time-eight.vercel.app/api/party/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json",
                        "auth-token":token
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {


                    this.party = data.party

                    // cortar a string e exibir apenas a data do ano, mes e  dia
                    this.party.partyDate = this.party.partyDate.substring(0, 10)

                    // substituindo o caminho public, para o caminho atual do servidor para que se torne voisivel para o usuário as fotos
                    this.party.photos.forEach((photo, index) => {

                        this.party.photos[index] = photo.replace('public', 'https://party-time-eight.vercel.app')

                    })

                    this.componentKey += 1

                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>

    .editparty{
        text-align: center;
        margin: auto;
        padding: 40px 0px 100px 0px;
    }

    .editparty h1{
        margin-bottom: 10px;
    }

</style>