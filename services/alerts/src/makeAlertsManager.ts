import {
    AlertBarRef,
    AlertsManager,
    AlertsManagerAlert,
    CreateAlertManagerAlertOptions,
} from './types'

const createAlertManagerAlert = ({
    id,
    show,
    remove,
    ref,
}: CreateAlertManagerAlertOptions): AlertsManagerAlert => ({
    id,
    ref,
    displayId: null,
    show,
    remove: () => remove(id),
    message: '',
    options: {},
})

type AlertsManagerAlertsMap = Map<number, AlertsManagerAlert>

const toVisbleAlertsArray = (alertsMap: AlertsManagerAlertsMap) =>
    Array.from(alertsMap)
        .reduce((alertsArray: Array<AlertsManagerAlert>, [_key, alert]) => {
            if (alert.displayId) {
                alertsArray.push(alert)
            }
            return alertsArray
        }, [])
        .sort(
            (a: AlertsManagerAlert, b: AlertsManagerAlert) =>
                (a.displayId || 0) - (b.displayId || 0)
        )

type SetAlertsFunction = React.Dispatch<
    React.SetStateAction<AlertsManagerAlert[]>
>
export const makeAlertsManager = (
    setAlerts: SetAlertsFunction
): AlertsManager => {
    const alertsMap: AlertsManagerAlertsMap = new Map()
    let id = 0
    let displayId = 0

    const show = (alert: AlertsManagerAlert) => {
        displayId++

        alertsMap.set(alert.id, {
            ...alert,
            displayId,
        })

        setAlerts(toVisbleAlertsArray(alertsMap))
    }

    const remove = (id: number) => {
        alertsMap.delete(id)
        setAlerts(toVisbleAlertsArray(alertsMap))
    }

    const add = (ref: AlertBarRef): AlertsManagerAlert => {
        id++
        const alert = createAlertManagerAlert({ id, show, remove, ref })
        alertsMap.set(id, alert)
        return alert
    }

    return {
        show,
        remove,
        add,
    }
}
