import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_CONNECTION } from './database.provider';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    public readonly db: any,
  ) {}
}
