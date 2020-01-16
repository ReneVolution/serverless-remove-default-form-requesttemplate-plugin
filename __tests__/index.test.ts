import fs from 'fs';
import ServerlessRemoveDefaultFormRequestTemplatePlugin from '../index';
import Serverless from 'serverless';

const createPlugin = (resources: any) => {
  const serverless: Serverless = {
    service: {
      provider: {
        compiledCloudFormationTemplate: {
          Resources: resources
        },
        stage: 'test',
        name: 'api-service',
        region: 'eu-central-1',
        versionFunctions: false
      },
      custom: {},
      load: null,
      getAllFunctionsNames: null,
      setFunctionNames: null,
      getAllFunctions: null,
      getServiceName: null,
      getFunction: null,
      getEventInFunction: null,
      getAllEventsInFunction: null,
      mergeResourceArrays: null,
      validate: null,
      update: null
    },

    init: null,
    run: null,
    getProvider: null,
    setProvider: null,
    getVersion: null,
    cli: {
      log: (message: string) => null
    },
    providers: null,
    utils: null,

    config: null,
    yamlParser: null,
    variables: null,
    pluginManager: null,
    serverlessDirPath: null,
    version: null
  };

  const options: Serverless.Options = {
    stage: 'test',
    region: 'eu-central-1'
  };

  return new ServerlessRemoveDefaultFormRequestTemplatePlugin(serverless, options);
};

describe('ServerlessRemoveDefaultFormRequestTemplatePluginTest', () => {
  it('ignores empty resources', () => {
    const plugin = createPlugin({});
    plugin.removeDefaultUrlEncodedRequestTemplate();
  });

  it('runs on hook after:package:compileEvents', () => {
    const plugin = createPlugin({});
    jest.spyOn(plugin, 'removeDefaultUrlEncodedRequestTemplate');
    expect(plugin.hooks).toHaveProperty('after:package:compileEvents');
    plugin.hooks['after:package:compileEvents']();
    expect(plugin.removeDefaultUrlEncodedRequestTemplate).toBeCalledTimes(1);
  });

  it('gets request templates from AWS API Gateway Method resources', () => {
    const sampleData = fs.readFileSync(`${__dirname}/data/AWS_ApiGateway_Method_sample.json`);
    const resource = JSON.parse(sampleData.toString());
    const plugin = createPlugin(resource);
    const res = plugin.getRequestTemplatesFromResource(resource);
    expect(res).not.toBeNull();
  });

  it('removes the x-www-form-url-encoded entry in the request template', () => {
    const sampleData = fs.readFileSync(`${__dirname}/data/AWS_ApiGateway_Method_sample.json`);
    const resource = JSON.parse(sampleData.toString());
    const plugin = createPlugin(resource);
    expect(Object.keys(resource.Properties.Integration.RequestTemplates).length).toBe(2);
    plugin.removeRequestTemplateFromResource(resource, 'application/x-www-form-urlencoded');
    expect(Object.keys(resource.Properties.Integration.RequestTemplates).length).toBe(1);
  });

  it('removes the application/x-www-form-urlencoded entry for all request templates', () => {
    const sampleData = fs.readFileSync(`${__dirname}/data/resourceSample1.json`);
    const resources = JSON.parse(sampleData.toString());
    const plugin = createPlugin(resources);
    plugin.removeDefaultUrlEncodedRequestTemplate();
  });
});
