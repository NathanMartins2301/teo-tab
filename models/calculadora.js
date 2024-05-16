function somar(arg1, arg2) {
  if (typeof arg1 === 'string' || typeof arg2 === 'string') return 'Error'
  if (arg1.lenght < 0 || arg2.lenght < 0) return 'Error'
  return arg1 + arg2
}

exports.somar = somar
