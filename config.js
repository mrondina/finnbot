'use strict'

const WIT_TOKEN = process.env.WIT_TOKEN
if(!WIT_TOKEN) {
	throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}

var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || "EAACRdZCXOqCIBAK6osAXHiteJGy5JrLKuISyljX3ZCUsPhV5vFlqml0Rmtzy67W3GMnzf5znjZCx4O6Hs2adZAjIJJAoTV8w7f9ieocNnNvhwSd2DAXf4qEOWQdYZC16p2ZCHddP8NptBwZCqEsXgPj6IIXQD5yKPY8hGVhAtMJiwZDZD"
if(!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'glob_verify_my_access'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}