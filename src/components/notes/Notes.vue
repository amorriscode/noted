<template>
  <div class="section">
    <div class="container">

      <div class="content-wrapper">

        <div class="box">
          <h3 class="title">Notes</h3>

          <a v-if="editingNote" class="close-editor-icon" @click="closeEditor"><i class="fa fa-times fa-2x" aria-hidden="true"></i></a>

          <a v-else class="new-note-icon" @click="newNote"><i class="fa fa-plus fa-2x" aria-hidden="true"></i></a>

          <NoteEditor v-if="editingNote" :note=editingNote v-on:closeEditorClicked="closeEditor" />

          <div class="notes-list" v-else>
            <div class="note-container" v-if="notes.length > 0" v-for="note in notes" v-on:dblclick="editNote(note)">
              <h4 class="title is-4">{{safeTitle(note)}}</h4>
              <h6 class="subtitle is-6">{{timeAgo(note.dateCreated)}}</h6>
              <button class="button is-danger delete-note is-small" @click="deleteNote(note)"><i class="fa fa-times" aria-hidden="true"></i></button>
            </div><!-- /.notes-container -->

            <div v-else>
              You have no notes yet.
            </div>
          </div><!-- /.notes-list -->

        </div><!-- /.box -->

        <a class="logout-link"><router-link to="/logout">Logout</router-link></a>

      </div><!-- /.content-wrapper -->

    </div><!-- /.container -->
  </div><!-- /.section -->
</template>

<script>
  import firebaseApp from '../../firebaseApp';
  import moment from 'moment';
  import NoteEditor from './NoteEditor.vue';

  export default {
    components: { NoteEditor },
    data () {
      return {
        editingNote: false
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
    firebase() {
      const userId = this.uid;
      const now = parseInt(moment().unix());
      return {
        notes: firebaseApp.db.ref(`notes/${userId}`).orderByValue('dateCreated')
      }
    },
    methods: {
      timeAgo(date) {
        const timePassed = moment(date, 'X').fromNow();
        return (timePassed === 'Invalid date') ? 'a long, long time ago...' : timePassed;
      },
      safeTitle(note) {
        if (note.title) {
          return (note.title.length > 35) ? `${note.title.substr(1, 35)}...` : note.title;
        } else {
          return 'Untitled';
        }

      },
      newNote() {
        this.editingNote = {
          new: true,
          title: '',
          content: ''
        }
      },
      deleteNote(note) {
        // Remove note from firebase
        this.notesRef.child(note['.key']).remove();
      },
      editNote(note) {
        // Push selected note into state
        this.editingNote = note;
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

  .new-note-icon,
  .close-editor-icon {
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