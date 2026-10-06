import { describe, expect, it } from 'vitest'

import {
  normalizeArticleContent,
  normalizeParagraphs,
} from './normalizeArticleContent'

describe('normalizeArticleContent', () => {
  it('splits markdown headings into sections', () => {
    const sections = normalizeArticleContent('# A\nfirst\n## B\nsecond')

    expect(sections).toEqual([
      { heading: 'A', paragraphs: [{ type: 'text', text: 'first' }] },
      { heading: 'B', paragraphs: [{ type: 'text', text: 'second' }] },
    ])
  })

  it('groups consecutive dash lines into a single list', () => {
    const [section] = normalizeArticleContent('# Line-up\nheadliners:\n- A\n- B')

    expect(section.paragraphs).toEqual([
      { type: 'text', text: 'headliners:' },
      { type: 'list', items: ['A', 'B'] },
    ])
  })

  it('keeps content without a heading as one headingless section', () => {
    const sections = normalizeArticleContent('just a paragraph')

    expect(sections).toHaveLength(1)
    expect(sections[0].heading).toBeUndefined()
    expect(sections[0].paragraphs).toEqual([
      { type: 'text', text: 'just a paragraph' },
    ])
  })

  it('returns no sections for empty or whitespace-only content', () => {
    expect(normalizeArticleContent('')).toEqual([])
    expect(normalizeArticleContent('   \n  \n')).toEqual([])
  })

  it('accepts section arrays and falls back across field names', () => {
    const sections = normalizeArticleContent([
      { title: 'From title', body: 'from body' },
      { heading: 'From heading', text: 'from text' },
    ])

    expect(sections).toEqual([
      { heading: 'From title', paragraphs: [{ type: 'text', text: 'from body' }] },
      { heading: 'From heading', paragraphs: [{ type: 'text', text: 'from text' }] },
    ])
  })
})

describe('normalizeParagraphs', () => {
  it('unwraps nested objects and arrays', () => {
    expect(normalizeParagraphs([{ content: 'one' }, 'two'])).toEqual([
      { type: 'text', text: 'one' },
      { type: 'text', text: 'two' },
    ])
  })

  it('returns nothing when called with no value', () => {
    expect(normalizeParagraphs()).toEqual([])
  })
})
