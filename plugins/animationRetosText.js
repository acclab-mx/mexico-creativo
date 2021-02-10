import animejs from 'animejs'

const animate = (el) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 7000,
    })
    .add({
      targets: el,
      translateY: 10,
      translateX: -220,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -80,
      translateX: -240,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 150,
      translateX: -300,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 0,
      translateX: -220,
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
