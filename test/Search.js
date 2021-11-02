const API = require('../index'); // Change To 1cak if you use node_module

(async() => {
    console.log(await API.Search("Ganteng")); // Page ID Is Optional
})()

