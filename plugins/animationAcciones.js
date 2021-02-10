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

  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 3000,
    })
    .add({
      targets: el,
      d: {
        value: [
          `
            M 480, 400
              C 480, 330 580, 350 600, 370
              740, 420 600, 500 580, 480
              550, 460 520, 500 500, 460
              474, 430 480, 380 480, 400
          `,
          `
            M 520, 380
              C 580, 330 600, 390 620, 390
              680, 440 660, 460 620, 480
              600, 500 560, 490 520, 490
              440, 460 460, 460 520, 380
          `,
        ],
      },
      easing: 'linear',
    })
    .add({
      targets: el,
      d: {
        value: [
          `
            M 520, 380
              C 580, 330 600, 390 620, 390
              680, 440 660, 460 620, 480
              600, 500 560, 490 520, 490
              440, 460 460, 460 520, 380
          `,
          `
            M 480, 400
              C 480, 330 580, 350 600, 370
              740, 420 600, 500 580, 480
              550, 460 520, 500 500, 460
              474, 430 480, 380 480, 400
          `,
        ],
      },
      easing: 'linear',
    })
}

export default animate
