import api from './api';

export const noteService = {
  async getNotes(params = {}) {
    const response = await api.get('/notes', { params });
    return response.data;
  },

  async getNoteById(id) {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  async createNote(noteData) {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  async updateNote(id, noteData) {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  async deleteNote(id, permanent = false) {
    const response = await api.delete(`/notes/${id}`, {
      params: { permanent }
    });
    return response.data;
  },

  async restoreNote(id) {
    const response = await api.put(`/notes/${id}/restore`);
    return response.data;
  },

  async togglePin(id) {
    const response = await api.put(`/notes/${id}/pin`);
    return response.data;
  },

  async getTags() {
    const response = await api.get('/notes/tags');
    return response.data;
  },
};