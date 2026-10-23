import { useState, useEffect, useCallback } from 'react'

export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback(
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    [query]
  )

  const [matches, setMatches] = useState(getMatches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)')
}

export function useIsTablet(): boolean {
  const isTabletUp = useMediaQuery('(min-width: 768px)')
  const isDesktopUp = useMediaQuery('(min-width: 1024px)')
  return isTabletUp && !isDesktopUp
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
