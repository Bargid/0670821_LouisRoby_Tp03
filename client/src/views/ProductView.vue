<template>
<div class="container">
    <header>
        <h1>Liste de Produits</h1>
        <router-link to="/add-product"><button class="button-add">Ajouter</button></router-link>
    </header>
    <div class="produit" v-for="(product, i) in inventory" v-bind:key="i">
        <div class="produit-tout">
        <div class="pourx">
            <h3>{{ product.name }}</h3>
        </div>
        <div class="produit-description">
            <img class="product-image" v-bind:src="require(`@/assets/img/${product.photo}`)" alt="" />
            <p>{{ product.description }}</p>
        </div>
        <div class="produit-info">
            <p>Prix : {{ product.price }}</p>
            <p>Catégorie : {{ product.category }}</p>
        </div>
        </div>
        <div class="modif-supprimer">
        <!-- <div class="delete">
            <img src="@/assets/icons/trash-2.svg" alt="Trash" />
        </div> -->
        <div class="modifier">
            <router-link v-bind:to="{name: 'edit-product', params: {id: product.id}}"><img src="@/assets/icons/edit.svg" alt="Edit" /></router-link>
        </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
  props: ['inventory', 'add', 'removeInv'], // on va chercher 'inventory' et le 'add' dans le App
  computed: {
    product () {
      return this.inventory.find(product => product.name === this.$route.params.id)
    }
  }
}

</script>
