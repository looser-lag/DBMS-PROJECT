import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    login: async (email, password) => {
        return api.post('/auth/login', { email, password });
    },
    register: async (userData) => {
        return api.post('/auth/register', userData);
    }
};

export const skillsService = {
    getAll: async () => {
        const res = await api.get('/skills');
        return res.data;
    },
    addSkill: async (skillData) => {
        return api.post('/skills', skillData);
    },
    deleteSkill: async (id, userId) => {
        return api.delete(`/skills/${id}${userId ? `?userId=${userId}` : ''}`);
    }
};

export const userService = {
    getActivity: async (userId) => {
        return api.get(`/users/${userId}/activity`);
    },
    getProfile: async (userId) => {
        return api.get(`/users/${userId}`);
    },
    getStats: async (userId) => {
        return api.get(`/users/${userId}/stats`);
    }
};

export const requestsService = {
    create: async (requestData) => {
        return api.post('/requests', requestData);
    },
    getUserRequests: async (userId) => {
        return api.get(`/requests/user/${userId}`);
    }
};

export const assignmentsService = {
    getProviderAssignments: async (userId) => {
        return api.get(`/assignments/provider/${userId}`);
    },
    updateStatus: async (assignmentId, status) => {
        return api.put(`/assignments/${assignmentId}/status`, { status });
    }
};

export const feedbackService = {
    submit: async (feedbackData) => {
        return api.post('/feedback', feedbackData);
    }
};

export const categoriesService = {
    getAll: async () => {
        const res = await api.get('/categories');
        return res.data;
    }
};

export const statsService = {
    getGlobalStats: async () => {
        const res = await api.get('/stats');
        return res.data;
    }
};

export default api;
