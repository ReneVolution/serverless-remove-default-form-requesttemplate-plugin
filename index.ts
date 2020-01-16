import Serverless from 'serverless';
import ServerlessPlugin from 'serverless/classes/Plugin';

class ServerlessRemoveDefaultFormRequestTemplatePlugin implements ServerlessPlugin {
  serverless: Serverless;
  options: Serverless.Options;
  hooks: ServerlessPlugin.Hooks;

  constructor(serverless: Serverless, options: Serverless.Options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'after:package:compileEvents': () => this.removeDefaultUrlEncodedRequestTemplate()
    };
  }

  removeDefaultUrlEncodedRequestTemplate() {
    const cfResources = this.serverless.service.provider.compiledCloudFormationTemplate.Resources;
    Object.keys(cfResources).forEach((name) => {
      const resource = cfResources[name];
      if (resource.Type === 'AWS::ApiGateway::Method') {
        this.removeRequestTemplateFromResource(resource, 'application/x-www-form-urlencoded');
      }
    });
  }

  getRequestTemplatesFromResource(resource) {
    return resource.Properties.Integration.RequestTemplates;
  }

  removeRequestTemplateFromResource(resource, contentType: string) {
    const reqTemplates = this.getRequestTemplatesFromResource(resource);
    delete reqTemplates[contentType];
  }
}

export = ServerlessRemoveDefaultFormRequestTemplatePlugin;
