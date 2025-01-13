import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const LogoSchema = z.object({
  companyName: z.string().min(1).max(100),
});

export class CreateLogoDto extends createZodDto(LogoSchema) {}
