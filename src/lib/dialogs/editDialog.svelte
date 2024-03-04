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
  <header class="dlg-header">
    <h4 style={"margin-top:3px;margin-left:3px"}>Edit Target</h4>
    <button
      style={"border:transparent;background:transparent;"}
      on:click={handleCancel}><CloseIcon /></button
    >
  </header>
  <main class="div-padding">
    <label class="dlg-label"
      >Set your target<input
        class="dlg-input"
        type="number"
        bind:value={newTarget}
      /></label
    >
  </main>
  <footer class="dlg-footer">
    <button class="dlg-footer-btn save" on:click={handleSaveTarget}
      ><SaveIcon /> Save
    </button>
    <button class="dlg-footer-btn cancel" on:click={handleCancel}
      ><CloseIcon /> Cancel</button
    >
  </footer>
</dialog>
