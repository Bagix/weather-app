export function transformText(text: string): string {
  let newText = text.split('').join('')
  const letters = [
    'ą',
    'ć',
    'ę',
    'ł',
    'ń',
    'ó',
    'ś',
    'ź',
    'ż',
    'Ą',
    'Ć',
    'Ę',
    'Ł',
    'Ń',
    'Ó',
    'Ś',
    'Ź',
    'Ż'
  ]
  const replacement = [
    'a',
    'c',
    'e',
    'l',
    'n',
    'o',
    's',
    'z',
    'z',
    'A',
    'C',
    'E',
    'L',
    'N',
    'O',
    'S',
    'Z',
    'Z'
  ]

  for (let i = 0; i < letters.length; ++i) {
    newText = newText.replaceAll(letters[i], replacement[i])
  }

  return newText
}
