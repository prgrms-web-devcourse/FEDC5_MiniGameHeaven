const $ = document;

export default function EventParser({ $target, isPlaying }) {
  const dragged = {
    el: null,
    class: null,
    index: null,
  };

  $target.addEventListener('dragstart', e => {
    if (!isPlaying) {
      return;
    }
    const $object = e.target;
    dragged.el = $object;
    dragged.class = $object.className;
    dragged.index = [...$object.parentNode.children].indexOf($object);
  });

  $target.addEventListener('dragover', e => {
    e.preventDefault();
    //   console.log('over');
  });

  $target.addEventListener('drop', e => {
    if (!isPlaying) {
      return;
    }
    const $object = e.target;
    //   console.log({ $object });

    if ($object.className !== dragged.class) {
      let originPlace;
      let isLast = false;

      if (dragged.el.nextSibling) {
        originPlace = dragged.el.nextSibling;
      } else {
        originPlace = dragged.el.previousSibling;
        isLast = true;
      }

      const droppedIndex = [...$object.parentNode.children].indexOf($object);
      dragged.index > droppedIndex ? $object.before(dragged.el) : $object.after(dragged.el);
      isLast ? originPlace.after($object) : originPlace.before($object);
    }
  });
}
