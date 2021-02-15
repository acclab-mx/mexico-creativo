import animejs from 'animejs'

const animate = (el) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 60000,
    })
    .add({
      targets: el,
      translateY: 120,
      translateX: 40,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 200,
      translateX: 180,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 150,
      translateX: 550,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 20,
      translateX: 450,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 0,
      translateX: 0,
      easing: 'linear',
    })
}

export default animate
