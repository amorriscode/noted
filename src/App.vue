<template>
  <div>
    <Login v-if="user === false" />

    <div v-else>
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
    </div>
  </div>
</template>

<script>
  import auth from './auth';
  import Login from './components/Login.vue';

  export default {
    components: { Login },
    data () {
      return {
        user: auth.user.authenticated,
        note: '',
        editingNote: ''
      }
    },
    beforeCreate() {
      auth.constructor();
    }
    // firebase: {
    //   notes: notesRef
    // },
    // methods: {
    //   addNote() {
    //     // Push note into database
    //     notesRef.push({
    //       content: this.note
    //     })
    //   },
    //   deleteNote(note) {
    //     // Remove note from firebase
    //     notesRef.child(note['.key']).remove();
    //   },
    //   editNote(note) {
    //     // Push selected note into state
    //     this.editingNote = note;
    //   },
    //   updateNote() {
    //     // Update note in DB then clear the state
    //     notesRef.child(this.editingNote['.key']).update({content: this.editingNote.content});
    //     this.editingNote = '';
    //   }
    // }
  }
</script>

<style>
</style>