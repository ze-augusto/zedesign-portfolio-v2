'use client';

import { useState } from 'react';
import Link from 'next/link';
import './brutalist.css';
import { useI18n } from '@/hooks/useI18n';
import { CONTACT } from '@/data/about';

export default function HomePage() {
  const { lang, t, toggle } = useI18n('PT');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="br">
      {/* Topbar */}
      <header className="top">
        <div className="lhs">
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
              <div className="intro-group">
                <div className="intro">
                  <p>{t.hero.intro1}</p>
                  <p>{t.hero.intro2pre}<span className="em">{t.hero.intro2em}</span></p>
                </div>
                <div className="intro-body">
                  {lang === 'PT' ? (
                    <>
                      <p>Atualmente, trabalho em projetos remodelando os sistemas financeiro e acadêmico da <strong>Universidade de Fortaleza</strong>, plataformas utilizadas por <strong>20.000+ alunos e 1.000+ funcionários</strong>, traduzindo regras de negócio densas e requisitos técnicos estritos em <strong>jornadas de usuário eficientes e escaláveis</strong>.</p>
                      <p>Anteriormente, participei diretamente da criação da plataforma de gestão de licitações públicas da <strong>Procuradoria Geral do Estado do Ceará (PGE-CE)</strong>, desde a definição de requisitos, prototipação, até o handoff para desenvolvedores e melhorias identificadas após implantações.</p>
                      <p>Ao focar 100% no processo de design de um produto, garanto o alinhamento de <strong>modelagem de processos, viabilidade técnica e interfaces claras e escaláveis</strong>.</p>
                    </>
                  ) : (
                    <>
                      <p>Currently, I work on projects redesigning the financial and academic systems of <strong>Universidade de Fortaleza</strong> — platforms used by <strong>20,000+ students and 1,000+ staff</strong> — translating dense business rules and strict technical requirements into <strong>efficient, scalable user journeys</strong>.</p>
                      <p>Previously, I was directly involved in building the public procurement management platform for the <strong>Procuradoria Geral do Estado do Ceará (PGE-CE)</strong>, from requirements definition and prototyping through developer handoff and post-deployment improvements.</p>
                      <p>By focusing 100% on a product&apos;s design process, I ensure alignment between <strong>process modeling, technical feasibility, and clear, scalable interfaces</strong>.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="photo-col">
            <div className="photo">
              <img src="/images/foto_ze.jpg" alt="Zé" />
            </div>
            <div className="info-panel">
              <div className="icell">
                <span className="k">{lang === 'PT' ? 'Localização' : 'Location'}</span>
                <p className="v">{t.hero.location}</p>
              </div>
              <div className="icell">
                <span className="k">Status</span>
                <span className="pill">● {t.hero.available}</span>
              </div>
              <div className="icell">
                <span className="k">{lang === 'PT' ? 'Contato' : 'Contact'}</span>
                <p className="v">
                  <a href="/contato">{t.hero.contactCta}</a>{t.hero.contactSuffix}
                </p>
              </div>
            </div>
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

      {/* What I do */}
      <section className="sec what">
        <div className="head">
          <span className="n">02</span>
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
          <span className="n">03</span>
          <h2>{t.process.title}</h2>
        </div>
        <p className="sub">{t.process.subtitle}</p>
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
          <span className="n">04</span>
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
          <span className="n">05</span>
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
        <h2 className="ctitle">
          {lang === 'PT' ? <>VAMOS<br />CONVERSAR?</> : <>LET&rsquo;S<br />TALK?</>}
        </h2>
        <div className="ccontent">
          <p className="csub">{t.contact.sub}</p>
          <div className="cinfo">
            <div className="crows">
              {/* Email — click to copy */}
              <button
                className="crow"
                onClick={handleCopyEmail}
                aria-label={lang === 'PT' ? 'Copiar e-mail' : 'Copy email'}
              >
                <div className="ctext">
                  <span className="clabel">EMAIL</span>
                  <div className="cvalrow">
                    <span className="cval">{CONTACT.email}</span>
                    {copied ? (
                      <div className="ccopy">
                        <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M16.708 5.292a1 1 0 0 1 0 1.416l-8 8a1 1 0 0 1-1.416 0l-4-4a1.001 1.001 0 0 1 1.416-1.416L8 12.584l7.292-7.292a1 1 0 0 1 1.416 0Z" />
                        </svg>
                        <span>{lang === 'PT' ? 'copiado para a área de transferência' : 'copied to clipboard'}</span>
                      </div>
                    ) : (
                      <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M11 16H4V9H5.5V7H4C2.89688 7 2 7.89688 2 9V16C2 17.1031 2.89688 18 4 18H11C12.1031 18 13 17.1031 13 16V14.5H11V16ZM9 13H16C17.1031 13 18 12.1031 18 11V4C18 2.89688 17.1031 2 16 2H9C7.89688 2 7 2.89688 7 4V11C7 12.1031 7.89688 13 9 13Z" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
              {/* LinkedIn — opens in new tab */}
              <a
                className="crow"
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ctext">
                  <span className="clabel">LINKEDIN</span>
                  <div className="cvalrow">
                    <span className="cval">{CONTACT.linkedin.replace('https://', '')}</span>
                    <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M11.075 2.61875C11.2312 2.24375 11.5969 2 12 2H17C17.5531 2 18 2.44687 18 3V8C18 8.40312 17.7563 8.76875 17.3813 8.925C17.0063 9.08125 16.5781 8.99375 16.2906 8.70937L14.5 6.91563L9.70625 11.7063C9.31563 12.0969 8.68125 12.0969 8.29063 11.7063C7.9 11.3156 7.9 10.6812 8.29063 10.2906L13.0844 5.5L11.2937 3.70625C11.0062 3.41875 10.9219 2.99063 11.0781 2.61563L11.075 2.61875ZM2 7.5C2 6.11875 3.11875 5 4.5 5H7C7.55313 5 8 5.44687 8 6C8 6.55313 7.55313 7 7 7H4.5C4.225 7 4 7.225 4 7.5V15.5C4 15.775 4.225 16 4.5 16H12.5C12.775 16 13 15.775 13 15.5V13C13 12.4469 13.4469 12 14 12C14.5531 12 15 12.4469 15 13V15.5C15 16.8813 13.8813 18 12.5 18H4.5C3.11875 18 2 16.8813 2 15.5V7.5Z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
            <div className="cbtns">
              <a className="cbtn" href="/cv-pt.pdf" download>
                <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4 2C2.89688 2 2 2.89688 2 4V16C2 17.1031 2.89688 18 4 18H6.5V14.5C6.5 13.3969 7.39688 12.5 8.5 12.5H14V7.32812C14 6.79688 13.7906 6.2875 13.4156 5.9125L10.0844 2.58438C9.70938 2.20938 9.20312 2 8.67188 2H4ZM12.1719 7.5H9.25C8.83437 7.5 8.5 7.16563 8.5 6.75V3.82812L12.1719 7.5ZM8.5 13.875C8.15625 13.875 7.875 14.1562 7.875 14.5V18.5C7.875 18.8438 8.15625 19.125 8.5 19.125C8.84375 19.125 9.125 18.8438 9.125 18.5V17.625H9.5C10.5344 17.625 11.375 16.7844 11.375 15.75C11.375 14.7156 10.5344 13.875 9.5 13.875H8.5ZM9.5 16.375H9.125V15.125H9.5C9.84375 15.125 10.125 15.4062 10.125 15.75C10.125 16.0938 9.84375 16.375 9.5 16.375ZM12.5 13.875C12.1562 13.875 11.875 14.1562 11.875 14.5V18.5C11.875 18.8438 12.1562 19.125 12.5 19.125H13.5C14.3969 19.125 15.125 18.3969 15.125 17.5V15.5C15.125 14.6031 14.3969 13.875 13.5 13.875H12.5ZM13.125 17.875V15.125H13.5C13.7062 15.125 13.875 15.2938 13.875 15.5V17.5C13.875 17.7062 13.7062 17.875 13.5 17.875H13.125ZM15.875 14.5V18.5C15.875 18.8438 16.1562 19.125 16.5 19.125C16.8438 19.125 17.125 18.8438 17.125 18.5V17.125H18C18.3438 17.125 18.625 16.8438 18.625 16.5C18.625 16.1562 18.3438 15.875 18 15.875H17.125V15.125H18C18.3438 15.125 18.625 14.8438 18.625 14.5C18.625 14.1562 18.3438 13.875 18 13.875H16.5C16.1562 13.875 15.875 14.1562 15.875 14.5Z" />
                </svg>
                Baixar CV (Português)
              </a>
              <a className="cbtn" href="/cv-en.pdf" download>
                <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4 2C2.89688 2 2 2.89688 2 4V16C2 17.1031 2.89688 18 4 18H6.5V14.5C6.5 13.3969 7.39688 12.5 8.5 12.5H14V7.32812C14 6.79688 13.7906 6.2875 13.4156 5.9125L10.0844 2.58438C9.70938 2.20938 9.20312 2 8.67188 2H4ZM12.1719 7.5H9.25C8.83437 7.5 8.5 7.16563 8.5 6.75V3.82812L12.1719 7.5ZM8.5 13.875C8.15625 13.875 7.875 14.1562 7.875 14.5V18.5C7.875 18.8438 8.15625 19.125 8.5 19.125C8.84375 19.125 9.125 18.8438 9.125 18.5V17.625H9.5C10.5344 17.625 11.375 16.7844 11.375 15.75C11.375 14.7156 10.5344 13.875 9.5 13.875H8.5ZM9.5 16.375H9.125V15.125H9.5C9.84375 15.125 10.125 15.4062 10.125 15.75C10.125 16.0938 9.84375 16.375 9.5 16.375ZM12.5 13.875C12.1562 13.875 11.875 14.1562 11.875 14.5V18.5C11.875 18.8438 12.1562 19.125 12.5 19.125H13.5C14.3969 19.125 15.125 18.3969 15.125 17.5V15.5C15.125 14.6031 14.3969 13.875 13.5 13.875H12.5ZM13.125 17.875V15.125H13.5C13.7062 15.125 13.875 15.2938 13.875 15.5V17.5C13.875 17.7062 13.7062 17.875 13.5 17.875H13.125ZM15.875 14.5V18.5C15.875 18.8438 16.1562 19.125 16.5 19.125C16.8438 19.125 17.125 18.8438 17.125 18.5V17.125H18C18.3438 17.125 18.625 16.8438 18.625 16.5C18.625 16.1562 18.3438 15.875 18 15.875H17.125V15.125H18C18.3438 15.125 18.625 14.8438 18.625 14.5C18.625 14.1562 18.3438 13.875 18 13.875H16.5C16.1562 13.875 15.875 14.1562 15.875 14.5Z" />
                </svg>
                Download CV (English)
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>{t.footer.sig}</span>
        <span>v 2026.1 — FORTALEZA, CE</span>
      </footer>
    </div>
  );
}
