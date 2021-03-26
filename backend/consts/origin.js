const origin = process.env.NODE_ENV === 'production' ? process.env.ORIGIN_PRODUCTION : process.env.ORIGIN_LOCAL;

exports.origin = origin