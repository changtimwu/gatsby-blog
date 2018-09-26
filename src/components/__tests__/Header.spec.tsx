import 'jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import lunr from 'lunr'
import { Header } from '../Header'

function setupLunr(store: SearchStore): void {
  // tslint:disable no-object-mutation
  ;(global as any).__LUNR__ = {
    en: {
      index: lunr(function() {
        this.field('path')
        this.field('title')
        Object.entries(store).map(([id, document]) => this.add({ id, ...document }))
      }),
      store
    }
  }
  // tslint:enable no-object-mutation
}

function cleanupLunr(): void {
  // tslint:disable no-object-mutation no-delete
  delete (global as any).__LUNR__
  // tslint:enable no-object-mutation no-delete
}

describe('Header', () => {
  beforeEach(cleanup)
  beforeEach(cleanupLunr)

  it('allows searching', () => {
    setupLunr({
      '1': { path: '/1', title: 'Number One' },
      '2': { path: '/2', title: 'Number Two' }
    })

    const { getByText, queryByText, container } = render(<Header />)
    const input = container.querySelector('[type="search"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'two' } })

    expect(queryByText('Number One')).not.toBeInTheDocument()
    expect(getByText('Number Two')).toHaveAttribute('href', '/2')
  })
})