# gandalf.landing.web

This is a website project for our Open-Source Decision Engine for Big-Data. Our [Back-End](https://github.com/Nebo15/gandalf.api) and [Front-End](https://github.com/Nebo15/gandalf.web) is also available on GitHub!

API docs is [here](http://docs.gandalf4.apiary.io/#).

## Installation Guide

### Docker

#### Deployment

UI can be deployed as a single container from [nebo15/gandalf.landing.web](https://hub.docker.com/r/nebo15/gandalf.landing.web/) Docker Hub.

#### Configurations

Application supports these environment variables:

| Environment Variable  | Default Value           | Description |
| --------------------- | ----------------------- | ----------- |
| `PORT`                | `8080`                  | Node.js server port.        |
| `CABINET_URL`         | `https://apps.gndf.io`  | `gandalf.web` endpoint.     |

## License

See [LICENSE.md](LICENSE).
