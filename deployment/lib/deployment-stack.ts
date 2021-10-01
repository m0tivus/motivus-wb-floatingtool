import * as cdk from '@aws-cdk/core'
import { StaticSite } from './static-site'

export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new StaticSite(this, 'motivus-wb-widget', {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: this.node.tryGetContext('subdomain'),
    })
  }
}
