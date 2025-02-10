import { useEffect, useMemo, useState } from 'react'
import { set, useClient, useFormValue } from 'sanity'
import { uuid } from '@sanity/uuid'

import { Text } from '@sanity/ui'

export const VideoAspect = (props: any) => {
  const { onChange, value, path } = props
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const client = useClient({ apiVersion: '2024-12-20' })
  const parent: any = useFormValue(path.slice(0, -1))

  const asset = useMemo<any>(() => {
    return parent?.asset
  }, [parent])

  useEffect(() => {
    const fetchAsset = async () => {
      const file = await client.fetch(
        `*[_type == "sanity.fileAsset" && _id == "${asset?._ref}"][0]`,
      )

      if (file?.url) {
        setLoaded(true)
        processFile(file.url)
      }
    }
    fetchAsset()
  }, [asset])

  const processFile = async (url: string) => {
    setError(false)
    setProcessing(true)

    const id = uuid()
    const vid = document.createElement('video')
    vid.src = url
    vid.load()
    vid.onloadedmetadata = () => {
      const aspectRatio = vid.videoWidth/vid.videoHeight

      setProcessing(false)
      onChange(set(aspectRatio))
    }
  }

  if (!loaded) {
    return <Text size={1}>Loading</Text>
  }

  if (processing) {
    return <Text size={1}>Processing...</Text>
  }

  if (error) {
    return <Text size={1}>Error</Text>
  }

  if (value) {
    return <Text size={1}>{value}</Text>
  }

  return null
}
