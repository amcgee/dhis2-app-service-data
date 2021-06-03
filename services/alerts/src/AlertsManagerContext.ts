import React from 'react'
import { AlertsManager, AlertsManagerAddFunction } from './types'

const placeholder = () => {
    throw new Error(
        'This function is a placeholder used when creating the AlertsManagerContext, it should be overridden'
    )
}

const defaultAlertsManager: AlertsManager = {
    add: placeholder as AlertsManagerAddFunction,
    show: placeholder,
    hide: placeholder,
    remove: placeholder,
}

export const AlertsManagerContext = React.createContext<AlertsManager>(
    defaultAlertsManager
)
