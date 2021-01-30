# Debug your Vue application with Ray to fix problems faster

This package can be installed in any JS application to send messages to [the Ray app](https://myray.app).

## Installation

Install with npm/yarn
```sh
$ npm install vue-js-ray
--
$ yarn add vue-js-ray
```

...and require the plugin by importing and use the plugin like so:
```js
import Vue from 'vue'
import ray from 'vue-js-ray'

Vue.use(ray)
```

...and access the functions with
```
this.$ray()
```

So far the package has been tested and working on Nuxt, Vue-cli and Laravel Jetstream (Inertia Stack)

## Documentation

You can find the full documentation on [our documentation site](https://spatie.be/docs/ray/v1/usage/javascript).

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Miguel Piedrafita](https://github.com/m1guelpf)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
