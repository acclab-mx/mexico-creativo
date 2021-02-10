import animejs from 'animejs'

const animate = (el) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 3600,
    })
    .add({
      targets: el,
      translateY: -280,
      translateX: 20,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -280,
      translateX: -340,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -200,
      translateX: -20,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: -120,
      translateX: 10,
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
