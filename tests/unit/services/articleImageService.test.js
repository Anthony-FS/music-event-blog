import { describe, expect, it } from 'vitest'

import { validateArticleImage } from '@/services/articleImageService'

function fileOfSize(bytes, type = 'image/jpeg') {
  const file = new File(['x'], 'thumbnail.jpg', { type })
  Object.defineProperty(file, 'size', { value: bytes })
  return file
}

describe('validateArticleImage', () => {
  it('accepts a small JPG', () => {
    expect(() => validateArticleImage(fileOfSize(1024))).not.toThrow()
  })

  it('rejects a missing file', () => {
    expect(() => validateArticleImage(null)).toThrow('Please select an image.')
  })

  it('rejects an unsupported type', () => {
    expect(() => validateArticleImage(fileOfSize(1024, 'image/svg+xml'))).toThrow(
      'Use a JPG, PNG, WebP, or GIF image.',
    )
  })

  it('rejects anything over 5 MB', () => {
    expect(() => validateArticleImage(fileOfSize(5 * 1024 * 1024 + 1))).toThrow(
      'The image must be 5 MB or smaller.',
    )
    expect(() => validateArticleImage(fileOfSize(5 * 1024 * 1024))).not.toThrow()
  })
})
