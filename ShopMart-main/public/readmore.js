//Read More button functionality to show the entire text in About Us page

const readMoreBtn = document.querySelector('.read-more-btn')
const text = document.querySelector('.text')

readMoreBtn.addEventListener('click', () => {
  text.classList.toggle('show-more')
  if (readMoreBtn.innerText === 'Read More') {
    readMoreBtn.innerText = 'Read Less'
  } else {
    readMoreBtn.innerText = 'Read More'
  }
})
