import type { FC } from "react"
import { ArticlePage } from "@/sanity.types"
import { Image } from "../global/image"
import Link from "next/link"
import { Label } from "../global/label"

interface FeaturedEntriesProps {
  entries: Array<Partial<ArticlePage>>
}

export const FeaturedEntries: FC<FeaturedEntriesProps> = ({ entries }) => {
  if (!entries) return null

  return (
    <div className="w-full grid grid-cols-4 gap-40">
      {entries.map((entry: Partial<ArticlePage>, index: number) => (
        index === 0 ? <EntryFull key={entry._id} index={index} {...entry} /> : <Entry key={entry._id} index={index} {...entry} />
      ))}
    </div>
  )
}

const EntryFull = (props: Partial<ArticlePage> & { index: number }) => {
  const { _id, slug, title, category, authors, featuredImage, index } = props

  return (
    <Link
      href={`/library/${slug}`}
      key={`${_id}-${index}`}
      className={`w-full relative overflow-hidden md:col-span-4 aspect-[16/8] text-center flex flex-col items-center justify-center bg-black-true`}
      aria-labelledby={`${_id}-${index}`}
    >
      <Image
        image={featuredImage}
        className="absolute inset-0 w-full h-full object-cover z-[0] opacity-80"
        sizes="90vw"
      />


      <div className="relative z-[2] text-off-white text-sans-medium">
        <Label uppercase>Today</Label>
        <div className="uppercase">{category as any}</div>
        <div>
          {authors?.map((author: any, authorIndex: number) => {
            return <div key={author._id}>{author.name}{authorIndex !== authors.length - 1 ? ', ' : ''}</div>
          })}
        </div>
        <h3 id={`${_id}-${index}`}>{title}</h3>
      </div>
    </Link>
  )
}

const Entry = (props: Partial<ArticlePage> & { index: number }) => {
  const { _id, slug, title, category, authors, featuredImage, index } = props

  return (
    <Link
      href={`/library/${slug}`}
      key={`${_id}-${index}`}
      aria-labelledby={`${_id}-${index}`}
      className="w-full relative overflow-hidden flex flex-col gap-20"
    >
      <div className="w-full h-auto aspect-[5/4]">
        <Image
          image={featuredImage}
          className="w-full h-full object-cover"
          sizes="(max-width: 800px) 50vw, 25vw"
        />
      </div>

      <div className="w-full text-center flex flex-col justify-center items-center text-sans-small">
        <Label uppercase>{category as any}</Label>
        <div>
          {authors?.map((author: any, authorIndex: number) => {
            return <div key={author._id}>{author.name}{authorIndex !== authors.length - 1 ? ', ' : ''}</div>
          })}
        </div>
        <h3 id={`${_id}-${index}`}>{title}</h3>
      </div>
    </Link>
  )
}