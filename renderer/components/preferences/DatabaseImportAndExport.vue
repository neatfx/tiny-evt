<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AppDB } from '@/db'
import BaseButton from '@comps/BaseButton.vue';
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
    const blob = await exportDB(AppDB, {
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
      let a = document.createElement('a')
      // 指定生成的文件名
      a.download = 'db-exported.json'
      a.href = URL.createObjectURL(blob)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

  } catch (error) {
    console.error('' + error);
  }
}

async function importDatabase() {
  console.log('importing...')
  // await AppDB.delete();
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
  tables.value = await Promise.all(AppDB.tables.map(async table => ({
    id: table.name,
    name: table.name,
    count: await table.count(),
    primKey: table.schema.primKey.src
  })));
}

function enableScheduledBackup() {
  
}

function enableOnlineBackup() {
  
}

function switchImagePersisWay() {
  
}

function setImagesDir() {
  
}

onMounted(async () => {
  await showContent()
})
</script>

<template>
  <div class="wrapper">
    <div class="export-wrapper">
      <div>Database name: {{ AppDB.name }}</div>
      <ul>
        <li v-for="table in tables" :key="table.id">
          <span>Table: {{ table.id }} - Primary Key: {{ table.primKey }} - Row count: {{ table.count }}</span>
        </li>
      </ul>
      <BaseButton @click="exportDatabase">导出数据库</BaseButton>
      <BaseButton @click="enableScheduledBackup">定时备份数据</BaseButton>
      <BaseButton @click="enableOnlineBackup">网络备份设置(GitHub)</BaseButton>
      <BaseButton @click="switchImagePersisWay">图片保存方式(APP 模式可见)</BaseButton>
      <BaseButton @click="setImagesDir">图片存储目录设置</BaseButton>
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