let product = document.getElementById('product')

let basket = JSON.parse(localStorage.getItem('data')) || []

const generateShop = () => {
  return (product.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, img, price } = x
      let search = basket.find((y) => y.id === id) || []
      return ` 
       <div  id=product-id-${id}  class='item product text-center  col-12'>
            <img src="${img}" alt="" class="img-fluid mb-3">
            <h5 class="p-name" >${name}</h5>
            <h4 class="p-price"> $${price}</h4>
            <div class='buttons'>
              <i onclick='decrement(${id})'>-</i>
              <div id=${id} class='quantity'>${
        search.item === undefined ? 0 : search.item
      }</div>
              <i onclick='increment(${id})'>+</i>
            </div>
            <a href='/public/pages/cart.html'> <button  onclick='increment(${id})' class='buy-btn'>Buy Now</button></a>
        
           
          </div>`
    })
    .join(''))
}

generateShop()

/* increment function */

let increment = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  search === undefined
    ? basket.push({
        id: selectedItem.id,
        item: 1,
      })
    : (search.item += 1)

  /* console.log(basket) */
  /* console.log(selectedItem.id) */
  update(selectedItem.id)

  localStorage.setItem('data', JSON.stringify(basket))
}

/* decrement function */

let decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else search.item -= 1

  /* console.log(basket) */

  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0)

  localStorage.setItem('data', JSON.stringify(basket))
}

/* update function */

let update = (id) => {
  let search = basket.find((x) => x.id === id)
  /* console.log(search.item) */
  document.getElementById(id).innerHTML = search.item

  calculation()
}

/* cart total */
let calculation = () => {
  let cartIcon = document.getElementById('cartAmount')
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  /* the zero is default number ,everytime the calculation starts from zero */
}
calculation()
