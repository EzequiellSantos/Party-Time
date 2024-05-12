<template>

    <div id="profile">
        <h1>Edite seu perfil</h1>
        <UserForm page="profile" :user="user" btnText="Editar" :key="componentkey" />
    </div>

</template>

<script>

import UserForm from '../components/UserForm.vue'

export default {
    components: {
        UserForm
    },
    data() {
        return {
            user: {},
            componentkey: 0
        }
    },
    created() {

        //load user
        this.getUser()

    },
    methods: {
        async getUser() {
            
            // get id from token
            const id = this.$store.getters.userId
            const token = this.$store.getters.token

            await fetch(`http://192.168.0.107:3000/api/user/${id}`, {
                method: "GET",
                headers: {
                    "Content-type":"application/json",
                    "auth-token": token
                }
            })
            .then((resp) => resp.json())
            .then((data) => {

                this.user = data.user
                this.componentkey += 1

            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
    #profile{
        text-align: center;
        padding: 40px 0px 100px 0px;
    }

    #profile h1{
        margin-bottom: 10px;
    }
</style>