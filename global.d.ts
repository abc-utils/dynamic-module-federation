import { Factory } from "./src/types"
import { Container } from "./src/types"

declare global {
    interface Window {
        [key: string]: Container & {
            initialized: boolean
        }
    }
    const __webpack_init_sharing__: (sharedScope: string) => Promise<void>
    const __webpack_share_scopes__: { default: string }
    
}

export {}
