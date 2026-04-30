import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';
import { useNotes } from '../hooks/useNotes';
import Header from '../components/layout/Header';
import NotesGrid from '../components/notes/NotesGrid';
import NoteEditor from '../components/notes/NoteEditor';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const {
    notes,
    loading,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    includeDeleted,
    setIncludeDeleted,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    togglePin,
  } = useNotes();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = async (noteData) => {
    if (editingNote) {
      await updateNote(editingNote._id, noteData);
    } else {
      await createNote(noteData);
      setIsEditorOpen(false);
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  const handleToggleTrash = () => {
    setIncludeDeleted(!includeDeleted);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showTrash={includeDeleted}
        onToggleTrash={handleToggleTrash}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {includeDeleted ? 'Trash' : 'My Notes'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {includeDeleted 
                ? 'Deleted notes that can be restored'
                : 'Organize your thoughts and ideas'
              }
            </p>
          </div>
          
          {!includeDeleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button onClick={handleCreateNote}>
                <IoAdd className="mr-2" />
                New Note
              </Button>
            </motion.div>
          )}
        </div>

        <NotesGrid
          notes={notes}
          loading={loading}
          viewMode={viewMode}
          onNoteClick={handleEditNote}
          onNotePin={togglePin}
          onNoteDelete={deleteNote}
          onNoteRestore={restoreNote}
        />
      </main>

      <Modal
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        title={editingNote ? 'Edit Note' : 'New Note'}
        size="xl"
      >
        <div className="h-96">
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onClose={handleCloseEditor}
            isNew={!editingNote}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;