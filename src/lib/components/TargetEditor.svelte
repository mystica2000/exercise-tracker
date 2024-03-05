<script>
  import EditIcon from "../../icon/editIcon.svelte";
  import { curTarget } from "../../store/store";
  import EditDialog from "../dialogs/editDialog.svelte";

  const handleEditTarget = () => {
    const dialog = document.getElementById("edit-dialog");
    dialog["showModal"]();
  };
</script>

<h2 class="target">
  🎯 Your Current Target: {$curTarget}
  <button class="btn-edit" on:click={handleEditTarget} aria-label="Edit Target"
    ><EditIcon /></button
  >
</h2>

<EditDialog />

<style>
  .target {
    display: flex;
    border: 1px solid black;
    background: white;
    color: black;
    padding: 0.2em;
    margin-top: 1em;

    border-radius: 10px;
  }

  .btn-edit {
    background: salmon;
    display: flex;
    align-items: center;
    border: 1px solid black;
    margin-left: 5px;
    border-radius: 10px;
  }
</style>
