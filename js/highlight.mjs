const BOLD_KEYWORDS = [
    "abstract",
    "as",
    "bool",
    "break",
    "byte",
    "case",
    "catch",
    "char",
    "public",
    "private",
    "protected",
    "class",
    "const",
    "continue",
    "decimal",
    "default",
    "delegate",
    "do",
    "double",
    "else",
    "enum",
    "while",
    "export",
    "import",
    "let",
    "string",
    "function",
    "type",
    "interface",
    "for",
    "if",
    "in",
    "int",
    "is",
    "long",
    "namespace",
    "new",
    "null",
    "object",
    "module",
    "select",
    "from",
    "var",
    "void",
    "return",
    "async",
    "await",
    "=>",
    "export",
    "map",
    "forEach"
]

export const highlight = (text) => {
    BOLD_KEYWORDS.forEach((keyword) => {
        const regexStr = '([^\\w]{1})(' + keyword + ')([^\\w]{1})'
        const regex = new RegExp(regexStr, 'g');
        text = text.replaceAll(regex, '$1<b>$2</b>$3');
    })
    return text
}
