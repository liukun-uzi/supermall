export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // let oldProduct = null
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        // oldProduct.count +=1
        context.commit('addCounter', oldProduct)
        resolve()
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}