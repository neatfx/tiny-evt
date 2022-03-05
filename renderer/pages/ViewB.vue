<template>
  <fieldset>
    <legend>Add new friend</legend>
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
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { db } from '../../main/db/db';// 待改为 electronAPI 安全桥接访问

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
        const id = await db.friends.add({
          name: this.friendName,
          age: this.friendAge,
        });

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
