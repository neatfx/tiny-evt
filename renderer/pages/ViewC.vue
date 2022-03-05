<template>
  <div>
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        {{ friend.name }}, {{ friend.age }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// const {electronAPI} = window
import { db } from "../../main/db/db";
import Contact from "../../main/db/tables/Contact";

export default defineComponent({
  data: () => {
    return {
      // friends:[]
    };
  },
  setup(data) {
    const friends = ref({} as Contact[]);
    // electronAPI.send('reset-testing-db', friends)
    async function getContacts() {
      db.contacts.toArray((data) => {
        friends.value = data
      });
    }
    onMounted(async () => {
      getContacts()
    });
    return {
      friends,
    };
  },
});
</script>