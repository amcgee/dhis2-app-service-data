import { useAlerts } from '@dhis2/app-runtime'
import React from 'react'

export const Alerts = () => {
    const alerts = useAlerts()

    return alerts.map(alert => (
        <div key={alert.id}>
            {alert.message}
            <button
                onClick={() => {
                    alert.options.onHidden && alert.options.onHidden()
                    alert.remove()
                }}
            >
                hide
            </button>
        </div>
    ))
}
