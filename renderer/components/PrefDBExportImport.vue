<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TestingDB } from '../db'
import BaseButton from './BaseButton.vue';
import {importDB, exportDB, importInto, peakImportFile} from "dexie-export-import";
import type { ExportProgress } from 'dexie-export-import/dist/export';

type Table = {
  id: string;
  name: string;
  count: number;
  primKey: string;
}
let tables = ref<Table[]>([])

async function exportDatabase() {
  try {
    const blob = await exportDB(TestingDB, { prettyJson: true , progressCallback});
    console.log(blob)
  } catch (error) {
    console.error('' + error);
  }
};

function progressCallback(progress: ExportProgress): boolean {
  console.log(`Progress: ${progress.completedRows} of ${progress.totalRows} rows completed`);
  return progress.done
}

function ondragover(event: any) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

// Handle file drop
async function ondrop(ev: any) {
  ev.stopPropagation();
  ev.preventDefault();

  // Pick the File from the drop event (a File is also a Blob):
  const file = ev.dataTransfer.files[0];
  // try {
  //   if (!file) throw new Error(`Only files can be dropped here`);
  //   console.log("Importing " + file.name);
  //   await db.delete();
  //   db = await Dexie.import(file, {
  //     progressCallback
  //   });
  //   console.log("Import complete");
  //   await showContent();
  // } catch (error) {
  //   console.error('' + error);
  // }
}

async function showContent() {
  tables.value = await Promise.all(TestingDB.tables.map(async table => ({
    id: table.name,
    name: table.name,
    count: await table.count(),
    primKey: table.schema.primKey.src
  })));
}

onMounted(async () => {
  await showContent()
})
</script>

<template>
  <h5>Database Name: {{ TestingDB.name }}</h5>
  <ul>
    <li v-for="table in tables" :key="table.id">
      <span>Table: {{ table.id }} - Primary Key: {{ table.primKey }} - Row count: {{ table.count }}</span>
    </li>
  </ul>
  <BaseButton text="Export Database" @click="exportDatabase"></BaseButton>
  <div id="dropzone" @dragover="ondragover" @drop="ondrop">Drop exported Dexie JSON file here.</div>
</template>

<style scoped>
#dropzone {
  border: 3px dotted grey;
  border-radius: 10px;
  padding: 25px;
  margin-top: 20px;
  color: grey;
  text-align: center;
}
ul {
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
li {
  border: 1px solid grey;
  padding: 5px 0 5px 5px;
  margin-top: -1px;
}
</style>