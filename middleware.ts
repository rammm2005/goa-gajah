import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // matcher: ['/', '/(en|id|de|ru|ph|hi|ban|ja|zh-CN|fr)/:path*']
    matcher: ['/', '/(en|id)/:path*']
};
