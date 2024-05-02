<template>
    <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
    <!-- o v-if serve como uma condição que so vai exibir a mensagem se ela for verdadeira -->
</template>

<script>
    export default {
        name: "Message",
        props: ["msg", "msgClass"]
    }
</script>

<style scoped>

    /* classe de exibição do elemento */
    .msg{
        max-width: 400px;
        margin: 20px auto;
        padding: 15px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 10px;
    }

    /* classes de estatus */
    .sucess{
        background-color: #e2ffd2;
        color: #177014;
        border: 1px solid #b9ee9b;
    }

    .error{
        background-color: #ffd2d2;
        color: #702214;
        border: 1px solid #eea79b;
    }

</style>