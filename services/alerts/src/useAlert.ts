import { useContext, useRef, useCallback } from 'react'
import { AlertsManagerContext } from './AlertsManagerContext'
import { AlertOptions, AlertsManager, AlertsManagerAlert } from './types'

export const useAlert = (
    message: string | ((props: any) => string),
    options: AlertOptions | ((props: any) => AlertOptions) = {}
) => {
    const alertsManager: AlertsManager = useContext(AlertsManagerContext)
    const alertRef = useRef(<AlertsManagerAlert>alertsManager.add())

    const show = useCallback(
        (props?) => {
            const resolvedMessage = String(
                typeof message === 'function' ? message(props) : message
            )
            const resolvedOptions =
                typeof options === 'function' ? options(props) : options

            alertsManager.show({
                ...alertRef.current,
                message: resolvedMessage,
                options: resolvedOptions,
            })
        },
        [alertsManager, message, options]
    )

    const hide = useCallback(() => {
        alertRef.current.hide(alertRef.current.id)
    }, [])

    return {
        show,
        hide,
    }
}
