import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

export function isNullOrEmpty(value) {
  return !value || value == null || value == '' || value.length == 0;
}

export function SetEnvironmentVarables(
  path: string,
  environment: string | null = null,
) {
  if (!isNullOrEmpty(path)) {
    dotenv.config({
      path: path.endsWith('.env') ? path : getEnvPath(environment, path),
      override: true,
    });
  }
}

function getEnvPath(envName: string, dest: string): string {
  const env: string | undefined = envName;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'local.env';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
