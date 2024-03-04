<script>
  import { onMount } from "svelte";
  import EditIcon from "../../icon/editIcon.svelte";
  import { dataStoreInstance } from "../../store/dataStore";
  import { withDbOperation } from "../../db/db";
  import { db } from "../../store/store";
  import CloseIcon from "../../icon/closeIcon.svelte";
  import DeleteIcon from "../../icon/deleteIcon.svelte";

  let donotShowCheckbox = false;

  export let id;

  let dialog;
  onMount(() => {
    dialog = document.getElementById("confirmation-dialog");
  });

  const handleDeleteRow = async () => {
    if (donotShowCheckbox) {
      localStorage.setItem("donotShow", "true");
    }

    await withDbOperation($db, "delete", id).then(() => {
      dataStoreInstance.dispatch({ type: "delete", obj: id });

      handleCancel();
    });
  };

  const handleCancel = () => {
    const tableRow = document.getElementById("log-" + id);
    tableRow.classList.toggle("blink");
    dialog.close();
  };
</script>

<dialog id="confirmation-dialog">
  <header class="dlg-header">
    <h4 style={"margin-top:3px;margin-left:3px;"}>Confirmation!</h4>
    <button
      style={"border:transparent;background:transparent;"}
      on:click={handleCancel}><CloseIcon /></button
    >
  </header>
  <main class="div-padding">
    <p>Do you want to delete the log?</p>

    <label class="dlg-label"
      ><input
        class="dlg-input"
        type="checkbox"
        name="checkbox"
        bind:value={donotShowCheckbox}
      /> Don't show again</label
    >
  </main>
  <footer class="dlg-footer">
    <button class="dlg-footer-btn save" on:click={handleDeleteRow}>
      <DeleteIcon /> Yes, Delete</button
    >
    <button class="dlg-footer-btn cancel" on:click={handleCancel}>
      <CloseIcon />Cancel</button
    >
  </footer>
</dialog>
