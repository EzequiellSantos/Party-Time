<template>
    <div id="partyForm">

        <Message :msg="msg" :msgClass="msgClass"/>

        <form id="registerForm" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : updateParty($event)">

            <input type="hidden" name="id" id="id" v-model="id">
            <input type="hidden" name="user_id" id="user_id" v-model="user_id">
            
            <div class="input-container">
                <label for="title">Título da festa:</label>
                <input type="text" name="title" id="title" v-model="title" placeholder="Digite o titulo da sua festa">
            </div>

            <div class="input-container" id="textareaContainer">
                <label for="description">Descrição da festa:</label>
                <textarea name="description" id="description" v-model="description" placeholder="Digite a descrição da sua festa"></textarea>
            </div>

            <div class="input-container">
                <label for="party_date">Data da festa:</label>
                <input type="date" name="party_date" id="party_date" v-model="party_date">
            </div>

            <div class="input-container">
                <label for="photos">Imagens:</label>
                <input type="file" multiple="multiple" name="photos" id="photos" ref="file" @change="onChange">
            </div>

            <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
                <p>Imagens atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>

            <div class="input-container" id="privacyContainer">
                <label for="privacy">Evento Privado?</label>
                <input type="checkbox" name="privacy" id="privacy" v-model="privacy">
            </div>

            <InputSubmit :text="btnText" />
            
        </form>

    </div>    
</template>

<script>
import Message from '../components/Message.vue'
import InputSubmit from '../components/form/InputSubmit.vue'

export default {
    name: "PartyForm",
    data() {
        return {
            id: this.party._id || null,
            title: this.title || null,
            description: this.party.description || null,
            party_date: this.party.party_date || null,
            photos: this.party.photos || [], 
            privacy: this.party.privacy || false,
            user_id: this.party.userId || null,
            msg: null,
            msgClass: null,
            showMiniImages: true
        }
    },
    components: { 
        Message, InputSubmit
    },
    props: ["party", "page", "btnText"],
    text: "Criar Festa!",
    methods: {
        async createParty(e){

            e.preventDefault()
            const formData = new FormData()

            formData.append('title', this.title)
            formData.append('description', this.description)
            formData.append('party_date', this.party_date)
            formData.append('privacy', this.privacy)
            
            if(this.photos.length > 0) {

                for(const i of Object.keys(this.photos)) {

                    formData.append('photos', this.photos[i])

                }

            }

            // get token from store
            const token = this.$store.getters.token

            await fetch('http://localhost:3000/api/party', {
                method: 'POST',
                headers: {
                    "auth-token": token
                },
                body: formData
            })
            .then((resp) => resp.json())
            .then((data) => {

                if(data.error){

                    this.msg = data.error
                    this.msgClass = 'error'

                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                }

                setTimeout(() => {

                    if(this.msg != null){
                        
                        this.msg = null

                    }

                    // redirect
                    if(!data.error){
                        this.$router.push("Dashboard")
                    }
                           
                }, 1000)

                window.scrollTo({
                    top: 110,
                    behavior: "smooth"
                })



            })
 
        },
        onChange(e){

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

    #partyForm {
        margin: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #registerform{
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
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 15px;
        background-color: #f7f7f7;
        border-radius: 15px;

        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .mini-images {
        min-height: 90px;
        width: calc(80% - 10px);
        min-width: 280px;
        max-width: 500px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 15px;
        background-color: #f7f7f7;
        border-radius: 15px;

        display: flex;
        flex-wrap: wrap;

    }

    .mini-images > img{
        height: 50px;
        margin-right: 15px;
        margin-bottom: 15px;
    }

    .input-container > label, .mini-images > p{
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

    #textareaContainer{
        height: 130px;
    }

    textarea{
        border-radius: 7px;
        background-color: #fffffff6;
        width: calc(70% - 10px);
        height: 120px;
        margin-top: 10px;
        padding: 5px;
        min-width: 250px;
        max-width: 800px;
        max-height: 600px;
    }

    textarea::placeholder{
        text-align: center;
    }

    #privacyContainer{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    #privacyContainer > input{
        margin: 0 0 2px 6px;
        width: 1.2em;
        height: 1.2em
    }

    .mini-images {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0px;
    }

    .mini-images > p{
        width: 100%;
        margin-bottom: 15px;
        text-align: left;
    }

    .mini-images img {
        height: 50px;
        margin: 0 15px 1px 0;
    }

</style>