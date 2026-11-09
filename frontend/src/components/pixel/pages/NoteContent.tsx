import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Note, NoteBlock } from "../../../data/notes";
import PixelChip from "../ui/PixelChip";

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="note-article__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Tag>
      );
    }
    case "code":
      return (
        <figure className="note-code">
          {block.label ? <figcaption>{block.label}</figcaption> : null}
          <pre>
            <code>{block.text}</code>
          </pre>
        </figure>
      );
    case "callout":
      return (
        <aside className="note-callout" role="note">
          {block.text}
        </aside>
      );
    default:
      return null;
  }
}

export default function NoteContent({ note }: { note: Note }) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(note.date));

  return (
    <article className="note-article">
      <header className="note-article__header">
        <div className="chapter-chips">
          <PixelChip tone="amber">NOTE</PixelChip>
          <PixelChip tone="muted">{date}</PixelChip>
          <PixelChip tone="teal">{note.readingMinutes} min read</PixelChip>
        </div>
        <h1 className="page-title">{note.title}</h1>
        <p className="page-lede">{note.summary}</p>
        <div className="chapter-chips">
          {note.tags.map((tag) => (
            <PixelChip key={tag} tone="muted">
              {tag}
            </PixelChip>
          ))}
        </div>
      </header>

      <div className="note-article__body">
        {note.blocks.map((block, index) => (
          <Block key={`${block.type}-${index}`} block={block} />
        ))}
      </div>

      <footer className="note-article__footer">
        <Link href="/notes" className="pixel-link">
          <ArrowLeft size={13} aria-hidden="true" />
          All notes
        </Link>
        {note.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="pixel-link"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {link.label}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        ))}
      </footer>
    </article>
  );
}
