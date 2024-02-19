<script>
  export let tab;

  function onChange(event) {
    tab = event.currentTarget.value;
  }
</script>

<div class="segmented-control view">
  <input
    type="radio"
    id="activity"
    name="tab"
    value="activity"
    on:change={onChange}
    checked
  />
  <label for="activity">Activity</label>

  <input
    type="radio"
    id="stats"
    name="tab"
    value="stats"
    on:change={onChange}
  />
  <label for="stats">Stats</label>
</div>

<style>
  .segmented-control {
    display: flex;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .segmented-control label {
    flex: 1;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  .segmented-control input {
    display: none;
  }

  /* Styling for selected segment */
  .segmented-control input:checked + label {
    background-color: #007bff;
    color: #fff;
  }
</style>
