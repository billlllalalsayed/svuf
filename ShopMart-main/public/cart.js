let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let discountCode = document.getElementById('discount-code')

let basket = JSON.parse(localStorage.getItem('data')) || []

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount')
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  /* the zero is default number ,everytime the calculation starts from zero */
}
calculation()

let generateShop = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x
        let search = shopItemsData.find((x) => x.id === id) || []
        let { name, img, price } = search
        return `
        <table >
        <thead>
          <tr>
            <td>Image</td>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
           <tr>
         <td><img width='80' src="${img}" alt=""></td>
          <td>
            <h4>${name}</h4>
          </td>
          <td><h4>$${price}</h4></td>
          <td >
           <div class="quantity">
            <i onclick="decrement(${id})">-</i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})">+</i>
          </div>  
          </td>
          <td><h4>$${item * search.price}</h4></td>
          <td><button onclick='remove(${id})' class='remove-btn' type="button">Remove</button></td>
          </tr>
        </tbody>
      </table>
        `
      })
      .join(''))
  } else {
    shoppingCart.innerHTML = ``
    label.innerHTML = `
    <div class='empty-cart'>
       <h2>Cart is empty!</h2>
       <a href="/public/pages/shop.html"><button class='buy-btn'>Back To Shopping</button></a>
    </div>   
       `
  }
}

generateShop()

/* INCREMENT FUNCTION */

let increment = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  search === undefined
    ? basket.push({
        id: selectedItem.id,
        item: 1,
      })
    : search.item > 4
    ? alert('Maximum quantity 5 allowed!')
    : (search.item += 1)

  /* console.log(basket) */
  /* console.log(selectedItem.id) */
  /*  RE-RENDERING CARDS */
  generateShop()
  update(selectedItem.id)

  localStorage.setItem('data', JSON.stringify(basket))
}

/* DECREMENT FUNCTION */

let decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else search.item -= 1

  /* console.log(basket) */

  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0)

  /*  RE-RENDERING CARDS */
  generateShop()

  localStorage.setItem('data', JSON.stringify(basket))
}

/* UPDATE FUNCTION */

let update = (id) => {
  let search = basket.find((x) => x.id === id)
  /* console.log(search.item) */
  document.getElementById(id).innerHTML = search.item

  calculation()
  totalAmount()
}

/* REMOVE BUTTON */

let remove = (id) => {
  let selectedItem = id
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateShop()
  totalAmount()
  calculation()
  localStorage.setItem('data', JSON.stringify(basket))
}

/* CLEAR CART */

let clearCart = () => {
  basket = []
  generateShop()
  calculation()
  localStorage.setItem('data', JSON.stringify(basket))
}

/* TOTAL AMOUNT */

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x
        let search = shopItemsData.find((x) => x.id === id) || []
        return item * search.price
      })
      .reduce((x, y) => x + y, 0)
    /*  console.log(amount) */

    label.innerHTML = `
   
    <div class='amount'> 
     <table >
      <thead>
        <tr>
           <td>Total Bill</td>
           <td></td>
        </tr>
      </thead>  
      <tbody>
        <tr>
           <td><h4> Total Amount </h4></td>
           <td><h4 id='totalAmount'>$${amount}</h4></td>
        </tr>
      </tbody>
     </table >

     <div>
       <button id='rzp-button1' type='button' class='buy-btn'>Checkout</button>
       <button onclick='clearCart()' type='button' class='clear-btn'>Clear Cart</button>
     </div> 
     
    </div>  
      `
  } else return
}

totalAmount()

//RAZORPAY PAYMENT GATEWAY

var option = {
  key: 'rzp_test_WmVAmPw5jdRajH',
  amount: 50000,
  currency: 'INR',
  name: 'ShopMart',
  description: 'Test Transaction',
  image: '/public/favicon.ico',
  order_id: function (res) {
    order_id = res.razorpay_order_id
  },
  callback_url: 'http://127.0.0.1:5501/public/src/index.html',
  prefill: {
    name: 'Gaurav Kumar',
    email: 'gaurav.kumar@example.com',
    contact: '9000090000',
  },
  notes: {
    address: 'ShopMart Corporate Office',
  },
  theme: {
    color: 'coral',
  },
}
var rzp1 = new Razorpay(option)
document.getElementById('rzp-button1').onclick = function (e) {
  rzp1.open()
  e.preventDefault()
}
