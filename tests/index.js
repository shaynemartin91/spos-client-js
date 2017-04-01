const Client = require('../index');
const client = new Client(`shaynetestmulti.americommerce.com`, `6febda83c3c531ebd6c3f21268c20b75`);

const test = async () => {
  for(let i = 1; i <= 15; i++) {
    try {
      console.log(`Starting ${i}`)
      const prod = await client.Products.get(7065);
      console.log(`Ending ${i}`);
    } catch(e) {
      console.log(`Error in ${i}`)
      console.log(e)
    }
  }
}

test();