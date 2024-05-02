import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const Razorpay = require('razorpay')

const instance = new Razorpay({
  key_id: 'rzp_test_WmVAmPw5jdRajH',
  key_secret: 'WJFZKWOXnmQmEBkUkbcTpSl4',
})

var options = {
  amount: 50000, // amount in the smallest currency unit
  currency: 'INR',
  receipt: 'receipt1',
}

instance.orders.create(options, function (err, order) {
  const orderId = order.id
  console.log(orderId)
})
