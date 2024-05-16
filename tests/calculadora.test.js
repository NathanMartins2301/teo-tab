const calculadora = require('../models/calculadora')

test('should be sum 2 + 2 and result is 4', () => {
  const sum = calculadora.somar(2, 2)

  expect(sum).toBe(4)
})

test('should be sum 100 + 5 and result is 105', () => {
  const sum = calculadora.somar(100, 5)

  expect(sum).toBe(105)
})

test('somar banana + 100 deveria retornar Erro', () => {
  const sum = calculadora.somar('banana', 5)

  expect(sum).toBe('Error')
})

test('uma das variaveis estao vazia deve retornar Error', () => {
  const sum = calculadora.somar('', 5)
  console.log(sum)
  expect(sum).toBe('Error')
})
