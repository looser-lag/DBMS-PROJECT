const axios = require('axios');

async function testFlow() {
    const baseURL = 'http://localhost:3000/api';

    try {
        console.log("1. Fetching skills...");
        const skillsRes = await axios.get(`${baseURL}/skills`);
        const skills = skillsRes.data;
        console.log(`Found ${skills.length} skills.`);

        // Find a skill with a provider
        const skill = skills.find(s => s.provider_id);
        if (!skill) {
            console.error("❌ No skills with provider_id found. Check if USER_SKILL is populated and JOIN is working.");
            return;
        }
        console.log(`Testing with Skill: ${skill.skill_name} (ID: ${skill.skill_id}, Provider ID: ${skill.provider_id})`);

        console.log("\n2. Creating a request...");
        const requestData = {
            requesterId: 4, // Diana Prince (from seed)
            skillId: skill.skill_id,
            description: "Automated test request",
            preferredDate: new Date(),
            providerId: skill.provider_id
        };

        const reqRes = await axios.post(`${baseURL}/requests`, requestData);
        console.log("✅ Request created successfully.");
        const requestId = reqRes.data.request.request_id;

        console.log("\n3. Verifying requester sees it...");
        const requesterReqs = await axios.get(`${baseURL}/requests/user/4`);
        const foundInRequester = requesterReqs.data.find(r => r.request_id === requestId);
        if (foundInRequester) {
            console.log("✅ Requester sees the request.");
        } else {
            console.error("❌ Requester DOES NOT see the request.");
        }

        console.log("\n4. Verifying provider sees it...");
        const providerAssig = await axios.get(`${baseURL}/assignments/provider/${skill.provider_id}`);
        const foundInProvider = providerAssig.data.find(a => a.request_id === requestId);
        if (foundInProvider) {
            console.log("✅ Provider sees the request in assignments.");
        } else {
            console.error("❌ Provider DOES NOT see the request.");
        }

    } catch (err) {
        console.error("❌ Test failed:", err.response?.data || err.message);
    }
}

testFlow();
