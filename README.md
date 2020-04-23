# raspa 🕵

Scrape web content.

> Simple plugin to get html content with [Puppeteer](https://github.com/puppeteer/puppeteer).

Install:

```bash
npm i raspa
```

Example of use:

```javascript
import raspa from 'raspa'

raspa('https://www.youtube.com').then(html => {

  console.log(html); // print the content in console

})
```

> The function returns a promise with the html content.

---

You can define the response size of the screen:

```javascript
const config = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1
}

raspa('https://www.youtube.com', config)
  .then(html => console.log(html));
```
