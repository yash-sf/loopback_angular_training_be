import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import fs from 'fs';

export class MySequence extends MiddlewareSequence {
  log: {
    startTime: string;
    endTime: string;
    referer: string;
    userAgent: string;
    requestIp: string;
    errorTime?: string;
  } = {
    startTime: '',
    endTime: '',
    referer: '',
    userAgent: '',
    requestIp: '',
  };

  async logger(log: any): Promise<void> {
    return fs.readFile(
      'errorlogs.json',
      'utf8',
      function readFileCallback(err, data: any) {
        if (err) {
          console.log(err);
        } else {
          const currentData: any[] = (data && JSON.parse(data)) || [];
          currentData.push(log);
          return fs.writeFileSync(
            'errorlogs.json',
            JSON.stringify(currentData),
            'utf8',
          );
        }
      },
    );
  }

  validateOrigin(origin: string): boolean {
    // const {ALLOWED_ORIGINS} = process.env;
    // const allowedOriginsArray: string[] = ALLOWED_ORIGINS?.split(',') || [];
    // console.log(origin);
    // if (allowedOriginsArray.includes(origin)) {
    //   return true;
    // }
    return true;
    return false;
  }

  async handle(context: RequestContext): Promise<void> {
    this.log.startTime = new Date().getTime().toString();
    this.log.referer = context.request.headers.referer || '';
    this.log.requestIp = context.request.ip;
    this.log.userAgent = context.request.headers['user-agent'] || '';
    if (!this.validateOrigin(this.log.referer)) {
      this.log.errorTime = new Date().getTime().toString();
      await this.logger(this.log);
      throw Error('Invalid origin');
    }
    await super.handle(context);
    this.log.endTime = new Date().getTime().toString();
    await this.logger(this.log);
  }
}
