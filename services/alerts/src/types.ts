type AlertAction = {
    label: string
    onClick: () => void
}

export type AlertOptions = {
    actions?: AlertAction[]
    className?: string
    critical?: boolean
    dataTest?: string
    duration?: number
    icon?: boolean | React.ElementType
    permanent?: boolean
    success?: boolean
    warning?: boolean
    hidden?: boolean
    onHidden?: () => void
}

export type Alert = {
    message: string
    options: AlertOptions
}

export type CreateAlertManagerAlertOptions = {
    id: number
    show: (alert: AlertsManagerAlert) => void
    hide: (id: number) => void
    remove: (id: number) => void
}

export interface AlertsManagerAlert
    extends Alert,
        CreateAlertManagerAlertOptions {
    displayId: number | null
    hidden: boolean
}

export type AlertsManagerAddFunction = () => AlertsManagerAlert

export type AlertsManager = {
    add: AlertsManagerAddFunction
    show: (alert: AlertsManagerAlert) => void
    hide: (id: number) => void
    remove: (id: number) => void
}
