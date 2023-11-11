import {useEffect} from 'react'

function Home() {
  const getProducts = async () => {
    const url = 'https://fakestoreapi.com/products'
    const options = {method: 'GET'}
    const data = await fetch(url, options)
    console.log(data)
  }
  useEffect(() => {
    getProducts()
  }, [])
  return <h1>Hi</h1>
}

export default Home
