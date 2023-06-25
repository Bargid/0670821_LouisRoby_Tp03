import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import AccueilView from '../views/AccueilView.vue'
import AddProductView from '../views/AddProductView.vue'
import EditProductView from '../views/EditProductView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AccueilView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView
  },
  {
    path: '/add-product',
    name: 'addproduct',
    component: AddProductView
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProductView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
