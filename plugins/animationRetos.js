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

  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 6000,
    })
    .add({
      targets: el,
      d: {
        value: [
          `
            M 620, 160
              C 640, 120 640, 160 660, 140
              700, 100 720, 170 724, 160
              720, 160 740, 190 680, 210
              620, 220 600, 200 620, 160
          `,
          `
            M 660, 140
              C 660, 140 700, 160 700, 160
              730, 190 740, 190 730, 210
              730, 200 720, 220 680, 210
              590, 270 640, 100 660, 140
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
            M 660, 140
              C 660, 140 700, 160 700, 160
              730, 190 740, 190 730, 210
              730, 200 720, 220 680, 210
              590, 270 640, 100 660, 140
          `,
          `
            M 620, 160
              C 640, 120 640, 160 660, 140
              700, 100 720, 170 724, 160
              720, 160 740, 190 680, 210
              620, 220 600, 200 620, 160
          `,
        ],
      },
      easing: 'linear',
    })
}

export default animate
