export function normalizeArticleContent(content) {
  if (Array.isArray(content)) {
    return content.map((section) => ({
      heading: section.heading ?? section.title,
      paragraphs: normalizeParagraphs(
        section.body ??
          section.content ??
          section.paragraphs ??
          section.description ??
          section.text,
      ),
    }))
  }

  const lines = String(content)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const sections = []
  let currentSection = { paragraphs: [] }
  let currentBodyLines = []

  lines.forEach((line) => {
    const heading = line.match(/^#{1,6}\s+(.+)$/)

    if (heading) {
      if (currentBodyLines.length > 0 || currentSection.heading) {
        sections.push({
          ...currentSection,
          paragraphs: normalizeParagraphs(currentBodyLines.join('\n')),
        })
      }

      currentSection = { heading: heading[1] }
      currentBodyLines = []
      return
    }

    currentBodyLines.push(line)
  })

  if (currentBodyLines.length > 0 || currentSection.heading) {
    sections.push({
      ...currentSection,
      paragraphs: normalizeParagraphs(currentBodyLines.join('\n')),
    })
  }

  return sections
}

export function normalizeParagraphs(value = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeParagraphs(item))
  }

  if (value && typeof value === 'object') {
    return normalizeParagraphs(
      value.body ??
        value.content ??
        value.description ??
        value.text ??
        value.paragraph,
    )
  }

  const lines = String(value)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const paragraphs = []
  let listItems = []

  lines.forEach((line) => {
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2))
      return
    }

    if (listItems.length > 0) {
      paragraphs.push({ type: 'list', items: listItems })
      listItems = []
    }

    paragraphs.push({ type: 'text', text: line })
  })

  if (listItems.length > 0) {
    paragraphs.push({ type: 'list', items: listItems })
  }

  return paragraphs
}
