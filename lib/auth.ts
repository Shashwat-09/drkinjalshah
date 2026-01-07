import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

const ONE_DAY = 24 * 60 * 60 * 1000;

export async function encrypt(payload: any) {
    if (!secretKey) throw new Error('JWT_SECRET is not defined');
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    if (!secretKey) throw new Error('JWT_SECRET is not defined');
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + ONE_DAY);
    const session = await encrypt({ userId, expires });

    cookies().set('admin_session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires,
        sameSite: 'strict',
        path: '/',
    });
}

export async function getSession() {
    const session = cookies().get('admin_session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession() {
    const session = cookies().get('admin_session')?.value;
    if (!session) return null;

    const parsed = await decrypt(session);
    if (!parsed) return null;

    const expires = new Date(Date.now() + ONE_DAY);
    const newSession = await encrypt({ ...parsed, expires });

    cookies().set('admin_session', newSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires,
        sameSite: 'strict',
        path: '/',
    });

    return parsed;
}

export async function logout() {
    cookies().delete('admin_session');
    redirect('/login');
}
