import { Module } from '@nestjs/common';
import { ConnectionService } from './services/connection.service';

// const isLocal =
//   process.env.ENVIRONMENT == 'LOCAL' ||
//   process.env.ENVIRONMENT == 'LOCAL-SERVER';

export const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];
// const ClusterProvider = {
//   provide: 'Cluster',
//   useFactory: async () => {
//     const cluster = await Cluster.launch({
//       concurrency: Cluster.CONCURRENCY_CONTEXT,
//       maxConcurrency: Number(process.env.BROWSER_INSTANCES_QUANTITY),
//       timeout: 5000,
//       puppeteerOptions: {
//         userDataDir: './myPup',
//         timeout: 5000,
//         headless: true,
//         args: minimal_args,
//       },
//     });
//     return cluster;
//   },
// };

@Module({
  imports: [
    // DynamooseModule.forRoot({
    //   local: isLocal,
    //   aws: {
    //     region: isLocal ? 'localhost' : process.env.MY_AWS_REGION,
    //     accessKeyId: process.env.DEFAULT_ACCESS_KEY,
    //     secretAccessKey: process.env.DEFAULT_SECRET,
    //   },
    // }),
    // DynamooseModule.forFeature([
    //   {
    //     name: 'Conversation',
    //     options: {
    //       tableName: process.env.CONVERSATIONS_TABLE,
    //     },
    //     schema: ConversationSchema,
    //   },
    //   {
    //     name: 'Company',
    //     options: {
    //       tableName: process.env.COMPANIES_TABLE,
    //     },
    //     schema: CompanySchema,
    //   },
    // ]),
  ],
  providers: [
    // ConversationService,
    // CompanyService,
    // ClusterProvider,
    // ClusterService,
    ConnectionService,
  ],
  exports: [
    // ConversationService,
    // CompanyService,
    // ClusterProvider,
    // ClusterService,
    ConnectionService,
  ],
})
export class InfrastructureModule {}
