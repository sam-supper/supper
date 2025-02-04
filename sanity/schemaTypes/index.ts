import { type SchemaTypeDefinition } from 'sanity'

import {EarthGlobeIcon, BookIcon} from '@sanity/icons'
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
import creditRow from './blocks/credit-row'
import link from './blocks/link'

/** Modules */
import featuredEntries from './modules/featured-entries'
import textCallout from './modules/text-callout'
import donateCta from './modules/donate-cta'
import popularEntriesList from './modules/popular-entries-list'

/** Settings */
import settingsHeader from './settings/settings-header'
import settingsFooter from './settings/settings-footer'
import settingsDonate from './settings/settings-donate'

/** Documents */
import homePage from './documents/home-page'
import aboutPage from './documents/about-page'
import legalPage from './documents/legal-page'
import articlePage from './documents/article-page'
import articleCategory from './documents/article-category'
import articleAuthor from './documents/article-author'
import libraryPage from './documents/library-page'

export const allTypes: SchemaTypeDefinition[] = [
  // Settings
  settingsHeader,
  settingsFooter,
  settingsDonate,

  // Documents
  homePage,
  aboutPage,
  legalPage,
  articlePage,
  articleCategory,
  articleAuthor,
  libraryPage,
  // Modules
  featuredEntries,
  textCallout,
  donateCta,
  popularEntriesList,
  
  // Blocks
  richText,
  richTextSimple,
  externalLink,
  creditRow,
  link
]

export const singletonTypes: SingletonType[] = [
  {
    title: 'Settings & Navigation',
    icon: EarthGlobeIcon,
    types: [settingsHeader, settingsFooter, settingsDonate],
    singleton: true,
    divider: true,
  },
  homePage,
  aboutPage,
  {
    title: 'Library',
    icon: BookIcon,
    types: [articlePage, articleCategory, articleAuthor]
  }
]

export const hiddenTypes: SchemaTypeDefinition[] = [
  libraryPage
]

export const orderableTypes: SchemaTypeDefinition[] = []
