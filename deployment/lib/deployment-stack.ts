import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';

export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // const bucket = new s3.Bucket(this, "CreateReactAppBucket", {
    //   bucketName: 'asdf',
    //   publicReadAccess: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   websiteIndexDocument: "index.html",
    //   websiteErrorDocument: "index.html",
    //   versioned: true
    // });
    // const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
    //   zoneName: 'asdf.com',
    //   hostedZoneId: ''
    // });
    // const certificate = new certificateManager.DnsValidatedCertificate(this, 'Certificate', {
    //   domainName: 'asdf.com',
    //   hostedZone: hostedZone,
    //   region: 'us-east-1'
    // });
    // const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    // // Cloudfront
    // const distribution = new cloudfront.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
    //   originConfigs: [
    //     {
    //       s3OriginSource: {
    //         s3BucketSource: bucket,
    //         originAccessIdentity: cloudFrontOAI
    //       },
    //       behaviors: [{isDefaultBehavior: true}]
    //     },
    //   ],
    //   viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
    //     certificate,
    //     {
    //       aliases: ['asdf.com'],
    //       securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
    //       sslMethod: cloudfront.SSLMethod.SNI
    //     },
    //   ),
    //   errorConfigurations: [
    //     {
    //       errorCode: 403,
    //       responsePagePath: "/",
    //       responseCode: 200,
    //     },
    //     {
    //       errorCode: 404,
    //       responsePagePath: "/index.html",
    //       responseCode: 200,
    //     },
    //   ]
    // });
    // new s3Deploy.BucketDeployment(this, "DeployCRA", {
    //   sources: [s3Deploy.Source.asset("../build")],
    //   distribution,
    //   destinationBucket: bucket,
    //   distributionPaths: ['/index.html'],
    // });
    // new route53.ARecord(this, 'Alias', {
    //   zone: hostedZone,
    //   recordName: 'asdf.com',
    //   target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    // });
    // new HttpsRedirect(this, "Redirect", {
    //   zone: hostedZone,
    //   recordNames: [`www.asdf.com`],
    //   targetDomain: 'asdf.com',
    // });
    // bucket.grantRead(cloudFrontOAI.grantPrincipal);

  }
}
