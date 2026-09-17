/**
 * Konsta registers Tailwind's `dark` variant as a class-based variant
 * (`&:where(.dark, .dark *)`), so dark styles need a `.dark` class rather than
 * a `prefers-color-scheme` media query. Keep that class in sync with the OS
 * setting so Konsta components and local `dark:` utilities switch together.
 */
const darkQuery = '(prefers-color-scheme: dark)'

function applyDarkClass(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}

export function watchColorScheme() {
  const media = window.matchMedia(darkQuery)
  applyDarkClass(media.matches)

  const handleChange = (event: MediaQueryListEvent) => applyDarkClass(event.matches)
  media.addEventListener('change', handleChange)

  return () => media.removeEventListener('change', handleChange)
}
