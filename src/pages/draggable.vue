<script lang="ts" setup>
function handleDrag() {
  const oDragContainer = document.querySelector('#drag-container') as HTMLDivElement
  const oDragItems = oDragContainer.children

  let oCurrentSelection: HTMLDivElement
  let oDraggableItemRectMap: Map<HTMLDivElement, DOMRect> = new Map()

  useEventListener(oDragContainer, 'dragstart', (event: DragEvent) => {
    const target = event.target as HTMLDivElement
    oCurrentSelection = target
    computeDragableItemRect()
    setTimeout(() => target.classList.add('moving'), 0);
    event.dataTransfer!.effectAllowed = 'move'
  })

  useEventListener(oDragContainer, 'dragend', (event: DragEvent) => {
    (event.target as HTMLElement).classList.remove('moving')
  })

  useEventListener(oDragContainer, 'dragover', (event: DragEvent) => {
    event.preventDefault()
  })

  useEventListener(oDragContainer, 'dragenter', (event: DragEvent) => {
    event.preventDefault()
    if (event.target === oDragContainer || event.target === oCurrentSelection) {
      return
    }

    const target = event.target as HTMLDivElement

    const dragItemArr = Array.from(oDragItems)
    const targetIndex = dragItemArr.indexOf(target)
    const sourceIndex = dragItemArr.indexOf(oCurrentSelection)
    if (sourceIndex < targetIndex) {
      oDragContainer.insertBefore(oCurrentSelection, target.nextElementSibling)
    } else {
      oDragContainer.insertBefore(oCurrentSelection, target)
    }

    handleDragAnimation([target, oCurrentSelection])
  })

  function computeDragableItemRect() {
    oDraggableItemRectMap.clear()
    Array.from(oDragItems).map((item) => oDraggableItemRectMap.set(item as HTMLDivElement, item.getBoundingClientRect()))
  }

  function handleDragAnimation(elements: HTMLDivElement[]) {
    for (const el of elements) {
      const { left, top } = el.getBoundingClientRect()
      const beforceElEect = oDraggableItemRectMap.get(el)

      el.style.transform = `translate3d(${beforceElEect!.left - left}px,${beforceElEect!.top - top}px,0px)`

      const refId = requestAnimationFrame(() => {
        el.style.transition = 'transform 0.3s ease-out'
        el.style.transform = 'none'
      })

      useEventListener(el, 'transitionend', () => {
        el.style.transition = 'none'
        cancelAnimationFrame(refId)
      })
    }
  }
}

onMounted(() => {
  handleDrag()
})
</script>

<template>
  <div id="drag-container" color-white w-full h-full items-center justify-center gap-4 flex="~ col">
    <div draggable="true" bg-red>
      <i rounded-full w-3 h-3 mr-2 bg-white />
      Red
    </div>
    <div draggable="true" bg-yellow>
      <i rounded-full w-3 h-3 mr-2 bg-white />
      Yellow
    </div>
    <div draggable="true" bg-amber-8>
      <i rounded-full w-3 h-3 mr-2 bg-white />
      Amber - 8
    </div>
    <div draggable="true" bg-green>
      <i rounded-full w-3 h-3 mr-2 bg-white />
      Green
    </div>
    <div draggable="true" bg-blue>
      <i rounded-full w-3 h-3 mr-2 bg-white />
      Blue
    </div>
  </div>
</template>

<style scoped>
#drag-container div {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  padding: 5px 10px;

  display: flex;
  align-items: center;
}

#drag-container .moving {
  background-color: transparent;
  border: 2px dashed #ccc;
}
</style>
