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
      translateY: 10,
      translateX: 260,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -180,
      translateX: 440,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -250,
      translateX: 300,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -120,
      translateX: -30,
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
