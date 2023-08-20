import { ILoginData } from 'domain/interfaces/login-data.interface';
import { Page } from 'puppeteer';

export class ConnectionHelper {
  static async dashboardLogin(url: string, loginData: ILoginData, page: Page) {
    console.log(url);
    await Promise.all([
      page.goto(url),
      await page.waitForSelector(
        '.bc-button.medium.bc-button_blue.sing-in__button',
      ),
    ]);

    const emailBox = await page.$('input.fields__input[name="email"]');
    const proceedButtom = await page.$(
      '.bc-button.medium.bc-button_blue.sing-in__button',
    );
    await emailBox.type(loginData.email);
    await proceedButtom.click();
    await Promise.race([
      page.waitForNavigation({ waitUntil: ['domcontentloaded'] }),
      new Promise<any>((_, reject) =>
        setTimeout(() => {
          const error = new Error('IPTU system is unstable, try again later.');
          error['isUserMessage'] = true;
          reject(error);
        }, 30000),
      ),
    ]);
    const passwordInput = await page.$(
      'input.password-field__input[name="password"][type="password"]',
    );
    const loginButtom = await page.$(
      'button.bc-button.medium.bc-button_blue.password__button',
    );
    await passwordInput.type(loginData.password);
    await Promise.all([
      loginButtom.click(),
      page.waitForNavigation({ waitUntil: ['domcontentloaded'] }),
      await page.waitForSelector(
        'a.navigation-menu__li-link div.navigation-menu__link.link-open',
      ),
    ]);
  }

  static async isConnected(page): Promise<boolean> {
    const settingsButtom = await page.$(
      'a.navigation-menu__li-link div.navigation-menu__link.link-open',
    );
    await Promise.all([
      settingsButtom.click(),
      page.waitForNavigation({
        waitUntil: 'networkidle0',
      }),
    ]);
    // page
    //   .waitForSelector(
    //     'button.bc-button.medium.bc-button_red-transparent.connection-container__btn',
    //     { timeout: 2000 },
    //   )
    //   .then(() => true) // Button exists.
    //   .catch(() => false);
    const buttonSelector = 'button.bc-button.medium.bc-button_blue';
    const buttonElement = await page.$(buttonSelector);
    return !buttonElement;
  }
}
