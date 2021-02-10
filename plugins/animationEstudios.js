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
            M 165, 190
              C 170, 200 200, 230 290, 200
              310, 190 310, 180 290, 150
              270, 120 260, 150 230, 130
              190, 100 150, 150 165, 190
          `,
          `
            M 185, 200
              C 240, 200 200, 240 270, 230
              300, 220 300, 200 290, 150
              290, 100 260, 140 180, 145
              160, 140 140, 200 185, 200
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
            M 185, 200
              C 240, 200 200, 240 270, 230
              300, 220 300, 200 290, 150
              290, 100 260, 140 180, 145
              160, 140 140, 200 185, 200
          `,
          `
            M 240, 220
              C 290, 230 270, 200 290, 170
              300, 145 290, 190 290, 140
              290, 120 260, 80 220, 130
              180, 160 150, 240 240, 220
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
            M 240, 220
              C 290, 230 270, 200 290, 170
              300, 145 290, 190 290, 140
              290, 120 260, 80 220, 130
              180, 160 150, 240 240, 220
          `,
          `
            M 165, 190
              C 170, 200 200, 230 290, 200
              310, 190 310, 180 290, 150
              270, 120 260, 150 230, 130
              190, 100 150, 150 165, 190
          `,
        ],
      },
      easing: 'linear',
    })
}

export default animate
