import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoteCard from './NoteCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const NotesGrid = ({
  notes,
  loading,
  viewMode,
  onNoteClick,
  onNotePin,
  onNoteDelete,
  onNoteRestore,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No notes found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first note to get started
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
    : 'space-y-4';

  return (
    <motion.div
      layout
      className={gridClasses}
    >
      <AnimatePresence>
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onClick={() => onNoteClick(note)}
            onPin={() => onNotePin(note._id)}
            onDelete={(permanent) => onNoteDelete(note._id, permanent)}
            onRestore={() => onNoteRestore(note._id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotesGrid;