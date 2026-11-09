import {
  Award,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Printer,
  Server,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import {
  business,
  certifications,
  experience,
  homelab,
  languages,
  profile,
  skillGroups,
  type Project,
} from "../../../data/portfolio";
import PixelChip from "../ui/PixelChip";

interface ResumeDocumentProps {
  projects: Project[];
  stats: { publicRepos: number };
  priorityPortrait?: boolean;
}

export default function ResumeDocument({
  projects,
  stats,
  priorityPortrait = false,
}: ResumeDocumentProps) {
  return (
    <>
      <header className="quickview__hero">
        <div className="quickview__photo pixel-photo-frame">
          {/* A static WebP avoids the image optimizer on the LCP path. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={`${profile.name} portrait`}
            width={408}
            height={611}
            loading={priorityPortrait ? "eager" : "lazy"}
            fetchPriority={priorityPortrait ? "high" : "auto"}
            decoding={priorityPortrait ? "sync" : "async"}
          />
        </div>
        <div className="quickview__identity">
          <p className="quickview__toon">SELECTED PLAYER · 2026</p>
          <h2 id="quickview-title">{profile.name}</h2>
          <p className="quickview__role">
            {profile.role} · {profile.focus}
          </p>
          <div className="chapter-chips">
            <PixelChip tone="green">
              <span className="live-dot" /> {profile.availability}
            </PixelChip>
            <PixelChip tone="violet">Banda Aceh, ID</PixelChip>
            <PixelChip tone="amber">UTC+7</PixelChip>
          </div>
          <div className="quickview__contact">
            <a href={`mailto:${profile.email}`} className="pixel-link">
              <Mail size={13} aria-hidden="true" />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-link"
            >
              <FaGithub size={13} aria-hidden="true" />
              SamVivan1
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-link"
            >
              <FaLinkedin size={13} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <div className="quickview__grid">
        <aside className="quickview__aside">
          <section>
            <h3>Education</h3>
            <div className="resume-edu">
              <GraduationCap size={17} aria-hidden="true" />
              <div>
                <strong>{profile.degree}</strong>
                <span>{profile.university}</span>
                <span>
                  {profile.graduation} · GPA {profile.gpa}
                </span>
              </div>
            </div>
            <a
              className="pixel-link"
              href={profile.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              usk.ac.id
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          </section>

          <section>
            <h3>Contact</h3>
            <ul className="resume-contact">
              <li>
                <Mail size={13} aria-hidden="true" />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <MapPin size={13} aria-hidden="true" />
                {profile.location}
              </li>
              <li>
                <FaGithub size={13} aria-hidden="true" />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/SamVivan1
                </a>
              </li>
              <li>
                <FaLinkedin size={13} aria-hidden="true" />
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <FaInstagram size={13} aria-hidden="true" />
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @bintang.panjii
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3>Homelab</h3>
            <div className="resume-business">
              <Server size={16} aria-hidden="true" />
              <div>
                <strong>
                  {homelab.services[0].name} · {homelab.containers}
                </strong>
                <span>{homelab.services[0].detail}</span>
                <span>{homelab.highlights}</span>
              </div>
            </div>
          </section>

          <section>
            <h3>Skills</h3>
            {skillGroups.map((group) => (
              <div key={group.label} className="resume-skill-group">
                <h4>{group.label}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3>Languages</h3>
            <ul className="resume-languages">
              {languages.map((language) => (
                <li key={language.name}>
                  <span>{language.name}</span>
                  <em>{language.level}</em>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Workshop</h3>
            <div className="resume-business">
              <Printer size={16} aria-hidden="true" />
              <div>
                <strong>{business.name}</strong>
                <span>{business.service}</span>
                <span>
                  {business.machine} · {business.materials.join(" / ")}
                </span>
              </div>
            </div>
            <a
              className="pixel-link"
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              protoprime3d.my.id
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          </section>
        </aside>

        <main className="quickview__main">
          <section>
            <h3>Profile</h3>
            <p className="resume-summary">{profile.summary}</p>
          </section>

          <section>
            <h3>
              Experience
              <span className="resume-count">{experience.length}</span>
            </h3>
            <ol className="resume-experience">
              {experience.map((item) => (
                <li key={`${item.date}-${item.title}`}>
                  <div className="resume-experience__head">
                    <strong>{item.title}</strong>
                    <span>{item.date}</span>
                  </div>
                  <p className="resume-experience__org">{item.org}</p>
                  <p>{item.description}</p>
                  {item.credential ? (
                    <a
                      className="pixel-link"
                      href={item.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.credentialLabel ?? "View credential"}
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3>
              Projects
              <span className="resume-count">
                {stats.publicRepos} public repos
              </span>
            </h3>
            <ul className="resume-projects">
              {projects.slice(0, 5).map((project) => (
                <li key={project.name}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{project.name}</strong>
                    <span>{project.description}</span>
                    <em>
                      {project.language}
                      {project.stars > 0 ? ` · ★ ${project.stars}` : ""}
                    </em>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>
              Certifications
              <span className="resume-count">
                {certifications.length} verified
              </span>
            </h3>
            <ul className="resume-certs">
              {certifications.map((cert) => (
                <li key={`${cert.date}-${cert.name}`}>
                  <Award size={14} aria-hidden="true" />
                  <div>
                    <strong>{cert.name}</strong>
                    <span>
                      {cert.issuer} · {cert.date}
                    </span>
                  </div>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.name}`}
                  >
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>What I&apos;m looking for</h3>
            <ul className="resume-looking">
              <li>
                <Sparkles size={13} aria-hidden="true" />
                Internship or entry-level role in DevOps, infrastructure, or
                web engineering.
              </li>
              <li>
                <Sparkles size={13} aria-hidden="true" />
                A team that values systems thinking, documentation, and
                shipping.
              </li>
              <li>
                <Sparkles size={13} aria-hidden="true" />
                Remote or on-site; based in Banda Aceh (UTC+7).
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
