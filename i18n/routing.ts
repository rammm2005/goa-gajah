import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    // locales: ['en', 'id', 'de', 'ru', 'ph', 'hi', 'ban', 'ja', 'zh-CN', 'fr'],
    locales: ['en', 'id'],

    // Used when no locale matches
    defaultLocale: 'en'
});
