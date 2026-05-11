import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { AuthResponse, JwtPayload } from '@trailsense/types';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(
    payload: JwtPayload,
  ): Promise<Pick<AuthResponse, 'accessToken'>> {
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
