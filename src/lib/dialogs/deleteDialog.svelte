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
  <header class="header">
    <p style={"margin-top:3px;"}>Confirmation!</p>
    <button
      style={"border:transparent;background:transparent;"}
      on:click={handleCancel}><CloseIcon /></button
    >
  </header>
  <div class="div-padding">
    <p>Do you want to delete the log?</p>

    <label style={"display:inline-block;"}
      ><input type="checkbox" name="checkbox" bind:value={donotShowCheckbox} /> Don't
      show again</label
    >
    <div class="space-between fill">
      <button class="btn btn-success" on:click={handleDeleteRow}>
        <DeleteIcon /> Yes, Delete</button
      >
      <button class="btn btn-danger" on:click={handleCancel}>
        <CloseIcon />Cancel</button
      >
    </div>
  </div>
</dialog>

<style>
  dialog {
    min-width: 250px;
    width: 100%;
    max-width: 500px;
    z-index: 2;
  }

  dialog {
    border-radius: 5px;
    border-width: 1px;
    transition: all 2s;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  dialog::backdrop {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
    animation: fade-in 1s;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .div-padding {
    padding: 15px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 0fr;
    background-color: #8fc6ff;
    padding: 4px;
  }
</style>
