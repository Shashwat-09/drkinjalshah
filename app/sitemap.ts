import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/services',
        '/care-plans',
        '/contact',
        '/blog',
        '/book-appointment',
    ]

    return routes.map((route) => ({
        url: `${SITE_CONFIG.url}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}
