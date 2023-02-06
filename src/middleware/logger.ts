import { Request, Response } from 'express';
import morgan from 'morgan';

morgan.token('splitter', (req: Request) => {
  return '\x1b[36m--------------------------------------------\x1b[0m\n';
});

morgan.token('statusColor', (req: Request, res: Response) => {
  const status = (
    typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent
  )
    ? res.statusCode
    : undefined;

  let color = 0;
  if (status)
    color =
      status >= 500
        ? 31 // red
        : status >= 400
        ? 33 // yellow
        : status >= 300
        ? 36 // cyan
        : status >= 200
        ? 32 // green
        : 0; // no color

  return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

const logger = () =>
  morgan(
    `:splitter:date[web] \x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]`
  );

export default logger;
