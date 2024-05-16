<template>

    <div class="data-container">

        <Message :msg="msg" :msgClass="msgClass" />

        <div class="data-table-heading">

            <div class="data-id-heading">
                N°:
            </div>

            <div class="data-title-heading">
                Nome da Festa:
            </div>

            <div class="data-actions-heading">
                Ações:
            </div>

        </div>

        <div class="data-table-body">
            <div class="data-row" v-for="(party, index) in parties" :key="index">

                <div class="data-id-container">
                    <p>{{index + 1}}</p>
                </div>

                <div class="data-title-container">
                    <router-link :to="`/party/${party._id}`" >{{ party.title }}</router-link>
                </div>

                <div class="data-actions-container">

                    <router-link :to="`/editparty/${party._id}`" class="edit-btn">
                        <img width="28" height="28" src="https://img.icons8.com/fluency-systems-filled/48/create-new.png" alt="create-new"/>
                    </router-link>

                    <button class="remove-btn" @click="remove(party._id)">
                        <img width="28" height="27" src="https://img.icons8.com/fluency-systems-regular/48/trash--v1.png" alt="trash--v1"/>
                    </button>

                </div>

            </div>
        </div>

    </div>

</template>

<script>

    import Message from "../components/Message.vue"

    export default {
        name: "DataTable",
        props: ['parties'],
        components: {
            Message
        },
        data() {
            return {
                msgClass: null,
                msg: null
            }
        },
        methods: {
            async remove(id){

                // get id and token from store
                const userId = this.$store.getters.userId
                const token = this.$store.getters.token

                const data = {
                    id: id,
                    userId: userId 
                }

                const jsonData = JSON.stringify(data)

                await fetch('https://party-time-eight.vercel.app/api/party', {
                    method: 'DELETE',
                    headers: {
                        "Content-type":"application/json",
                        "auth-token": token,
                    },
                    body: jsonData
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

                        this.msg = null   
                        this.$parent.getParties()     

                    }, 1000)

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                })
                .catch((error) => {

                    console.log(error);

                })
            }
        }
    }

</script>

<style scoped>

    .data-container{
        max-width: 800px;
        width: calc(100% - 30px);

        margin: auto;
        display: flex;
        flex-direction: column;

        padding: 0px 0 30px 0;
        margin: 30px 5px 30px 5px;
    }

    .data-table-heading, .data-row{
        width: 100%;
        min-width: 280px;
        height: 60px;
        margin: auto;
        display: flex;
        flex-direction: row;
        align-content: center;
        border-bottom: 1px solid #ececec;
    }

    .data-table-heading{
        cursor: default;
    }

    .data-table-heading  > div, .data-row > div{
        flex: 1 1 0;
        margin: auto;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .data-id-container, .data-id-heading{
        max-width: 50px;
    }

    .data-id-container{
        cursor: default;
    }

    .data-title-container{
        text-align: center;
    }

    .data-actions-container{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .edit-btn{
        display: flex;
        align-items: center;
        margin-right: 10px;
        margin-left: -4px;
        padding: 0 4px;
        border-radius: 5px;
        transition: 0.4s ease-in-out;
        background-color: transparent;
    }

    .edit-btn:is(:hover, :focus){
        background-color: #70ffec;
    }

    .edit-btn:active{
        background-color: #57ddff;
    } 

    .remove-btn{
        margin: 0;
        border: none;
        cursor: pointer;

        padding: 0 5px;
        border-radius: 5px;
        transition: 0.4s ease-in-out;
        background-color: transparent;
    }  

    .remove-btn:is(:hover, :focus){
        background-color: #fd8686;
    }

    .remove-btn:active{
        background-color: #ff5757;
    }
 
    .edit-btn img, .remove-btn img{
        margin: 5px 0;
    }

    @media (width < 800px) {
        .data-table-heading  > div, .data-row > div{
            justify-content: center;
        }

        .data-actions-container, .data-actions-heading{
            width: 10%;
        }
    }

</style>