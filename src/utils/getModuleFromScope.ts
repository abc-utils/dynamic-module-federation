import { GetModuleFromScopeProps, Factory, Container } from "../types"

export const getModuleFromScope = ({
  scope,
  module,
  errorLogCallback = () => {},
}: GetModuleFromScopeProps) => {
  return async () => {
    try {
      if (window[scope] && window[scope].initialized) {
        const factory: Factory = await window[scope].get(module)
        const Module = factory()
        return Module
      }
      await __webpack_init_sharing__('default')
      const container: Container = window[scope]
      if (!container) return null
      console.log('$$$$$$$$$$ container found', __webpack_share_scopes__)
      await container.init(__webpack_share_scopes__.default)
      console.log('$$$$$$$$$$ container initialized')
      const factory = await window[scope].get(module)
      console.log('$$$$$$$$ factory', factory)
      const Module = factory()
      console.log('$$$$$$$$$$$$ module found', Module)
      window[scope].initialized = true
      return Module
    } catch (error) {
      errorLogCallback({
        error,
        errorMessage: `error while initializing remote scope for ${scope} and module ${module}`,
      })
    }
  }
}
