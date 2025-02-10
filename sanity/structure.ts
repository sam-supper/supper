import type {StructureResolver} from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

import { singletonTypes, hiddenTypes, orderableTypes } from './schemaTypes'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) => {
  
  const singletons = singletonTypes.map((typeDef) => {
    if ('types' in typeDef) {
      // Handle group of types
      return S.listItem()
        .title(typeDef.title)
        .icon(typeDef.icon)
        .child(
          S.list()
            .title(typeDef.title)
            .items(
              typeDef.types.map(type => 
                S.listItem()
                  .title(type.title || '')
                  .icon(type.icon)
                  .child(
                    typeDef.singleton ? (
                      S.editor()
                        .id(type.name)
                        .schemaType(type.name)
                        .documentId(type.name)
                        .views([S.view.form()])
                    ) : (
                      S.documentTypeList(type.name)
                        .title(type.title || '')
                        .filter('_type == $type')
                        .params({ type: type.name })
                    )
                  )
              )
            )
        )
    } else {
      // Handle single type
      return S.listItem()
        .title(typeDef.title || '')
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
            .views([S.view.form()])
        )
    }
  })

  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      !singletonTypes.find((typeDef) => 
        'types' in typeDef
          ? typeDef.types.some(type => listItem.getId() === type.name)
          : listItem.getId() === typeDef.name
      ) &&
      !hiddenTypes.find(
        (hiddenTypeDef) => listItem.getId() === hiddenTypeDef.name
      ) &&
      !orderableTypes.find(
        (orderableTypeDef) => listItem.getId() === orderableTypeDef.name
      )
  )

  const orderableListItems = orderableTypes?.map((orderableTypeDef) => {
    return orderableDocumentListDeskItem({
      type: orderableTypeDef.name,
      title: orderableTypeDef.title,
      S,
      context,
    })
  })

  return S.list()
    .title('Content')
    .items([
      ...singletons,
      S.divider(),
      ...orderableListItems,
      ...defaultListItems,
    ])
}
