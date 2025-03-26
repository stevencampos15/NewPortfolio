"use client"

import { useEffect, useRef, useState } from "react"

export function useInView(options?: IntersectionObserverInit): [boolean, (node: Element | null) => void] {
  const [ref, setRef] = useState<Element | null>(null)
  const [isInView, setIsInView] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (ref) {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        {
          threshold: 0.1,
          ...options,
        },
      )

      observerRef.current.observe(ref)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref, options])

  const setNodeRef = (node: Element | null) => {
    setRef(node)
  }

  return [isInView, setNodeRef]
}

