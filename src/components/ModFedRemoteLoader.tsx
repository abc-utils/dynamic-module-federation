import React, { Suspense, useEffect } from 'react'
import { useFederatedComponent } from '../hooks/useFederatedComponent'
import { ModFedRemoteLoaderProps } from '../types'

/**
 *
 * @param {string} remoteUrl //url of the remote entry script to be loaded
 * @param {string} scope // scope to initialize remote entry
 * @param {string} module // component name exposed from remote app
 * @param {Function} errorLogCallback // error callback to log error
 * @param {Function} loadingComponent // intermediate loader component
 * @param {Function} remoteEntryLoadedCallback // callback to invoke on successful loading of remote entry script
 * @param {Object} props // props required to render a remote component
 * @returns
 */

const ModFedRemoteLoader = ({
  remoteUrl,
  scope,
  module,
  props = {},
  loadingComponent,
  remoteEntryLoadedCallback,
  errorLogCallback = () => {},
  fallbackComponent,
}: ModFedRemoteLoaderProps) => {
  const { error, Component } = useFederatedComponent({
    remoteUrl,
    scope,
    module,
    remoteEntryLoadedCallback,
    errorLogCallback,
  })
  const errorMessage = `could not load component ${module} from ${scope}`
  useEffect(() => {
    if (error) {
      errorLogCallback({ errorMessage })
    }
  }, [error])
  if (error) return fallbackComponent
  if (!Component) return ''
  return (
    <Suspense fallback={loadingComponent}>
      {error ? <>{errorMessage}</> : Component && <Component {...props} />}
    </Suspense>
  )
}

export default ModFedRemoteLoader
