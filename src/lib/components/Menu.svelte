<script>
  import MoreIcon from "../../icon/moreIcon.svelte";
  import Delete from "../dialogs/delete.svelte";
  import Edit from "../dialogs/edit.svelte";

  import Dialog from "../dialogs/edit.svelte";
  let dialog;

  let isMenuOpen = false;
  const handleMoreIcon = () => {
    isMenuOpen = !isMenuOpen;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      isMenuOpen = !isMenuOpen;
      event.preventDefault();
    }
  };
</script>

<div class="relative">
  <button
    on:click={handleMoreIcon}
    on:keypress={handleKeyPress}
    aria-haspopup="true"
    aria-expanded={isMenuOpen}
  >
    <MoreIcon />
  </button>
  {#if isMenuOpen}
    <ul class="menu-absolute">
      <li
        on:click={() => {
          dialog.showModal();
        }}
      >
        Edit
      </li>
      <li>Delete</li>
    </ul>
  {/if}
</div>

<Edit bind:dialog />

<style>
  li {
    list-style: none;
  }

  .relative {
    position: relative;
    width: fit-content;
  }

  .menu-absolute {
    position: absolute;
    z-index: 2;
    background-color: black;
    right: 0;
    padding: 1em;
  }
</style>
