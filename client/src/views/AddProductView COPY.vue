<template>
    <form class="add-form">
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
          <input type="submit" class="button-ajouter" value="Créer le Produit" @click="newProduct"/>
        </div>
    </form>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  props: ['addInv'],
  data () {
    return {
      submitted: false,
      message: null,
      product: {
        name: null,
        photo: null,
        price: null,
        description: null
      }
    }
  },
  methods: {
    saveProduct () {
      ProductDataService.create(this.product)
        .then(response => {
          this.product.id = response.data.id
          this.addInv(this.product)
          this.submitted = true
          this.message = null
        })
        .catch(error => {
          this.message = error.response.data.message
        })
      this.submitted = true
    },
    newProduct () {
      this.product = {}
      this.submitted = false
    }
  }
}

</script>
