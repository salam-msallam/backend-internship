import { BadRequestException, Injectable } from '@nestjs/common';

import type { PipeTransform } from '@nestjs/common';

const MAX_INT = 2_147_483_647;

@Injectable()
export class PositiveIntIdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    if (!/^[1-9]\d*$/.test(value)) {
      throw new BadRequestException('ID must be a positive integer');
    }

    const id = Number(value);

    if (!Number.isSafeInteger(id) || id > MAX_INT) {
      throw new BadRequestException(`ID must not exceed ${MAX_INT}`);
    }

    return id;
  }
}
