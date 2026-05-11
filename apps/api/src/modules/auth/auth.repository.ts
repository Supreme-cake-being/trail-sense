import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '@/database/database.service';
import { users } from '@/database/schema';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string) {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user ?? null;
  }

  async create(data: {
    email: string;
    username: string;
    passwordHash: string;
  }) {
    const [user] = await this.databaseService.db
      .insert(users)
      .values({
        email: data.email,
        username: data.username,
        passwordHash: data.passwordHash,
      })
      .returning();

    return user;
  }
}
