<script>
    import Objects from "./Objects.svelte"
    export let data;
    export let currentCountry
    export let searched;
    export let tooltipVisible;

    let results = [];
    let searchInput = "";
    let isFocused = false;
   
    const onFocus = () => isFocused=true;
    const onBlur = () => isFocused=false;
       
    const typeahead = () => {
        let resultsIncludes = data.filter(d => d.label.toLowerCase().includes(searchInput.toLowerCase()) )
        let resultsStartWith = data.filter(d => d.label.toLowerCase().startsWith(searchInput.toLowerCase()) )
        results = resultsStartWith.sort().concat(resultsIncludes.sort())
        results = [...new Set(results)]
    }
       
    const newSearchInput = (oneResult) => {
        searchInput = oneResult.label
        currentCountry = oneResult.iso3c
        searched = true;
        tooltipVisible = true;
    }
   
 </script>
   
   <div class="typeahead">
     <input id="searchfield" type="text" name="searchfield" placeholder="Search country" bind:value={searchInput} on:input={typeahead} on:focus={onFocus} on:blur={onBlur}> 
   </div>
   {#if searchInput.length > 1}
   <ul class="typeahead-object-list" >
     {#if isFocused === true}
       {#if searchInput.length === 0}
         {#each data as oneResult}
           <Objects object={oneResult} on:mousedown={() => newSearchInput(oneResult)} />
         {/each}
       {:else}
         {#each results as oneResult}
           <Objects object={oneResult} on:mousedown={() => newSearchInput(oneResult)} />
         {/each}
       {/if}
     {/if}
   </ul>
   {/if}
 
 <style>
 .typeahead {
   position: absolute;
   top: 0px;
   left: 0px;
 }
 input{
    box-shadow: 2px 2px 2px rgb(from var(--darkest) R G B / 0.15);
 }
 input[type=text] {
    height: 1.2rem;
   width: 160px;
   display: block;
   border: 1px solid var(--middle);
   border-radius: 1px;
   transition: width 0.4s ease-in-out;
 }
 input[type=text]:focus {
     background-color: whitesmoke;
     outline: none;
     width: 160px;
   }
 ul {
   max-height: 215px;
   overflow: auto;
 }
 
 ul.typeahead-object-list {
   position: absolute;
   left: 0px;
   top: 12px;
   padding:0;
   width:200px;
   z-index: 99;
   background-color: #ffffff;
 }
   </style>