<template>
  <ul>
    <li v-for="friend in friends" :key="friend.id">
      {{ friend.name }}, {{ friend.age }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
  import { liveQuery } from "dexie";
  import { useObservable } from "@vueuse/rxjs";

  import { db } from "../../main/db/db";

  export default defineComponent({
    name: "FriendList",
    setup() {
      return {
        db,
        items: useObservable(
          liveQuery(() => db.friends.toArray())
        ),
      };
    },
  });
</script>