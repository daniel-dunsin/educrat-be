import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
     const saltFactor = await bcrypt.genSalt(10);
     return await bcrypt.hash(password, saltFactor);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
     return await bcrypt.compare(password, hashedPassword);
}
