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
      y: coords.y + -280,
      x: coords.x + 20,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -280,
      x: coords.x + -340,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -200,
      x: coords.x + -20,
      easing: 'linear',
    })
    .add({
      targets: el,
      y: coords.y + -120,
      x: coords.x + 10,
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
