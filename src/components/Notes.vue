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
                <button v-if="editingNote.new" class="button is-primary" @click="addNote()">Save</button>
                <button v-else class="button is-primary" @click="updateNote()">Save</button>
              </p>
              <p class="control">
                <button @click="closeEditor" class="button is-link">Cancel</button>
              </p>
            </div>
          </div>

          <div class="notes-list" v-else>
            <div class="note-container" v-for="note in notes" v-on:dblclick="editNote(note)">
              <h4 class="title is-4">{{note.title}}</h4>
              <h6 class="subtitle is-6">{{timeAgo(note.dateCreated)}}</h6>
              <button class="button is-danger delete-note is-small" @click="deleteNote(note)"><i class="fa fa-times" aria-hidden="true"></i></button>
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
  import moment from 'moment';

  const notesRef = firebaseApp.db.ref('notes');

  export default {
    data () {
      return {
        editingNote: false
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
        this.editingNote = false;
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

  .note-container {
    height: 50px;
    border-bottom: 1px solid rgba(10,10,10,0.08);
    position: relative;
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  div .delete-note {
    /* Hide the delete button by default */
    visibility: hidden;
    position: absolute;
    right: 0;
    bottom: 50%;
  }

  div:hover > .delete-note {
    /* Show the delete button */
    visibility: visible;
  }

  @media(min-width: 769px) {
    .content-wrapper {
      width: 35%;
    }
  }
</style>