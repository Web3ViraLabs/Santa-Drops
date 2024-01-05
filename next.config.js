module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/**'
            }, {
                protocol: 'https',
                hostname: 'ipfs.io',
                port: '',
                pathname: '/**'
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                '0n960zs4-3000.inc1.devtunnels.ms/',
                'localhost:3000'
            ]
        }
    }
}