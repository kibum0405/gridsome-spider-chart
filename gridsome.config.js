// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'cloudIq',
    icon: {
        favicon: './src/assets/favicon.png',
        touchicon: './src/assets/favicon.png'
    },
    siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://example.com'),
    settings: {
        web: process.env.URL_WEB || false,
        twitter: process.env.URL_TWITTER || false,
        github: process.env.URL_GITHUB || false,
        nav: {
            links: [
                { path: '/docs/', title: 'Docs' }
            ]
        },
        sidebar: [
            {
                name: 'allguide',
                    sections: [
                    {
                        title: '소개',
                        items: [
                            '/docs/',
                        ]
                    },
                    {
                        title: '기능분해관점',
                        items: [
                            '/decomposition/level1/',
                            '/decomposition/level2/',
                            '/decomposition/level3/',
                            '/decomposition/level4/',
                        ]
                    },
                    {
                        title: '데이터관점',
                        items: [
                            '/data/level1/',
                            '/data/level2/',
                            '/data/level3/',
                            '/data/level4/',
                        ]
                    },
                    {
                        title: '소프트웨어 아키텍처 관점',
                        items: [
                            '/sw-architecture/level1/',
                            '/sw-architecture/level2/',
                            '/sw-architecture/level3/',
                            '/sw-architecture/level4/',
                        ]
                    },
                    {
                        title: '인프라 아키텍처 관점',
                        items: [
                            '/infra-architecture/level1/',
                            '/infra-architecture/level2/',
                            '/infra-architecture/level3/',
                            '/infra-architecture/level4/',
                        ]
                    },
                    {
                        title: '배포 관점',
                        items: [
                            '/distribute/level1/',
                            '/distribute/level2/',
                            '/distribute/level3/',
                            '/distribute/level4/',
                        ]
                    },
                    {
                        title: '팀 구조와 문화 관점',
                        items: [
                            '/team-structure/level1/',
                            '/team-structure/level2/',
                            '/team-structure/level3/',
                            '/team-structure/level4/',
                        ]
                    },
                ]
            }
        ]
    },
    plugins: [
        {
        use: '~/plugins/vuetify',
        },
        {
        use: '@gridsome/source-filesystem',
        options: {
            baseDir: './content',
            path: '**/*.md',
            typeName: 'MarkdownPage',
            remark: {
                externalLinksTarget: '_blank',
                externalLinksRel: ['noopener', 'noreferrer'],
                plugins: [
                    '@gridsome/remark-prismjs'
                ]
            }
        }
        },
        {
            use: 'gridsome-plugin-tailwindcss',
            options: {
                tailwindConfig: './tailwind.config.js',
                purgeConfig: {
                    // Prevent purging of prism classes.
                    whitelistPatternsChildren: [
                        /token$/
                    ]
                }
            }
        },

        {
        use: '@gridsome/plugin-google-analytics',
            options: {
                id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
            }
        },

        {
        use: '@gridsome/plugin-sitemap',
            options: {  
            }
        }

    ]
}
