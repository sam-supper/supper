import type {StructureResolver} from 'sanity/structure'

import { singletonTypes, hiddenTypes, orderableTypes } from './schemaTypes'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  
  const singletons = singletonTypes.map((typeDef) => {
    return S.listItem()
      .title(typeDef.title as string)
      .icon(typeDef.icon)
      .child(
        S.editor()
          .id(typeDef.name)
          .schemaType(typeDef.name)
          .documentId(typeDef.name)
          .views([S.view.form()])
      )
  })

  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      !singletonTypes.find((typeDef) => listItem.getId() === typeDef.name) &&
      !hiddenTypes.find(
        (hiddenTypeDef) => listItem.getId() === hiddenTypeDef.name
      ) &&
      !orderableTypes.find(
        (orderableTypeDef) => listItem.getId() === orderableTypeDef.name
      )
  )

  // const orderableListItems = orderableTypes?.map((orderableTypeDef) => {
  //   return orderableDocumentListDeskItem({
  //     type: orderableTypeDef.name,
  //     title: orderableTypeDef.title,
  //     S,
  //     context,
  //     icon: orderableTypeDef.icon,
  //   })
  // })

  return S.list()
    .title('Content')
    .items([
      ...singletons,
      S.divider(),
      // ...orderableListItems,
      ...defaultListItems,
    ])
}
