import React from 'react';
import { motion } from 'framer-motion';
import { IoPin, IoTrash, IoRefresh, IoCreate } from 'react-icons/io5';
import { formatDate } from '../../utils/dateUtils';
import { getPreviewText } from '../../utils/textUtils';
import Button from '../ui/Button';

const NoteCard = ({
  note,
  onClick,
  onPin,
  onDelete,
  onRestore,
  showActions = true,
}) => {
  const handleAction = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="note-card group relative"
      onClick={onClick}
    >
      {note.isPinned && !note.isDeleted && (
        <div className="absolute top-2 right-2 text-primary-600">
          <IoPin size={16} />
        </div>
      )}

      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
          {note.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {getPreviewText(note.content)}
        </p>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{formatDate(note.updatedAt)}</span>
        
        {showActions && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {note.isDeleted ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleAction(e, onRestore)}
                  className="p-1"
                >
                  <IoRefresh size={16} />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => handleAction(e, () => onDelete(true))}
                  className="p-1"
                >
                  <IoTrash size={16} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleAction(e, onPin)}
                  className="p-1"
                >
                  <IoPin size={16} className={note.isPinned ? 'text-primary-600' : ''} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleAction(e, onClick)}
                  className="p-1"
                >
                  <IoCreate size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleAction(e, () => onDelete(false))}
                  className="p-1"
                >
                  <IoTrash size={16} />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NoteCard;