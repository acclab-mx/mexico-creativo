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
      x: coords.x + 260,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -180,
      x: coords.x + 440,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -250,
      x: coords.x + 300,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -120,
      x: coords.x + -30,
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
