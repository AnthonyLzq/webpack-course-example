import Template from '@templates/Template'
import '@styles/index.css'

;(async function App() {
  const main = null || document.getElementById('main')
  main.innerHTML = await Template()
})()
