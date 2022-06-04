export const printLine = (text: string, breakLine = true) => {
  process.stdout.write(text + (breakLine ? '\n' : ''))
}

const readLine = async () => {
  const input: string = await new Promise((resolve) => {
    process.stdin.once('data', (data) => resolve(data.toString()))
  })
  return input.trim()
}

export const promptInput = async (text: string) => {
  printLine(`\n${text}\n`, false)
  return readLine()
}

export const promptSelect = async <T extends string>(text: string, values: readonly T[]): Promise<T> => {
  printLine(`\n${text}`)
  values.forEach((value) => {
    printLine(`- ${value}`)
  })
  printLine('> ', false)

  const input = (await readLine()) as T
  if (values.includes(input)) {
    return input
  } else {
    return promptSelect(text, values)
  }
}
