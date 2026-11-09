import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Cpu,
  HardDrive,
  Server,
} from "lucide-react";
import { homelab } from "../../../data/portfolio";
import PixelChip from "../ui/PixelChip";

interface HomelabArchitectureProps {
  fullPage?: boolean;
}

export default function HomelabArchitecture({
  fullPage = false,
}: HomelabArchitectureProps) {
  const diagramServices = homelab.services.slice(2);

  return (
    <article className="homelab-architecture">
      <header className="homelab-architecture__header">
        <div className="chapter-chips">
          <PixelChip tone="green">
            <BadgeCheck size={13} aria-hidden="true" />
            Verified {homelab.verifiedAt}
          </PixelChip>
          <PixelChip tone="teal">Ubuntu 26.04 LTS</PixelChip>
          <PixelChip tone="amber">{homelab.containers}</PixelChip>
        </div>
        <h1 className="page-title">The Homelab</h1>
        <p className="page-lede">{homelab.summary}</p>
        <p className="homelab-architecture__note">{homelab.verifiedNote}</p>
      </header>

      <dl className="homelab-facts">
        <div>
          <dt>
            <Cpu size={14} aria-hidden="true" /> CPU
          </dt>
          <dd>Ryzen 5 4600G</dd>
        </div>
        <div>
          <dt>
            <Server size={14} aria-hidden="true" /> Memory
          </dt>
          <dd>14 GB RAM</dd>
        </div>
        <div>
          <dt>
            <HardDrive size={14} aria-hidden="true" /> Storage
          </dt>
          <dd>~3.7 TB</dd>
        </div>
        <div>
          <dt>Host OS</dt>
          <dd>Ubuntu 26.04 LTS</dd>
        </div>
        <div>
          <dt>
            <Boxes size={14} aria-hidden="true" /> Containers
          </dt>
          <dd>{homelab.containers}</dd>
        </div>
        <div>
          <dt>Daily driver</dt>
          <dd>Ubuntu 26.10</dd>
        </div>
      </dl>

      <figure className="homelab-diagram">
        <div className="homelab-diagram__host">
          <span className="homelab-diagram__label">Desktop PC · allocated</span>
          <strong>Ryzen 5 4600G · 14 GB RAM · 3.7 TB</strong>
          <span>Ubuntu 26.04 LTS</span>
        </div>

        <span className="homelab-diagram__connector" aria-hidden="true" />

        <div className="homelab-diagram__docker">
          <strong>Docker</strong>
          <span>{homelab.containers}</span>
        </div>

        <span className="homelab-diagram__connector" aria-hidden="true" />

        <div className="homelab-diagram__services">
          {diagramServices.map((service) => (
            <div key={service.name} className="homelab-diagram__node">
              <strong>{service.name}</strong>
              <span>{service.detail}</span>
            </div>
          ))}
        </div>

        <div className="homelab-diagram__storage">
          <HardDrive size={15} aria-hidden="true" />
          <span>
            Storage pool: 238 GB SSD + 1.8 TB + 2 × 931 GB HDD — 3.7 TB usable
          </span>
        </div>
        <figcaption>
          One allocated desktop PC, one Docker host, six service groups. The
          container count is a snapshot, not an uptime claim.
        </figcaption>
      </figure>

      <section className="homelab-architecture__services">
        <h2>Service groups</h2>
        <ul className="service-grid">
          {homelab.services.map((service) => (
            <li key={service.name}>
              <span>{service.name}</span>
              <small>{service.detail}</small>
            </li>
          ))}
        </ul>
      </section>

      <div className="homelab-architecture__footer">
        {!fullPage ? (
          <Link href="/homelab" className="pixel-link">
            Open full architecture
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        ) : (
          <Link href="/" className="pixel-link">
            <ArrowUpRight size={13} aria-hidden="true" />
            Back to the world
          </Link>
        )}
        <Link href="/notes/one-host-many-containers" className="pixel-link">
          Read: One host, many containers
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
        <Link href="/projects/portfolio" className="pixel-link">
          How this portfolio was built
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
