import { Component, RefObject } from 'react'

export interface AlertBarComponent extends Component {
    hide: () => void
}

export type AlertBarRef = RefObject<AlertBarComponent | undefined>

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
    onHidden?: () => void
}

export type Alert = {
    message: string
    options: AlertOptions
}

export type CreateAlertManagerAlertOptions = {
    id: number
    ref: AlertBarRef
    remove: (id: number) => void
    show: (alert: AlertsManagerAlert) => void
}

export interface AlertsManagerAlert
    extends Alert,
        CreateAlertManagerAlertOptions {
    displayId: number | null
}

export type AlertsManagerAddFunction = (ref: AlertBarRef) => AlertsManagerAlert

export type AlertsManager = {
    add: AlertsManagerAddFunction
    remove: (id: number) => void
    show: (alert: AlertsManagerAlert) => void
}
