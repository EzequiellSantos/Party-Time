<template>
    <div>

        <Message :msg="msg" :msgClass="msgClass"/>

        <h1>formulario festa </h1>

        <form id="registerForm" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : updateParty($event)">

            <input type="hidden" name="id" id="id" v-model="id">
            
            <div class="input-container">
                <label for="title">Título da festa:</label>
                <input type="text" name="title" id="title" v-model="title" placeholder="Digite o titulo da sua festa">
            </div>

            <div class="input-container">
                <label for="description">Descrição da festa:</label>
                <input type="text" name="description" id="description" v-model="description" placeholder="Digite a descrição da sua festa">
            </div>

            <div class="input-container">
                <label for="party_date">Data da festa:</label>
                <input type="date" name="party_date" id="party_date" v-model="party_date">
            </div>

            <div class="input-container">
                <label for="photos">Título da festa:</label>
                <input type="file" multiple="multiple" name="photos" id="photos" ref="file" @change="onChange">
            </div>
            
        </form>

        <InputSubmit text="Criar Festa&#x21"/>
    </div>    
</template>

<script>
import Message from '../components/Message.vue'
import InputSubmit from '../components/form/InputSubmit.vue'

export default {
    components: { 
        Message, InputSubmit
    },
    name: "PartyForm",
    props: ["party", "page", "btnText"],
    methods: {
        async createParty(e){
            e.preventDefault()
            console.log('&#128048;')
        },
        onChange(){

            this.photos = e.target.files
            this.showMiniImages = false

        },
        async updateParty(e){
            e.preventDefault()
        }
    }
}
</script>

<style scoped>

</style>