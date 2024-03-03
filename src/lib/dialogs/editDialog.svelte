<script>
  import { onMount } from "svelte";
  import EditIcon from "../../icon/editIcon.svelte";
  import { curTarget } from "../../store/store";
  import CloseIcon from "../../icon/closeIcon.svelte";
  import SaveIcon from "../../icon/saveIcon.svelte";

  let newTarget = 0;

  let dialog;
  onMount(() => {
    newTarget = $curTarget;
    dialog = document.getElementById("edit-dialog");
  });

  const handleSaveTarget = async () => {
    $curTarget = newTarget;
    handleCancel();
  };

  const handleCancel = () => {
    dialog.close();
  };
</script>

<dialog id="edit-dialog">
  <header class="header">
    <p style={"margin-top:3px;"}>Edit Target</p>
    <button
      style={"border:transparent;background:transparent;"}
      on:click={handleCancel}><CloseIcon /></button
    >
  </header>
  <div class="div-padding">
    <label style={"display:inline-block;"}
      ><input type="number" bind:value={newTarget} />Set your target</label
    >
    <div class="space-between fill">
      <button class="btn btn-success" on:click={handleSaveTarget}
        ><SaveIcon /> Save
      </button>
      <button class="btn btn-danger" on:click={handleCancel}
        ><CloseIcon /> Cancel</button
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
