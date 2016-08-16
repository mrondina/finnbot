'use strict'

const WIT_TOKEN = "LRLI4GCF6K7UADSZQM66MU4J5WNFBC52"
if(!WIT_TOKEN) {
	throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}

var FB_PAGE_TOKEN = "EAACRdZCXOqCIBAKxxLlANtU1RbmAo4sos2Bqsq2liYgx1jspZBugPr1Yjzga4xfeKSSh7UgnecTzC8Cjzwb0DsZAlKcUROn8KvFmrJbUQKZA1XONJ1WDk4KMBM9kMbZCPNAAuywGDHes7zvxM68EoDxCoofi7PagkCKlmEjIpowZDZD"
if(!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'glob_verify_my_access'

module.exports = {
	WIT_TOKEN: WIT_TOKEN,
	FB_PAGE_TOKEN: FB_PAGE_TOKEN,
	FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}