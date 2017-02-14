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

  const notesRef = firebaseApp.db.ref('notes');

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
    },
    methods: {
      timeAgo(date) {
        const timePassed = moment(date, 'ddd MMM DD YYYY HH:mm:ss Z').fromNow();
        return (timePassed === 'Invalid date') ? 'A long, long time ago...' : timePassed;
      },
      newNote() {
        this.editingNote = {
          new: true,
          title: '',
          content: ''
        }
      },
      addNote() {
        const newNote = {...this.editingNote};
        newNote[this.uid] = true;
        newNote.dateCreated = moment().toString();

        // Remove the 'new' key
        delete newNote.new;

        // Push note into database
        notesRef.push(newNote);

        this.closeEditor();
      },
      deleteNote(note) {
        // Remove note from firebase
        notesRef.child(note['.key']).remove();
      },
      editNote(note) {
        // Push selected note into state
        this.editingNote = note;
      },
      updateNote() {
        // Update note in DB then clear the state
        notesRef.child(this.editingNote['.key']).update({
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