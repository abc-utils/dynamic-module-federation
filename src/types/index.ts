import { ReactNode } from "react"

export type Container = {
    init: (sharedScope: string) => Promise<void>
    get: (module: string) => Promise<Factory>
}

export type Factory = () => any
export type ErrorLogCallbackProps = {
    error?: unknown
    errorMessage?: string
}

export type GetModuleFromScopeProps = {
    scope: string
    module: string
    errorLogCallback?: (errorLogCallbackProps: ErrorLogCallbackProps) => void
}

export type UseDynamicScriptProps = {
    remoteUrl: string
    scope?: string
    onLoadCallback?: () => void
    errorLogCallback?: (errorLogCallbackProps?: ErrorLogCallbackProps) => void
}

export type InjectScriptProps = {
    remoteUrl: string
    scriptId?: string | null
    scope?: string
    onSuccess?: () => void
    onError?: () => void
}

export type UseFederatedComponentProps = {
    remoteUrl: string
    scope: string
    module: string
    remoteEntryLoadedCallback?: () => void
    errorLogCallback?: (errorLogCallbackProps?: ErrorLogCallbackProps) => void
}

export type ModFedRemoteLoaderProps = {
    remoteUrl: string
    scope: string
    module: string
    errorLogCallback?: (errorLogCallbackProps?: ErrorLogCallbackProps) => void
    loadingComponent?: ReactNode
    remoteEntryLoadedCallback?: () => void
    props?: Record<string, unknown>
    fallbackComponent?: ReactNode
}