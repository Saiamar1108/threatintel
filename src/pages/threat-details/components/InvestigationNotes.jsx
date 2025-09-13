import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvestigationNotes = ({ notes, onAddNote, onDeleteNote, onUpdateNote, currentUser }) => {
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote({
        id: Date.now(),
        content: newNote,
        author: currentUser?.name,
        timestamp: new Date()?.toLocaleString(),
        type: 'investigation'
      });
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note?.id);
    setEditContent(note?.content);
  };

  const handleUpdateNote = () => {
    if (editContent?.trim()) {
      onUpdateNote(editingNote, editContent);
      setEditingNote(null);
      setEditContent('');
    }
  };

  const getNoteTypeIcon = (type) => {
    switch (type) {
      case 'investigation': return 'Search';
      case 'analysis': return 'Brain';
      case 'mitigation': return 'Shield';
      case 'escalation': return 'AlertTriangle';
      default: return 'FileText';
    }
  };

  const getNoteTypeColor = (type) => {
    switch (type) {
      case 'investigation': return 'bg-blue-100 text-blue-800';
      case 'analysis': return 'bg-purple-100 text-purple-800';
      case 'mitigation': return 'bg-green-100 text-green-800';
      case 'escalation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="FileText" size={20} className="mr-2" />
          Investigation Notes
        </h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          onClick={() => setIsAddingNote(true)}
        >
          Add Note
        </Button>
      </div>
      {/* Add New Note */}
      {isAddingNote && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="space-y-4">
            <Input
              label="Investigation Note"
              type="text"
              placeholder="Enter your investigation findings, analysis, or observations..."
              value={newNote}
              onChange={(e) => setNewNote(e?.target?.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                iconName="Save"
                onClick={handleAddNote}
                disabled={!newNote?.trim()}
              >
                Save Note
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Notes List */}
      <div className="space-y-4">
        {notes?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No investigation notes yet</p>
            <p className="text-sm text-muted-foreground">
              Add notes to track your investigation progress and findings
            </p>
          </div>
        ) : (
          notes?.map((note) => (
            <div key={note?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {note?.author?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{note?.author}</p>
                    <p className="text-xs text-muted-foreground">{note?.timestamp}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getNoteTypeColor(note?.type)}`}>
                    <Icon name={getNoteTypeIcon(note?.type)} size={12} className="inline mr-1" />
                    {note?.type}
                  </span>
                </div>
                
                {note?.author === currentUser?.name && (
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Edit"
                      onClick={() => handleEditNote(note)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Trash2"
                      onClick={() => onDeleteNote(note?.id)}
                    />
                  </div>
                )}
              </div>
              
              {editingNote === note?.id ? (
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e?.target?.value)}
                    className="w-full"
                  />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Save"
                      onClick={handleUpdateNote}
                    >
                      Update
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingNote(null);
                        setEditContent('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {note?.content}
                </p>
              )}
              
              {note?.attachments && note?.attachments?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Attachments:</p>
                  <div className="flex flex-wrap gap-2">
                    {note?.attachments?.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-muted rounded px-2 py-1">
                        <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-foreground">{attachment?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            onClick={() => {/* Handle share */}}
          >
            Share Notes
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => {/* Handle export */}}
          >
            Export Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Bell"
            onClick={() => {/* Handle notification */}}
          >
            Set Reminder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestigationNotes;