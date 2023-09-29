import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useUpdateEffect = (callback: EffectCallback, dependencies: DependencyList) => {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        return callback()
    }, dependencies)
}
