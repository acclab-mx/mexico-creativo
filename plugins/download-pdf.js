import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'

const baseUrl = process.client ? location.origin : ''

console.log('baseURL: ', baseUrl)

const fonts = {
  OpenSans: {
    normal: `${baseUrl}/fonts/OpenSans-Regular.ttf`,
    bold: `${baseUrl}/fonts/OpenSans-Bold.ttf`,
  },
}

const download = (
  filename,
  { title, image = null, description, links, pills, cardLink }
) => {
  pdfMake
    .createPdf(
      {
        content: [
          {
            text: title,
            fontSize: 18,
            bold: true,
          },
          {
            image: 'cover',
            width: 520,
            margin: [0, 18, 0, 18],
          },
          {
            text: description,
          },
          {
            text: 'Enlaces:',
            margin: [0, 18, 0, 0],
            bold: true,
          },
          ...links?.map((link) => ({
            text: link,
            link,
            margin: [0, 4, 0, 0],
          })),
          ...pills?.reduce((acc, { name, value }) => {
            const values = [
              {
                text: name,
                margin: [0, 18, 0, 0],
                bold: true,
              },
            ]
            value?.map(({ label }) =>
              values.push({
                text: label,
                margin: [0, 4, 0, 0],
              })
            )
            return [acc, ...values]
          }, []),
          {
            text: cardLink,
            link: cardLink,
            fontSize: 8,
            margin: [0, 18, 0, 0],
          },
        ],
        images: {
          cover: image,
        },
        defaultStyle: {
          font: 'OpenSans',
        },
      },
      null,
      fonts
    )
    .download(filename)
}

export default download
