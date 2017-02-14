<template>
  <div>
    <div class="note-editor" v-if="editingNote">
      <div class="control">
        <label class="label">Title</label>
        <input class="input" v-model="editingNote.title" />
      </div>

      <div class="control">
        <label class="label">Note</label>
        <textarea class="textarea" v-model="editingNote.content"></textarea>
      </div>

      <div class="control is-grouped">
        <p class="control">
          <button v-if="editingNote.new" class="button is-primary" @click="addNote()">Save</button>
          <button v-else class="button is-primary" @click="updateNote()">Save</button>
        </p>
        <p class="control">
          <button @click="closeEditor" class="button is-link">Cancel</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import firebaseApp from '../../firebaseApp';
  import moment from 'moment';

  export default {
    props: ['note'],
    data () {
      return {
        editingNote: this.note
      }
    },
    computed: {
      uid() {
        return this.$store.getters.uid;
      },
      notesRef() {
        const userId = this.uid;
        return firebaseApp.db.ref(`notes/${userId}`);
      }
    },
    methods: {
      newNote() {
        this.editingNote = {
          new: true,
          title: '',
          content: ''
        }
      },
      addNote() {
        // Switch to unix for sorting
        const newNote = {
          ...this.editingNote,
          dateCreated: parseInt(moment().unix())
        };

        // Remove the 'new' key
        delete newNote.new;

        // Push note into database
        this.notesRef.push(newNote);

        this.closeEditor();
      },
      deleteNote(note) {
        // Remove note from firebase
        this.notesRef.child(note['.key']).remove();
      },
      editNote(note) {
        // Push selected note into state
        this.editingNote = note;
      },
      updateNote() {
        // Update note in DB then clear the state
        this.notesRef.child(this.editingNote['.key']).update({
          content: this.editingNote.content,
          title: this.editingNote.title
        });

        this.closeEditor();
      },
      closeEditor() {
        // Close editor
        this.$emit('closeEditorClicked');
        this.editingNote = false;
      }
    }
  }
</script>

<style>
  .textarea {
    width: 100%;
  }

  .new-note-icon,
  .close-editor-icon {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
  }
</style>