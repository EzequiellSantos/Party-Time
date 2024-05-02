<template>
    <footer>
        <h3>Party Time &copy;</h3>
        <p>O melhor lugar para seus eventos!</p>
    </footer>
</template>

<script>
    export default({
        name: "Footer"
    })
</script>


<style scoped>
    footer{

        background-color: #191815;
        width: 100%;
        height: 210px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    footer h3{
        color: #FFF;
        font-weight: 300;
        font-size: 1.6rem;
        margin-bottom: 15px;
    }

    footer p{
        color: #C1B8C6;
    }
</style>
