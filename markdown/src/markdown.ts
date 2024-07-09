export function h(level: number, ...text: string[]) {
  return `${"#".repeat(level)} ${text.join(" ")}`
}

export function h1(text: string) {
  return h(1, text)
}

export function h2(text: string) {
  return h(2, text)
}

export function h3(text: string) {
  return h(3, text)
}

function indentSubsequentLines(text: string, indent: number) {
  return text.split("\n").join(`\n${" ".repeat(indent)}`)
}

export function ul(items: string[]) {
  return `\n\n${items
    .map((item) => `- ${indentSubsequentLines(item, 2)}`)
    .join("\n")}\n`
}

export function ol(items: string[]) {
  const bullet = (i: number) => `${i + 1}.`
  return `\n${items
    .map(
      (item, i) =>
        `${bullet(i)} ${indentSubsequentLines(item, bullet(i).length + 1)}`
    )
    .join("\n")}\n`
}

export function p(text: string) {
  return `\n${text}\n`
}

export function hr() {
  return "\n---\n"
}

export function table(header: string[], rows: string[][]) {
  return `\n${header.join(" | ")}\n${header
    .map(() => "---")
    .join(" | ")}\n${rows.map((row) => row.join(" | ")).join("\n")}\n`
}

export function codeblock(code: string, language = "") {
  return `\n\`\`\`${language}\n${code}\n\`\`\`\n`
}

export function a(href: string, text: string) {
  if (!href) return text
  return `[${text}](${href})`
}

export function em(text: string) {
  return `*${text.replaceAll("\\", "\\\\").replaceAll("*", "\\*")}*`
}

export function strong(text: string) {
  return `**${text.replaceAll("\\", "\\\\").replaceAll("*", "\\*\\*")}**`
}

export function code(text: string) {
  return `\`${text.replaceAll("\\", "\\\\").replaceAll("`", "\\`")}\``
}
