import { Injectable } from '@nestjs/common';
import { ILoginData } from 'domain/interfaces/login-data.interface';
import { minimal_args } from 'infrastructure/infrastructure.module';
import puppeteer from 'puppeteer';
import { ConnectionHelper } from './helpers/connection-crawler.helper';

@Injectable()
export class ConnectionService {
  async getStatus(): Promise<boolean> {
    const url = process.env.BOTCONVERSA_URL;
    const loginData: ILoginData = {
      email: process.env.BOTCONVERSA_EMAIL,
      password: process.env.BOTCONVERSA_PASSWORD,
    };
    const browser = await puppeteer.launch({
      // executablePath: '/usr/lib/chromium/chrome',
      args: minimal_args, // if we need them.
    });
    const page = await browser.newPage();
    // prevent unecessary resources loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() in ['image', 'stylesheet']) request.abort();
      else request.continue();
    });
    // execute
    await ConnectionHelper.dashboardLogin(url, loginData, page);
    const connected = await ConnectionHelper.isConnected(page);

    return connected;
    // const amountToPay = (
    //   await (
    //     await page.$(
    //       'div.ValorDevido span[id=ctl00_ePortalContent_TELA_Valor1]',
    //     )
    //   ).evaluate((node) => node.innerText)
    // )
    //   .replaceAll('.', '')
    //   .replaceAll(',', '.');

    // if (amountToPay == '0') {
    //   const quote = [
    //     new Quote({
    //       quoteNumber: '1',
    //       originalDeadline: 'N/A',
    //       paymentOptions: [
    //         new PaymentOption({
    //           deadline: '',
    //           value: new Decimal('0'),
    //         }),
    //       ],
    //     }),
    //   ];
    //   return [quote, 0];
    // }
    // await ConnectionHelper.navigateToQuotesPage(page);
    // const arrayLines = await page.$$(
    //   'table[id=ctl00_ePortalContent_tabela_dados] tbody tr',
    // );
    // const quotesData = await ConnectionHelper.getQuotesFromTableLines(
    //   arrayLines,
    // );
    // const uniqueQuote = await ConnectionHelper.getUniqueQuote(page);
    // const totalAmount = uniqueQuote ? uniqueQuote : null;

    // await page.close();
    // return [quotesData, totalAmount];
  }
}
