<template>
    <input type="submit" :value="text">
    <!-- :value é uma propriedade do vue que pode dinamizar diversos valores n0o value  -->
</template>

<script>
    export default {
        name: "InputSubmit",
        props: {
            text: "" // serve como uma variável de valores, para dinamizar os valores do value do input [===>
        }
    }
</script>

<style scoped>
    
</style>