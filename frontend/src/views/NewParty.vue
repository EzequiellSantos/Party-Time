<template>

    <div class="newparty">
        <h1>Adicione a sua festa:</h1>
        <PartyForm :party="{}" page="newparty" :btnText="text" />
    </div>

</template>

<script>

    import PartyForm from '../components/PartyForm.vue'

    export default {
        components: {
            PartyForm
        }
    }
</script>

<style scoped>
    .newparty{
        text-align: center;
        padding: 40px 0px 100px 0px;
    }

    .newparty h1{
        margin-bottom: 10px;
    }
</style>