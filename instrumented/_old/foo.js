const fetch = require('node-fetch')
const main = async function() {
  const result = await fetch('https://alanstorm.com')
  console.log(result)
}
main()
