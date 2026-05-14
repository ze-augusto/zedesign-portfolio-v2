'use client';

import Link from 'next/link';
import './brutalist.css';
import { useI18n } from '@/hooks/useI18n';
import { CONTACT } from '@/data/about';

export default function HomePage() {
  const { lang, t, toggle } = useI18n('PT');

  return (
    <div className="br">
      {/* Topbar */}
      <header className="top">
        <div style={{ display: 'flex' }}>
          <div className="mark">ZE - PRODUCT DESIGNER</div>
          <nav className="nav">
            <Link href="/" className="on">{t.nav.home}</Link>
            <Link href="/projetos">{t.nav.projects}</Link>
            <Link href="/sobre">{t.nav.about}</Link>
            <Link href="/contato">{t.nav.contact}</Link>
          </nav>
        </div>
        <div className="lang">
          <button
            className={lang === 'PT' ? 'on' : ''}
            onClick={() => lang !== 'PT' && toggle()}
            aria-pressed={lang === 'PT'}
            aria-label="Mudar para português"
          >
            PT
          </button>
          <button
            className={lang === 'EN' ? 'on' : ''}
            onClick={() => lang !== 'EN' && toggle()}
            aria-pressed={lang === 'EN'}
            aria-label="Switch to English"
          >
            EN
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="top-row">
          <div className="left">
            <div>
              <p className="subtitle">{t.hero.subtitle}</p>
              <h1 className="name">{t.hero.nameShort}</h1>
            </div>
            <div className="desc">
              <p className="role">↳ {t.hero.role}</p>
              <div className="intro">
                <p>{t.hero.intro1}</p>
                <p>{t.hero.intro2pre}<span className="em">{t.hero.intro2em}</span></p>
              </div>
            </div>
          </div>
          <div className="photo">
            <img src="/images/foto_ze.jpg" alt="Zé" />
          </div>
        </div>
        <div className="below">
          <div className="cell">
            <span className="k">{lang === 'PT' ? 'Localização' : 'Location'}</span>
            <p className="v">{t.hero.location}</p>
          </div>
          <div className="cell">
            <span className="k">Status</span>
            <span className="pill">● {t.hero.available}</span>
          </div>
          <div className="cell">
            <span className="k">{lang === 'PT' ? 'Contato' : 'Contact'}</span>
            <p className="v">
              <a href="/contato">{t.hero.contactCta}</a>{t.hero.contactSuffix}
            </p>
          </div>
        </div>
      </section>

      {/* Portrait band */}
      <section className="portband">
        <div className="portrait">
          <span className="chip">[ portrait ] swap-with-photo</span>
        </div>
        <div className="quote">
          <h2>
            {lang === 'PT' ? (
              <>
                Não entrego <mark>telas</mark>.<br />
                Entrego <mark>decisão validada</mark>.
              </>
            ) : (
              <>
                I don&rsquo;t ship <mark>screens</mark>.<br />
                I ship <mark>validated decisions</mark>.
              </>
            )}
          </h2>
          <span className="credit">
            — {lang === 'PT' ? 'Manifesto pessoal' : 'Personal manifesto'} — 2026
          </span>
        </div>
      </section>

      {/* Bio */}
      <section className="sec bio">
        <div className="head">
          <span className="n">02</span>
          <h2>{t.bio.title}</h2>
        </div>
        <div className="body">
          <p>{t.bio.p1}</p>
          <p>{t.bio.p2}</p>
          <p className="third">{t.bio.p3}</p>
        </div>
      </section>

      {/* What I do */}
      <section className="sec what">
        <div className="head">
          <span className="n">03</span>
          <h2>{t.what.title}</h2>
        </div>
        <div className="grid">
          {t.what.items.map((item, i) => (
            <div className="cell" key={i}>
              <span className="n">[ 0{i + 1} ]</span>
              <p className="k">{item.k}</p>
              <p className="v">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="sec process">
        <div className="head">
          <span className="n">04</span>
          <h2>{t.process.title}</h2>
        </div>
        <p style={{ fontSize: 22, fontWeight: 500, maxWidth: '50ch', marginBottom: 16 }}>
          {t.process.subtitle}
        </p>
        <div className="steps">
          {t.process.steps.map((step, i) => (
            <div className="step" key={i}>
              <span className="n">{step.n}</span>
              <span className="k">{step.k}</span>
              <span className="v">{step.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="sec exp">
        <div className="head">
          <span className="n">05</span>
          <h2>{t.experience.title}</h2>
        </div>
        {t.experience.items.map((item, i) => (
          <div className="item" key={i}>
            <div className="meta">
              <span className="period">{item.period}</span>
              <span className="place">{item.place}</span>
            </div>
            <div>
              <h3 className="role">{item.role}</h3>
              <p className="company">{item.company}</p>
              <ul>
                {item.bullets.map((bullet, j) => (
                  <li key={j}>— {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="sec edu">
        <div className="head">
          <span className="n">06</span>
          <h2>{t.education.title}</h2>
        </div>
        <div className="grid">
          {t.education.items.map((item, i) => (
            <div className="item" key={i}>
              <span className="period">{item.period}</span>
              <h4 className="deg">{item.degree}</h4>
              <p className="school">{item.school}</p>
              <p className="kind">{item.kind}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills + Languages */}
      <section className="skl">
        <div className="col">
          <h3>{t.skills.title}</h3>
          {t.skills.groups.map((group, i) => (
            <div className="row" key={i}>
              <span className="k">{group.k}</span>
              <span className="v">{group.v}</span>
            </div>
          ))}
        </div>
        <div className="col langs">
          <h3>{t.langs.title}</h3>
          {t.langs.items.map((langItem, i) => (
            <div className="row" key={i}>
              <span className="k">{langItem.k}</span>
              <span className="v">{langItem.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>{t.contact.cta.toUpperCase()}</h2>
        <p className="sub">{t.contact.sub}</p>
        <div className="links">
          <a href={`mailto:${CONTACT.email}`}>
            <span>
              <span className="key">EMAIL</span>
              {CONTACT.email}
            </span>
            <span>↗</span>
          </a>
          <a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}>
            <span>
              <span className="key">{lang === 'PT' ? 'TELEFONE' : 'PHONE'}</span>
              {CONTACT.phone}
            </span>
            <span>↗</span>
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            <span>
              <span className="key">LINKEDIN</span>
              {CONTACT.linkedin.replace('https://', '')}
            </span>
            <span>↗</span>
          </a>
          <a href={CONTACT.portfolio} target="_blank" rel="noopener noreferrer">
            <span>
              <span className="key">{lang === 'PT' ? 'PORTFÓLIO' : 'PORTFOLIO'}</span>
              {CONTACT.portfolio.replace('https://', '')}
            </span>
            <span>↗</span>
          </a>
        </div>
        <div className="ctas">
          <a className="btn" href="/cv.pdf" download>
            ↓ {t.contact.cv}
          </a>
          <a className="btn outline" href="/projetos">
            ↗ {t.contact.portfolio}
          </a>
        </div>
      </section>

      <footer className="foot">
        <span>{t.footer.sig}</span>
        <span>v 2026.1 — FORTALEZA, CE</span>
      </footer>
    </div>
  );
}
