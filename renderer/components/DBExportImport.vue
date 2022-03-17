<script setup lang="ts">
import { onMounted } from 'vue'
//
// When document is ready, bind export/import funktions to HTML elements
//
onMounted(() => {
  document.addEventListener('DOMContentLoaded', () => {
    showContent().catch(err => console.error('' + err));
    const dropZoneDiv = document.getElementById('dropzone');
    const exportLink = document.getElementById('exportLink');

    // Configure exportLink
    exportLink.onclick = async () => {
      try {
        const blob = await db.export({ prettyJson: true, progressCallback });
        download(blob, "dexie-export.json", "application/json");
      } catch (error) {
        console.error('' + error);
      }
    };

    // Configure dropZoneDiv
    dropZoneDiv.ondragover = event => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    };

    // Handle file drop:
    dropZoneDiv.ondrop = async ev => {
      ev.stopPropagation();
      ev.preventDefault();

      // Pick the File from the drop event (a File is also a Blob):
      const file = ev.dataTransfer.files[0];
      try {
        if (!file) throw new Error(`Only files can be dropped here`);
        console.log("Importing " + file.name);
        await db.delete();
        db = await Dexie.import(file, {
          progressCallback
        });
        console.log("Import complete");
        await showContent();
      } catch (error) {
        console.error('' + error);
      }
    }
  });
})

function progressCallback({ totalRows, completedRows }) {
  console.log(`Progress: ${completedRows} of ${totalRows} rows completed`);
}

async function showContent() {
  const tbody = document.getElementsByTagName('tbody')[0];

  const tables = await Promise.all(db.tables.map(async table => ({
    name: table.name,
    count: await table.count(),
    primKey: table.schema.primKey.src
  })));
  tbody.innerHTML = `
    <tr>
      <th>Database Name</th>
      <td colspan="2">${db.name}</th>
    </tr>
    ${tables.map(({ name, count, primKey }) => `
      <tr>
        <th>Table: "${name}"</th>
        <td>Primary Key: ${primKey}</td>
        <td>Row count: ${count}</td>
      </tr>`)}
  `;
}
</script>

<template>
  <div class="column">
    <p>
      <a id="exportLink" href="#">Click here to export the database</a>
    </p>
    <div id="dropzone">Drop dexie export JSON file here</div>
  </div>
  <div class="column">
    <h3>Database Info</h3>
    <table border="1">
      <thead></thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<style scoped>
div.column {
  float: left;
  margin: 12px;
}
#dropzone {
  width: 600px;
  height: 20px;
  border: 2px dotted #bbb;
  border-radius: 10px;
  padding: 35px;
  color: #bbb;
  text-align: center;
}
table {
  text-align: left;
}
</style>