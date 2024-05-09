<template>
  <div class="home">

    <h1>Veja as últimas festas</h1>

    <div class="parties-container">
      <div class="party-container" v-for="(party, index) in parties" :key="index">

        <div class="party-img" :style="{'background-image': 'url(' + party.photos[0] + ')'}"></div>

        <router-link :to="`/party/${party._id}`" class="party-title">{{ party.title }}</router-link>

        <p class="party-date">{{ party.partyDate }}</p>

        <router-link :to="`/party/${party._id}`" class="party-details-btn">Ver mais</router-link>

      </div>
    </div>

    <p v-if="parties.length == 0">Não há festas ainda....</p>

  </div>
</template>

<script>
  export default{
    data(){
      return {
        parties: []
      }
    },
    created() {
      // load public parties
      this.getParties()

    },
    methods: {

      async getParties(){

        await fetch('http://127.0.0.1:3000/api/party/all', {
          method: "GET",
          headers: {
            "Content-type":"application/json"
          }
        })
        .then((resp) => resp.json())
        .then((data) => {

          data.parties.forEach((party, index) => {

            if(party.partyDate) {

              party.partyDate = new Date(party.partyDate).toLocaleDateString()
              
            }

            if(party.photos.length > 0) {

              party.photos.forEach((photo, index) => {

                party.photos[index] = photo.replace('public', 'http://127.0.0.1:3000').replaceAll("\\", "/")

              })

            }

          })

          this.parties = data.parties

        })

      }

    }
  }
</script>

<style scoped>
  .home{
    margin: auto;
    padding: 40px 0 100px 0;
    text-align: center;
  }

  .home > h1{
    margin: 0 0 40px 0;
  }

  .parties-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 90%;
    margin: 0 auto;
  }

  .party-container{
    width: 30.3%;
    min-width: 280px;
    margin: 1.5%;
    display: flex;
    flex-direction: column;
  }

  .party-img{
    width: 100%;
    height: 200px;
    background-color: #ccc;
    margin-bottom: 12px;
    background-position: center;
    background-size: cover;
  }

  .party-title{
    color: #252b2e;
    text-decoration: none;
    margin-bottom: 15px;
  }

  .party-date{
    color: #777;
    margin-bottom: 12px;
  }

  .party-details-btn{
    width: 100%;
    max-width: 200px;
    margin: auto;
    margin-bottom: 40px;
    background-color: #4d4d4d;
    color: #fff;
    text-decoration: none;
    text-transform: capitalize;
    border: none;
    border-radius: 7px;
    padding: 10px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: .3s ease-in;
  }

  .party-details-btn:is(:hover, :active){
    background-color: #757575;
  }

</style>
