<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TestingDB } from '../../db'
import BaseButton from '../BaseButton.vue';
import { importDB, exportDB, importInto, peakImportFile } from "dexie-export-import";
import type { ExportProgress } from 'dexie-export-import/dist/export';

const { electronDatabase } = window
var userAgent = navigator.userAgent.toLowerCase();

type Table = {
  id: string;
  name: string;
  count: number;
  primKey: string;
}
type PeakInfo = {
  fileName: string
  databaseName: string
  databaseVersion: number
  tables: {
    id: string,
    name: string,
    rawCount: number
  }[]
}
let tables = ref<Table[]>([])
let peakInfo = ref<PeakInfo>()
const disabled = ref(true)
let fileBlob: Blob

async function exportDatabase() {
  try {
    const blob = await exportDB(TestingDB, {
      prettyJson: true,
      progressCallback: progressCallback,
      filter: (table, value, key) => {
        return true
      }
    });

    if (userAgent.indexOf(' electron/') > -1) {
      electronDatabase.saveExportedDatabaseFile(blob)
    } else {
      console.log(blob)
      // 提供下载链接
    }

  } catch (error) {
    console.error('' + error);
  }
}

async function importDatabase() {
  console.log('importing...')
  // await TestingDB.delete();
  // await importDB(fileBlob, { progressCallback });
  // console.log("Import complete");

  // await showContent();
}

function progressCallback(progress: ExportProgress): boolean {
  console.log(`Progress: ${progress.completedRows} of ${progress.totalRows} rows completed`);
  return progress.done
}

async function peakImportInfo(blob: any) {
  const importMeta = await peakImportFile(blob);

  peakInfo.value = {
    fileName: blob.name,
    databaseName: importMeta.data.databaseName,
    databaseVersion: importMeta.data.databaseVersion,
    tables: await Promise.all(importMeta.data.tables.map(async table => ({
      id: table.name,
      name: table.name,
      rawCount: table.rowCount,
    })))
  }
}

function ondragover(event: any) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

async function ondrop(ev: any) {
  ev.stopPropagation();
  ev.preventDefault();

  const file = ev.dataTransfer.files[0];
  try {
    if (!file) throw new Error(`Only files can be dropped here`);

    peakImportInfo(file)

    fileBlob = file
    disabled.value = false
  } catch (error) {
    console.error('' + error);
  }
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
  <div class="wrapper">
    <div class="export-wrapper">
      <div>Database name: {{ TestingDB.name }}</div>
      <ul>
        <li v-for="table in tables" :key="table.id">
          <span>Table: {{ table.id }} - Primary Key: {{ table.primKey }} - Row count: {{ table.count }}</span>
        </li>
      </ul>
      <BaseButton @click="exportDatabase">Export Database</BaseButton>
    </div>
    <div class="import-wrapper">
      <div id="dropzone" @dragover="ondragover" @drop="ondrop">Drop Dexie JSON file here.</div>
      <div>File name: {{ peakInfo?.fileName }}</div>
      <div>Database name: {{ peakInfo?.databaseName }}</div>
      <div>Database version: {{ peakInfo?.databaseVersion }}</div>
      <ul>
        <li v-for="table in peakInfo?.tables" :key="table.id">
          <span>Table: {{ table.name }} - Row count: {{ table.rawCount }}</span>
        </li>
      </ul>
      <BaseButton :disabled="disabled" @click="importDatabase">Import Database</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  height: auto;
}
.export-wrapper,
.import-wrapper {
  padding: 20px;
  /* border: 1px solid darkgray; */
  border-radius: 2px;
}
#dropzone {
  border: 2px dotted silver;
  border-radius: 6px;
  padding: 50px 20px;
  margin: 0 0 20px;
  text-align: center;
}
ul {
  padding: 0;
}
li {
  border: 1px solid darkgray;
  padding: 5px 10px;
  margin-top: -1px;
  list-style: none;
}
</style>