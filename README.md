<p align="center">
<a href="#start"><img height="30rem" src="https://raw.githubusercontent.com/arcana-network/branding/main/an_logo_light_temp.png"/></a>
<h2 align="center"> <a href="https://arcana.network/">Example: Using Custom OAuth in dApp </a></h2>
</p>
<br/>
<p id="banner" align="center">
<br/>
<a title="MIT License" href="https://github.com/arcana-network/license/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue"/></a>
<a title="Beta release" href="https://github.com/arcana-network/custom-provider-fe-example/releases"><img src="https://img.shields.io/github/v/release/arcana-network/custom-provider-fe-example?style=flat-square&color=28A745"/></a>
<a title="Twitter" href="https://twitter.com/ArcanaNetwork"><img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FArcanaNetwork"/></a>
<a href="https://docs.arcana.network/"><img src="https://raw.githubusercontent.com/arcana-network/branding/main/an_auth_sdk_banner_feb_24.png" alt="Arcana Auth SDK"/></a>
</p>

# Example: Using Custom OAuth in dApp

This example shows dApp developers how to implement custom OAuth for user authentication in the context of Arcana Auth SDK. It implements the linking of multiple user authentication accounts to a single Arcana Auth account. With this linking, the authenticated users can securely access the in-app Arcana wallet and sign blockchain transactions using the same wallet address, regardless of which linked authentication account they use to log in to the app.

This app shows how Google, Epic and Twitch user accounts can be linked to a single Arcana wallet account address via the Auth SDK's `loginWithCustomProvider` method.

## Prerequisites

Before using this example, build and deploy the companion custom authentication server example. The server example implements dApp user authentication via Epic, Google or Twitch OAuth mechanisms.

See [Custom OAuth Server Example](https://github.com/arcana-network/custom-provider-server-example).

## Build

`npm i; npm run build`

## Deploy

`npm run start`

## Documentation

See [Arcana Network documentation](https://docs.arcana.network/), [Auth SDK Quick Start Guide](https://docs.arcana.network/quick-start/auth-sdk/index.html), [Usage Guide](https://docs.arcana.network/web-sdk/auth-usage-guide.html), [API Reference Guide](https://authsdk-ref-guide.netlify.app) and [integration examples](https://docs.arcana.network/tutorials/).

## Support

Contact [Arcana Support](https://docs.arcana.network/support).

## License

This example code and the Arcana Auth SDK are distributed under the [MIT License](https://fossa.com/blog/open-source-licenses-101-mit-license/). For details, see [Arcana License](https://github.com/arcana-network/license/blob/main/LICENSE.md).
