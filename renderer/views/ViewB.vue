<template>
  <button @click="toggleForm">Add New</button>
  <div id="data-form" v-if="showForm">
    <label>
      Name:
      <input v-model="friendName" type="text" />
    </label>
    <br />
    <label>
      Age:
      <input v-model="friendAge" type="number" />
    </label>
    <br />
    <button @click="addNew">Add</button>
    <p>{{ status }}</p>
  </div>
  <DataRows></DataRows>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataRows from "../components/DataRows.vue"
import { TestingDB } from '../db'
import Contact from '../db/tables/Contact'

export default defineComponent({
  setup: (props) => { },
  components: {
    DataRows
  },
  data: () => {
    return {
      showForm: true,
      status: '',
      friendName: '',
      friendAge: 21,
      defaultAge: 21
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
    },
    async addNew() {
      try {
        const id = await TestingDB.contacts.add(new Contact(
          this.friendName,
          this.friendAge
        ));

        this.status = `Friend ${this.friendName} successfully added. Got id ${id}`;
        // await DataRows.methods?.getItems()
        this.friendName = '';
        this.friendAge = this.defaultAge;
      } catch (error) {
        this.status = `Failed to add ${this.friendName}: ${error}`;
      }
    },
  },
})
</script>
<style>
button {
  display: inline-block;
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
}
button:hover {
  background-color: lightgrey;
}
#data-form {
  border: 1px sold lightgrey;
  padding: 5px;
}
</style>