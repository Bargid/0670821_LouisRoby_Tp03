<template>
  <div class="header-menu">
    <router-link to="/">Page d'Accueil</router-link>
    <router-link to="/products">Voir les produits</router-link>
  </div>

  <div class="success-message" v-show="message">{{ message }}</div>

  <RouterView
  v-bind:inventory="inventory"
  @update:inventory="inventory = $event"
  v-bind:addInv="addInventory"
  v-bind:updateInv="updateInventory"
  v-bind:removeInv="removeInventory"
  v-on:update-message="updateMessage"
  />

</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  data () {
    return {
      inventory: [],
      message: null
    }
  },
  methods: {
    addInventory (data) {
      this.inventory.push(data)
    },
    updateInventory (index, data) {
      console.log('Updating inventory:', index, data)
      this.inventory[index].name = data.name
      this.inventory[index].photo = data.photo
      this.inventory[index].price = data.price
      this.inventory[index].description = data.description
      this.inventory[index].category = data.category
    },
    updateMessage (message) {
      this.message = message
      setTimeout(() => {
        this.message = null
      }, 4000)
    },
    removeSuccessMessage () {
      this.message = null
    },
    removeInventory (index) {
      this.inventory.splice(index, 1)
    }
  },
  mounted () {
    ProductDataService.getAll()
      .then(response => {
        console.log(response.data)
        this.inventory = response.data
        this.$nextTick(() => {
          const successMessage = document.querySelector('.success-message')
          successMessage.addEventListener('animationend', this.removeSuccessMessage)
        })
      })

    // Get the success message from route params if available
    this.message = this.$route.params.message || null
  }
}
</script>

<!-- <style>
@import '@/assets/css/styles.css';
</style> -->
