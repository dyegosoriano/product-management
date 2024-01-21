import { describe, expect, it } from 'vitest'

import { handleInstallment, IHandleInstallment } from './index'

describe('handleInstallment', () => {
  it('calculates the installment value correctly', () => {
    const data: IHandleInstallment = {
      product_value: 1000,
      installments: 10,
      percentage: 0.1
    }

    const result = handleInstallment(data)
    const expectedResult = 162.75

    console.log({ expectedResult, result })

    expect(result).toBeCloseTo(expectedResult, 2)
  })
})
