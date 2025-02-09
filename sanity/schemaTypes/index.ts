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
import richText from './blocks/rich-text'
import richTextSimple from './blocks/rich-text-simple'
import externalLink from './blocks/external-link'
import internalLink from './blocks/internal-link'

/** Settings */
import settingsHeader from './settings/settings-header'
import settingsFooter from './settings/settings-footer'

/** Documents */
import homePage from './documents/home-page'
import aboutPage from './documents/about-page'
import projectPage from './documents/project-page'
import worksPage from './documents/works-page'
import client from './documents/client'
import service from './documents/service'
import infoPage from './documents/info-page'

export const allTypes: SchemaTypeDefinition[] = [
  // Settings
  settingsHeader,
  settingsFooter,

  // Documents
  homePage,
  aboutPage,
  projectPage,
  worksPage,
  client,
  service,
  infoPage,

  // Blocks
  richText,
  richTextSimple,
  externalLink,
  internalLink
]

export const singletonTypes: SingletonType[] = [
  {
    title: 'Settings & Navigation',
    icon: EarthGlobeIcon,
    types: [settingsHeader, settingsFooter],
    singleton: true,
    divider: true,
  },
  worksPage,
  homePage,
  aboutPage,
  infoPage,
]

export const hiddenTypes: SchemaTypeDefinition[] = []

export const orderableTypes: SchemaTypeDefinition[] = []
