# Motivus worker
The motivus worker handles new tasks received from the motivus cluster and handles its safe execution in web and node environments

# For web environment, as an HTML/JS widget

## Local development
- install dependencies `yarn`
- `cp .env.example .env`
- export env variables defined in .env
- make sure backend application is running and is correctly configured in .env
- `yarn start`
- open your browser and navigate to http://localhost:3000

## Running in production
### Add widget to site
- Append the following script to the `<head>` section of the webpage:
```javascript
<script src="https://widget.motivus.cl/loader.js" async></script>
<script>
  var Motivus = window.Motivus || {};
  Motivus.client_id = '1234';
</script>
```
- Refer to `src/widgetLoader.js` for this step

# For node environment, as a minified js script

## Local development
- install dependencies `yarn`
- build and run worker script using node `yarn worker`

### Worker execution modes
The node worker has two modes that can be switched via the`CLUSTER_MODE` env variable:
- *network* mode, the default
- *loopback* mode

#### Network mode
For use with the application backend.
The driver framework must point to the application backend and use a valid `APPLICATION_TOKEN` env variable.
The worker must also point to the same application backend, using the `REACT_APP_API_HOST=localhost:4000` env variable.

Start the worker in network mode by executing:
`CLUSTER_MODE=network yarn worker`

#### Loop-back mode
For use without application backend.
The driver framework must point to the loop-back server, that is started along the worker.
Every task scheduled by the driver is started in the worker when it arrives.
The driver does not requires an `APPLICATION_TOKEN` and must point to the loop-back server.

Start the worker in loop-back mode by executing:
`CLUSTER_MODE=loopback yarn worker`

## Running in production
- Set your account address in env (TODO: will use guest account for now)
- Set desired threads available using `PROCESSING_THREADS` env variable
`curl https://widget.motivus.cl/worker.js | PROCESSING_THREADS=10 node`
