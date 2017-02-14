<template>
  <div class="section">
    <div class="container">

      <div class="content-wrapper">

        <div class="box">
          <h3 class="title">Notes</h3>

          <a class="new-note" @click="newNote"><i class="fa fa-plus fa-2x" aria-hidden="true"></i></a>

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
                <button class="button is-primary" @click="updateNote(note)">Save</button>
              </p>
              <p class="control">
                <button class="button is-link">Cancel</button>
              </p>
            </div>
          </div>

          <div class="notes-list" v-else>
            <div v-for="note in notes" v-on:dblclick="editNote(note)">
              {{note.title}}
              <button class="button is-danger" @click="deleteNote(note)">X</button>
            </div>
          </div><!-- /.notes-list -->

        </div><!-- /.box -->

        <a class="logout-link"><router-link to="/logout">Logout</router-link></a>

      </div><!-- /.content-wrapper -->

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
        editingNote: false,
      }
    },
    computed: {
      uid() {
        return this.$store.getters.uid;
      },
    },
    firebase() {
      const userId = this.uid;
      return {
        notes: firebaseApp.db.ref('notes').orderByChild(userId).equalTo(true)
      }
    },
    methods: {
      newNote() {

      },
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
        notesRef.child(this.editingNote['.key']).update({
          content: this.editingNote.content,
          title: this.editingNote.title
        });
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

  .box {
    position: relative;
    width: 100%;
  }

  .textarea {
    width: 100%;
  }

  .new-note {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
  }

  .logout-link {
    position: absolute;
    bottom: -5px;
    right: 0;
  }

  .content-wrapper {
    position: relative;
  }

  @media(min-width: 769px) {
    .content-wrapper {
      width: 35%;
    }
  }
</style>