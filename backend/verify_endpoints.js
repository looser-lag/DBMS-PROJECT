const axios = require('axios');
async function run() {
    try {
        console.log("Checking Nithin (ID 6) assignments:");
        const res1 = await axios.get('http://localhost:3000/api/assignments/provider/6');
        console.log(JSON.stringify(res1.data, null, 2));

        console.log("\nChecking Jaswanth (ID 5) requests:");
        const res2 = await axios.get('http://localhost:3000/api/requests/user/5');
        console.log(JSON.stringify(res2.data, null, 2));
    } catch (err) {
        console.error(err.message);
    }
}
run();
