const defaultExclude = ['.map', '.d.ts', 'tsconfig.build.tsbuildinfo'];

export default function hasNot(name: string, sub: string[] = defaultExclude): boolean {
    return sub.reduce((prev, curr) => prev && name.indexOf(curr) == -1, true);
}