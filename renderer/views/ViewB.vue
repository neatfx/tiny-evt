<template>
  <div>
    <legend>Add New Item</legend>
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
    <button @click="addFriend">Add Friend</button>
    <p>{{ status }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { db } from '../db/db'
import Contact from '../db/tables/Contact'

export default defineComponent({
  name: 'FriendAdder',
  setup: (props)=>{},
  data: () => {
    return {
      status: '',
      friendName: '',
      friendAge: 21,
      defaultAge: 21
    };
  },
  methods: {
    async addFriend() {
      try {
        const id = await db.contacts.add(new Contact(
          this.friendName,
          this.friendAge
        ));

        this.status = `Friend ${this.friendName} successfully added. Got id ${id}`;

        this.friendName = '';
        this.friendAge = this.defaultAge;
      } catch (error) {
        this.status = `Failed to add ${this.friendName}: ${error}`;
      }
    },
  },
})
</script>
