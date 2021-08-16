import { useEffect, useMemo, useCallback } from "react"

const debounce = (callback: () => void, delay: number): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}

type UseResponsiveViewportProps =
  | number
  | {
      readonly delay?: number
      readonly minWidth?: number
    }

const defaultProps: Required<UseResponsiveViewportProps> = {
  delay: 200,
  minWidth: 360,
}

export const useResponsiveViewport = (
  props: UseResponsiveViewportProps = defaultProps,
) => {
  const { delay, minWidth } = useMemo(() => {
    if (typeof props === "number") {
      return {
        ...defaultProps,
        minWidth: props,
      } as const
    }

    return { ...defaultProps, ...props }
  }, [props])

  const handler = useCallback(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    const width = document.documentElement.clientWidth
    const isFullfilled = width > minWidth
    const content = isFullfilled
      ? ["width=device-width"]
      : [`width=${minWidth}`, `maximum-scale=${width / minWidth}`]
    const currentContent = viewport && viewport.getAttribute("content")
    let target = content.join(",")

    if (viewport) {
      if (typeof currentContent === "string") {
        target = currentContent
          .split(",")
          .map((i) => i.trim())
          .filter((i) => !i.startsWith("width="))
          .filter((i) => !isFullfilled && !i.startsWith("maximum-scale"))
          .concat(content)
          .join(",")
      }

      viewport.setAttribute("content", target)
    }

    if (!viewport) {
      const head = document.getElementsByTagName("head")

      if (head.length > 0) {
        const createdViewport = document.createElement("meta")
        createdViewport.setAttribute("name", "viewport")
        createdViewport.setAttribute("content", target)

        head[0].appendChild(createdViewport)
      }
    }
  }, [minWidth])

  useEffect(() => {
    handler()

    const decbouncedHandler = debounce(handler, delay)

    window.addEventListener("resize", decbouncedHandler)
    window.addEventListener("orientationchange", decbouncedHandler)

    return () => {
      window.removeEventListener("resize", decbouncedHandler)
      window.removeEventListener("orientationchange", decbouncedHandler)
    }
  }, [])
}
