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

    const content =
      window.outerWidth > minWidth ? "width=device-width" : `width=${minWidth}`

    const currentContent = viewport && viewport.getAttribute("content")

    if (viewport && currentContent !== content) {
      let target = content

      if (typeof currentContent === "string") {
        target = currentContent
          .split(",")
          .map((i) => i.trim())
          .filter((i) => !i.startsWith("width="))
          .concat([content])
          .join(",")
      }

      viewport.setAttribute("content", target)
    }

    if (!viewport) {
      const head = document.getElementsByTagName("head")

      if (head.length > 0) {
        const createdViewport = document.createElement("meta")
        createdViewport.setAttribute("name", "viewport")
        createdViewport.setAttribute("content", content)

        head[0].appendChild(createdViewport)
      }
    }
  }, [minWidth])

  useEffect(() => {
    const decbouncedHandler = debounce(handler, delay)

    window.addEventListener("resize", decbouncedHandler)

    return () => {
      window.removeEventListener("resize", decbouncedHandler)
    }
  }, [])
}
