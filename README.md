# Motivus widget

## Deploy
- install dependencies `yarn`
- `cp .env.example .env`
- export env variables defined in .env
- `yarn build`
- copy `dist/static/js/main.js` into s3 bucket (`motivus-webpage`)

## Add to site
- Append the following script to the `<head>` section of the webpage:
```javascript
<script src="https://motivus-webpage.s3.amazonaws.com/widgetLoader.js" async></script>
<script>
  var Motivus = window.Motivus || {};
  Motivus.client_id = '1234';
</script>
```
- Refer to `src/widgetLoader.js` for this step
