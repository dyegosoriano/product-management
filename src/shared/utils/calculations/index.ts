export type IHandleInstallment = {
  product_value: number
  installments: number
  percentage: number
}

export const handleInstallment = ({ product_value, installments, percentage }: IHandleInstallment): number => {
  const installment_value = (product_value * percentage) / (1 - Math.pow(1 + percentage, -installments))
  return +installment_value.toFixed(2)
}
