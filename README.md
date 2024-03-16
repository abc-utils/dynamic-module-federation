# dynamic-module-federation

This package provides React compatible component as well as hook to load and render Module-federated micro-apps in dynamic way.

- It will dynamically import the repote applications and will only import the part of the remote application that is required.
- It automatically handles the scenario where multiple instances of remote app is consumed inside the host application.
- It provides easy to use react component and hook to use the imported modules from remote app.

Configure the remote app with module federation and serve it.
In the host application, use the module federation plugin inside webpack but to import the remote entries dynamically don't mention those as remotes.

```javascript
// webpack.config.js of host

new ModuleFederationPlugin({
  name: "hostApp",
  shared: {
    react: { singleton: true, eager: true},
    "react-dom": { singleton: true, eager: true}
    // rest of the configuration goes here
  }
})
```
To import remote module as a react component:

```javascript
import ModFedRemoteLoader from 'dynamic-module-federation'

<ModFedRemoteLoader
  remoteUrl={/* use the remote url of the application. Ex: http://localhost:3001/remoteEntry.js */}
  scope={/* The name of the remote application */}
  module={ /* The module from the remote app that you want to use Ex: "./Button" */}
  loadingComponent={/* Optional. To show a loading screen while the remote module is getting loaded */}
  remoteEntryLoadedCallback={/* Optional. If we want to run some functions after the remote Entry file is loaded. The logging utilities can be added here. */}
  errorLogCallback={/* Optional. If we want to run any function in case of error while loading the remote module. The logging utilities can be added here */}
  props={/* Optional. To add any optional parametrs in the component */ }
>
```
It also allows to load modules from remote app through a hook. Use the hook useFederatedComponent for this purpose.

```javascript
import { useFederatedComponent } from 'dynamic-module-federation'

const RemoteComponent = () => {
  const {error, Component} = useFederatedComponent({
    remoteUrl: 'http://localhost:3002/remoteEntry.js',
    scope: 'remoteAppSecond',
    module: './Button'
  })
  if (error) {
    // errorLog(error)
  }
  return (
    <>
      {Component && (
        <Suspense fallback={<>Loading ... </>}>
          <Component />
        </Suspense>
      )}
    </>
  )
}
```
You can view a demonstration of utilizing this application at https://github.com/abc-utils/dynamic-module-federation-example .
