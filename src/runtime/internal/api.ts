import type { H3Event } from 'h3'
import { checksums } from '#content/manifest'

export async function fetchDatabase(event: H3Event | undefined, collection: string) {
  return await $fetch(`/api/content/${collection}/database.sql`, {
    context: event ? { clouflare: event.context.cloudflare } : {},
    responseType: 'text',
    headers: { 'content-type': 'text/plain' },
    query: { v: checksums[String(collection)], t: import.meta.dev ? Date.now() : undefined },
  })
}

export async function fetchQuery(event: H3Event | undefined, collection: string, sql: string) {
  return await $fetch(`/api/content/${collection}/query`, {
    context: event ? { clouflare: event.context.cloudflare } : {},
    headers: { 'content-type': 'application/json' },
    query: { v: checksums[String(collection)], t: import.meta.dev ? Date.now() : undefined },
    method: 'POST',
    body: {
      sql,
    },
  })
}