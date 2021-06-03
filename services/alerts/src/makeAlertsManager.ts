import {
    AlertsManager,
    AlertsManagerAlert,
    CreateAlertManagerAlertOptions,
} from './types'

const createAlertManagerAlert = ({
    id,
    show,
    hide,
    remove,
}: CreateAlertManagerAlertOptions): AlertsManagerAlert => ({
    id,
    displayIndex: null,
    hidden: true,
    show,
    hide: () => hide(id),
    remove: () => remove(id),
    message: '',
    options: {
        hidden: true,
    },
})

type AlertsManagerAlertsMap = Map<number, AlertsManagerAlert>

const toVisibleAlertsArray = (alertsMap: AlertsManagerAlertsMap) =>
    Array.from(alertsMap)
        .reduce((alertsArray: Array<AlertsManagerAlert>, [_key, alert]) => {
            if (alert.displayIndex) {
                alertsArray.push(alert)
            }
            return alertsArray
        }, [])
        .sort(
            (a: AlertsManagerAlert, b: AlertsManagerAlert) =>
                (a.displayIndex || 0) - (b.displayIndex || 0)
        )

type SetAlertsFunction = React.Dispatch<
    React.SetStateAction<AlertsManagerAlert[]>
>
export const makeAlertsManager = (
    setAlerts: SetAlertsFunction
): AlertsManager => {
    const alertsMap: AlertsManagerAlertsMap = new Map()
    let id = 0
    let displayIndex = 0

    const show = (alert: AlertsManagerAlert) => {
        displayIndex++

        alertsMap.set(alert.id, {
            ...alert,
            displayIndex,
            hidden: false,
            options: {
                ...alert.options,
                // Avoid unexpect behaviour when passing a hidden option to `useAlert`
                hidden: false,
            },
        })

        setAlerts(toVisibleAlertsArray(alertsMap))
    }

    const hide = (id: number) => {
        const alert = alertsMap.get(id)

        if (alert) {
            alert.hidden = true
            alert.options.hidden = true

            setAlerts(toVisibleAlertsArray(alertsMap))
        }
    }

    const remove = (id: number) => {
        alertsMap.delete(id)
        setAlerts(toVisibleAlertsArray(alertsMap))
    }

    const add = (): AlertsManagerAlert => {
        id++
        const alert = createAlertManagerAlert({ id, show, hide, remove })
        alertsMap.set(id, alert)
        return alert
    }

    return {
        add,
        show,
        hide,
        remove,
    }
}
