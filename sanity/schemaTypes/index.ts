import { type SchemaTypeDefinition } from 'sanity'

import { EarthGlobeIcon } from '@sanity/icons'
import { ComponentType } from 'react'

/** Types */
type SchemaTypeGroup = {
  title: string
  icon: ComponentType
  types: SchemaTypeDefinition[]
  divider?: boolean
  singleton?: boolean
}

type SingletonType = SchemaTypeDefinition | SchemaTypeGroup

// Blocks
import seo from './blocks/seo'
import richText from './blocks/rich-text'
import richTextSimple from './blocks/rich-text-simple'
import externalLink from './blocks/external-link'
import internalLink from './blocks/internal-link'
import link from './blocks/link'
import media from './blocks/media'

/** Settings */
import settingsSeo from './settings/settings-seo'
import settingsHeader from './settings/settings-header'
import settingsFooter from './settings/settings-footer'
import settingsSplash from './settings/settings-splash'
/** Documents */
import homePage from './documents/home-page'
import projectPage from './documents/project-page'
import worksPage from './documents/works-page'
import client from './documents/client'
import service from './documents/service'
import infoPage from './documents/info-page'

export const allTypes: SchemaTypeDefinition[] = [
  // Settings
  settingsSeo,
  settingsHeader,
  settingsFooter,
  settingsSplash,

  // Documents
  homePage,
  projectPage,
  worksPage,
  client,
  service,
  infoPage,

  // Blocks
  seo,
  richText,
  richTextSimple,
  externalLink,
  internalLink,
  media,
  link,
]

export const singletonTypes: SingletonType[] = [
  {
    title: 'Global Settings & Navigation',
    icon: EarthGlobeIcon,
    types: [settingsHeader, settingsFooter, settingsSeo, settingsSplash],
    singleton: true,
    divider: true,
  },
  worksPage,
  homePage,
  infoPage,
]

export const hiddenTypes: SchemaTypeDefinition[] = []

export const orderableTypes: SchemaTypeDefinition[] = [
  projectPage,
]
