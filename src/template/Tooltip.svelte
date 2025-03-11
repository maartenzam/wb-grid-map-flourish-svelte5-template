<script>
  import { computePosition, flip, shift, offset } from "@floating-ui/dom";

  let { visible, targetPos, placement = 'right', showBackground = true, children } = $props();

  let component;
  let lastTargetPos = { x: 0, y: 0 };
  
  let x = $derived(targetPos.x);
  let y = $derived(targetPos.y);

  $effect(() => {
    if (
    component &&
    targetPos &&
    (targetPos.x !== lastTargetPos.x || targetPos.y !== lastTargetPos.y)
  ) {
    lastTargetPos = { ...targetPos };

    const virtualTarget = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x,
          y,
          top: y,
          left: x,
          right: x,
          bottom: y,
        };
      },
    };

    computePosition(virtualTarget, component, {
      placement,
      middleware: [offset(24), flip(), shift({ padding: 5 })],
    }).then(({ x, y }) => {
      component.style.left = x + "px";
      component.style.top = y + "px";
    });
  }
  })
</script>

<div
  class="tooltip"
  class:visible
  class:background={showBackground === true}
  bind:this={component}
>
  {@render children?.()}
</div>

<style type="text/scss">
  .tooltip {
    display: none;
    position: absolute;
    z-index: 999999;
    min-width: 60px;
    max-width: 400px;
    pointer-events: none;
    background-color: #ffffff;
    box-shadow: 4px 4px 4px rgb(from var(--grey500) R G B / 0.15);
    border: 0.5px solid var(--grey200);

    &.visible {
      display: block;
    }
  }
  @media only screen and (max-width: 400px) {
    .tooltip {
        padding-top: var(--space-s-xxs);
        padding-bottom: var(--space-s-xxs);
        padding-left: var(--space-s-xs);
        padding-right: var(--space-s-xs);
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px){
    .tooltip {
        padding-top: var(--space-m-xxs);
        padding-bottom: var(--space-m-xxs);
        padding-left: var(--space-m-xs);
        padding-right: var(--space-m-xs);
    }
  }
  @media only screen and (min-width: 700px){
    .tooltip {
        padding-top: var(--space-l-xxs);
        padding-bottom: var(--space-l-xxs);
        padding-left: var(--space-l-xs);
        padding-right: var(--space-l-xs);
    }
  }
</style>
