<script>
  export let object;
</script>

<li class="typeahead-result" on:mousedown>{object.label}</li>

<style>
  li.typeahead-result {
    color: var(--lightText);
    font-family: var(--font-family);
    list-style: none;
    border: 0.5px solid #d4d4d4;
    margin: 0;
    padding: 3px 4px;
    cursor: pointer;
    background-color: #fff;
    display: block;
  }
  li.typeahead-result:hover {
    background-color: lightgray;
  }

  @media only screen and (max-width: 400px) {
    li.typeahead-result {
        font-size: var(--font-size-s-s);
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px) {
    li.typeahead-result {
        font-size: var(--font-size-m-s);
    }
  }
  @media only screen and (min-width: 700px) {
    li.typeahead-result {
        font-size: var(--font-size-l-s);
    }
  }
</style>
