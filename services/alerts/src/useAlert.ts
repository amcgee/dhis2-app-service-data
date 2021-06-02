import { useContext, useRef, useCallback } from 'react'
import { AlertsManagerContext } from './AlertsManagerContext'
import {
    AlertBarComponent,
    AlertOptions,
    AlertsManager,
    AlertsManagerAlert,
} from './types'

export const useAlert = (
    message: string | ((props: any) => string),
    options: AlertOptions | ((props: any) => AlertOptions) = {}
) => {
    const alertsManager: AlertsManager = useContext(AlertsManagerContext)
    const ref = useRef<AlertBarComponent>()
    const alert = useRef(<AlertsManagerAlert>alertsManager.add(ref))

    const show = useCallback(
        (props?) => {
            const resolvedMessage = String(
                typeof message === 'function' ? message(props) : message
            )
            const resolvedOptions =
                typeof options === 'function' ? options(props) : options

            alertsManager.show({
                ...alert.current,
                message: resolvedMessage,
                options: resolvedOptions,
            })
        },
        [alert, alertsManager, message, options]
    )

    const hide = useCallback(() => {
        /*
         * This fully assumes the ref from the AlertsManagerAlert is
         * going to be attached to an alert component that implements
         * and exposes a `hide` method (either a class component or a
         * function component that implements `useImperativeHandle`)
         */
        ref.current && ref.current.hide()
    }, [])

    return {
        show,
        hide,
    }
}
