const API = require('../index'); // Change To 1cak if you use node_module

(async() => {
    console.log("Random By Lol Section");
    console.log(await API.GetSectionPosts("lol")); // Page ID Is Optional
})()

/* Available Section 
1. lol, 
2. trend, 
3. recent 
4.legendary
*/