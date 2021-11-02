const API = require('../index'); // Change To 1cak if you use node_module

(async() => {
    console.log(await API.GetPostID(1971739)); // Page ID Is Optional
})()

