import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Bypass the CDN so builds/fetches always get fresh content (we statically generate + use tag-based revalidation)
  stega: {
    enabled: true,
    studioUrl: "http://localhost:3000/studio"
  }
})
