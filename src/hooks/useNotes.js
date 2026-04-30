import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { noteService } from '../services/noteService';
import toast from 'react-hot-toast';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const fetchNotes = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        search: debouncedSearchTerm,
        tags: selectedTags.join(','),
        sortBy,
        sortOrder,
        includeDeleted,
      };

      const response = await noteService.getNotes(params);
      setNotes(response.data.notes);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch notes');
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, selectedTags, sortBy, sortOrder, includeDeleted]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = async (noteData) => {
    try {
      const response = await noteService.createNote(noteData);
      setNotes(prev => [response.data, ...prev]);
      toast.success('Note created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create note');
      throw error;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await noteService.updateNote(id, noteData);
      setNotes(prev => prev.map(note => 
        note._id === id ? response.data : note
      ));
      return response.data;
    } catch (error) {
      toast.error('Failed to update note');
      throw error;
    }
  };

  const deleteNote = async (id, permanent = false) => {
    try {
      await noteService.deleteNote(id, permanent);
      if (permanent) {
        setNotes(prev => prev.filter(note => note._id !== id));
        toast.success('Note permanently deleted');
      } else {
        setNotes(prev => prev.map(note => 
          note._id === id ? { ...note, isDeleted: true } : note
        ));
        toast.success('Note moved to trash');
      }
    } catch (error) {
      toast.error('Failed to delete note');
      throw error;
    }
  };

  const restoreNote = async (id) => {
    try {
      const response = await noteService.restoreNote(id);
      setNotes(prev => prev.map(note => 
        note._id === id ? response.data : note
      ));
      toast.success('Note restored successfully');
    } catch (error) {
      toast.error('Failed to restore note');
      throw error;
    }
  };

  const togglePin = async (id) => {
    try {
      const response = await noteService.togglePin(id);
      setNotes(prev => prev.map(note => 
        note._id === id ? response.data : note
      ));
      toast.success(response.data.isPinned ? 'Note pinned' : 'Note unpinned');
    } catch (error) {
      toast.error('Failed to toggle pin');
      throw error;
    }
  };

  return {
    notes,
    loading,
    pagination,
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode,
    includeDeleted,
    setIncludeDeleted,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    togglePin,
  };
};