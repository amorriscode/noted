<template>
  <div class="section">
    <div class="container">

      <div class="box">
        <h3 class="title">Notes</h3>

        <input v-model="note" placeholder="Add Note">
        <button @click="addNote">Add Note</button>

        <div v-for="note in notes" v-on:dblclick="editNote(note)">
          <span v-if="editingNote['.key'] === note['.key']">
            <input v-model="editingNote.content"/>
            <button @click="updateNote(note)">Save</button>
          </span>

          <span v-else>
            {{note.content}}
            <button @click="deleteNote(note)">X</button>
          </span>

        </div>

      </div><!-- /.box -->

    </div><!-- /.container -->
  </div><!-- /.section -->
</template>

<script>
  import firebaseApp from '../firebaseApp';

  const notesRef = firebaseApp.db.ref('notes');

  export default {
    data () {
      return {
        note: '',
        editingNote: '',
      }
    },
    computed: {
      uid() {
        return this.$store.getters.uid;
      },
    },
    firebase: {
      notes: notesRef
    },
    methods: {
      addNote() {
        const newNote = {
          content: this.note
        };
        newNote[this.uid] = true;

        // Push note into database
        notesRef.push(newNote);
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
        notesRef.child(this.editingNote['.key']).update({content: this.editingNote.content});
        this.editingNote = '';
      }
    }
  }
</script>

<style>
  .section {
    width: 100%;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-link {
    position: absolute;
    bottom: -5px;
  }

  @media(min-width: 769px) {
    .box {
      width: 35%;
    }
  }
</style>