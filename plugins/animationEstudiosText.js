import animejs from 'animejs'

const animate = (el) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 5000,
    })
    .add({
      targets: el,
      translateY: 150,
      translateX: 40,
      easing: 'linear',
    })
    .add({
      targets: el,
      translateY: 250,
      translateX: 150,
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
