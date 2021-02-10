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
      translateY: 60,
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

  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 4000,
    })
    .add({
      targets: el,
      d: {
        value: [
          `
            M 310, 340
              C 350, 320 400, 280 420, 350
              430, 365 470, 380 430, 410
              390, 440 340, 460 320, 400
              300, 380 280, 380 310, 340
          `,
          `
            M 320, 330
              C 330, 300 380, 290 430, 340
              450, 365 470, 440 420, 420
              400, 400 360, 410 300, 400
              290, 400 280, 380 320, 330
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
            M 320, 330
              C 330, 300 380, 290 430, 340
              450, 365 470, 440 420, 420
              400, 400 360, 410 300, 400
              290, 400 280, 380 320, 330
          `,
          `
            M 320, 350
              C 340, 340 380, 270 420, 350
              420, 350 480, 400 420, 430
              360, 460 360, 430 300, 385
              290, 360 290, 380 320, 350
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
            M 320, 350
              C 340, 340 380, 270 420, 350
              420, 350 480, 400 420, 430
              360, 460 360, 430 300, 385
              290, 360 290, 380 320, 350
          `,
          `
            M 310, 340
              C 350, 320 400, 280 420, 350
              430, 365 470, 380 430, 410
              390, 440 340, 460 320, 400
              300, 380 280, 380 310, 340
          `,
        ],
      },
      easing: 'linear',
    })
}

export default animate
