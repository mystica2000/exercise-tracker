<script>
  import EditIcon from "../../icon/editIcon.svelte";
  import { curTarget } from "../../store/store";
  import EditDialog from "../dialogs/editDialog.svelte";

  const handleEditTarget = () => {
    const dialog = document.getElementById("edit-dialog");
    dialog["showModal"]();
  };
</script>

<p style="display: flex;">
  Your current Target: {$curTarget}
  <button
    style={"border:transparent;background:transparent;display: flex;align-items: center;"}
    on:click={handleEditTarget}><EditIcon /></button
  >
</p>

<EditDialog />
