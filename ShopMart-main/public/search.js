let search = () => {
  let searchBox = document.getElementById('search-item').value.toUpperCase()
  let storeItems = document.getElementById('product')
  let product = document.querySelectorAll('.item')
  let pname = storeItems.getElementsByClassName('p-name')

  for (var i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByClassName('p-name')[0]

    if (match) {
      let textValue = match.textContent || match.innerHTML

      if (textValue.toUpperCase().indexOf(searchBox) > -1) {
        product[i].style.display = ''
      } else {
        product[i].style.display = 'none'
      }
    }
  }
}
