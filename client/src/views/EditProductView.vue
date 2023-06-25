<template>
    <form class="add-form" @submit.prevent="updateProduct">
        <div class="complete-form">
            <div class="left-form">
                <div class="produit-box">
                    <label for="produit">Produit : </label>
                    <input id="produit" type="text" placeholder="Ajoutez le nom du Produit..." v-model="product.name"/>
                </div>
                <div class="prix-box">
                    <label for="prix" >Prix : </label>
                    <input id="prix" type="text" placeholder="Ajoute un Prix..." v-model="product.price">
                </div>
                <div class="category-box">
                  <label for="category">Catégorie : </label>
                  <input id="category" type="text" placeholder="Ajoute une Catégorie..." v-model="product.category">
                </div>
            </div>
            <div class="description-box">
                <label for="description">Description</label>
                <div class="textarea-wrapper">
                    <textarea rows="4" cols="40" id="description" placeholder="Ajoutez une Description..." v-model="product.description"/>
                </div>
            </div>
          </div>
          <div class="image-box">
            <label for="photo">Product Image : </label>
            <input id="photo" type="text" v-model="product.photo" placeholder="exemple.jpg..." required>
          </div>
        <div class="bouton-edit">
          <input type="submit" class="button-ajouter" value="Modifier le Produit"/>
          <input type="submit" class="button-supprimer" value="effacer le Produit" @click="deleteProduct"/>
        </div>
    </form>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  props: ['inventory', 'updateInv', 'removeInv'],
  data () {
    return {
      submitted: false,
      message: null,
      product: {},
      id: parseInt(this.$route.params.id)
    }
  },
  methods: {
    updateProduct () {
      ProductDataService.update(this.id, this.product)
        .then(() => {
          this.updateInv(this.productIndex, this.product)
          this.$emit('update-message', 'Produit mis à jour avec succès!')
          this.$router.push({ name: 'products' })
        })
        .catch(error => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = 'Une erreur est survenue lors de la mise à jour du produit...'
          }
        })
      this.submitted = true
    },
    deleteProduct () {
      ProductDataService.delete(this.id)
        .then(response => {
          this.removeInv(this.productIndex)
          this.$emit('update-message', 'Produit effacer avec succès!')
          this.$router.push({ name: 'products' })
        })
    }
  },
  computed: {
    productIndex () {
      const index = this.inventory.findIndex((p) => {
        return p.id === this.id
      })
      return index
    }
  },
  mounted () {
    ProductDataService.get(this.id)
      .then(response => {
        this.product = response.data
      })
  }
}

</script>
