import api from './api';

const ticketService = {
  bookTicket: async (userId, data) => {
    // data: { routeId, routeName }
    const response = await api.post(`/api/tickets/book?userId=${userId}`, data);
    return response.data;
  },

  getMyTickets: async (userId) => {
    const response = await api.get(`/api/tickets/myTickets?userId=${userId}`);
    return response.data;
  },

  cancelTicket: async (ticketId) => {
    const response = await api.post(`/api/tickets/cancel/${ticketId}`);
    return response.data;
  },

  generateQRCode: async (ticketId) => {
    const response = await api.post(`/api/tickets/generateQR/${ticketId}`);
    return response.data;
  },

  validateQRCode: async (qrText) => {
    const response = await api.post('/api/tickets/validateQR', qrText);
    return response.data;
  },
};

export default ticketService;
