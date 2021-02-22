import animejs from 'animejs'

const animate = (el, coords) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 60000,
    })
    .add({
      targets: el,
      y: coords.y + 120,
      x: coords.x + 40,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + 200,
      x: coords.x + 180,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + 150,
      x: coords.x + 550,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + 20,
      x: coords.x + 450,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + 0,
      x: coords.x + 0,
      easing: 'linear',
    })
}

export default animate
