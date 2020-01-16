# serverless-remove-default-form-requesttemplate-plugin

[![npm](https://img.shields.io/npm/v/serverless-remove-default-form-requesttemplate-plugin.svg)](https://www.npmjs.com/package/serverless-remove-default-form-requesttemplate-plugin)
[![license](https://img.shields.io/github/license/ReneVolution/serverless-remove-default-form-requesttemplate-plugin.svg)](https://github.com/ReneVolution/serverless-remove-default-form-requesttemplate-plugin/blob/master/LICENSE.md)
[![downloads](https://img.shields.io/npm/dt/serverless-remove-default-form-requesttemplate-plugin.svg)](https://www.npmjs.com/package/serverless-remove-default-form-requesttemplate-plugin)
[![codecov](https://codecov.io/gh/ReneVolution/serverless-remove-default-form-requesttemplate-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/ReneVolution/serverless-remove-default-form-requesttemplate-plugin)
[![Build Status](https://travis-ci.org/ReneVolution/serverless-remove-default-form-requesttemplate-plugin.svg?branch=master)](https://travis-ci.org/ReneVolution/serverless-remove-default-form-requesttemplate-plugin.svg?branch=master)

A [serverless](https://serverless.com) plugin to remove all occurences of `application/x-www-form-urlencoded` request templates that are automagically added by [serverless](https://serverless.com). The reason to remove this is to enforce API clients to use the `application/json`, which then can leverage JSON schema validation.

## Usage

### Install

```bash
$ yarn add serverless-remove-default-form-requesttemplate-plugin
```

```bash
$ npm install serverless-remove-default-form-requesttemplate-plugin
```

### Configuration

```yaml
plugins:
  - serverless-remove-default-form-requesttemplate-plugin
```

## License

Feel free to use the code, it's released using the [MIT license](LICENSE.md).
