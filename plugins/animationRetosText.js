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
      y: coords.y + 10,
      x: coords.x + -220,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -80,
      x: coords.x + -240,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + 150,
      x: coords.x + -300,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + 0,
      x: coords.x + -220,
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
