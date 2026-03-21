type SoftwareTagType = 'javascript' | 'svelte' | 'dotnet' | 'blazor' | 'figma' | 'docker'
export const softwareTagColors: Record<SoftwareTagType, string> = {
	"javascript": "#a28349",
	"svelte": "#95320b",
	"dotnet": "#2F51D8",
	"blazor": "#5C2C91",
	"figma": "#006f5a",
	"docker": "#00589B",
}

type PostTagType = 'programming' | 'terminal' | 'mac' | 'history' | 'misc'
export const postTagColors: Record<PostTagType, string> = {
	programming: 'var(--color-secondary)',
	terminal: 'var(--color-desaturated)',
	mac: 'var(--color-secondary-alt)',
	history: 'var(--color-quad)',
	misc: 'var(--color-primary)'
}