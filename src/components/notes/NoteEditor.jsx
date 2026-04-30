import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoSave, IoClose, IoAdd, IoRemove } from 'react-icons/io5';
import { useAutoSave } from '../../hooks/useAutoSave';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

const NoteEditor = ({ note, onSave, onClose, isNew = false }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);

  const noteData = { title, content, tags };

  const handleAutoSave = async (data) => {
    if (!isNew && (data.title || data.content)) {
      try {
        setSaving(true);
        await onSave(data);
        toast.success('Auto-saved', { duration: 1000 });
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  useAutoSave(noteData, handleAutoSave, 2000);

  const handleManualSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      setSaving(true);
      await onSave(noteData);
      if (isNew) {
        onClose();
      }
      toast.success('Note saved successfully');
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isNew ? 'New Note' : 'Edit Note'}
          </h2>
          {saving && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Saving...
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleManualSave} loading={saving}>
            <IoSave className="mr-2" />
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <IoClose />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="text-lg font-semibold"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content
          </label>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Start writing your note..."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <IoRemove size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <Button variant="secondary" onClick={addTag}>
              <IoAdd />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;