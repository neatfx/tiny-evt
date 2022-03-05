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
import { db } from "../db/db";
import Contact from "../db/tables/Contact";

export default defineComponent({
  data: () => {
    return {
      // friends:[]
    };
  },
  setup(data) {
    const friends = ref({} as Contact[]);

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