import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ContentColumn, ProseBlock } from '@/components/patterns';
import { Heading, TextLink } from '@/components/ui';
import { nap, site } from '@/lib/site';

/**
 * ROUTE   /privacy-policy
 * MODE    SYNTHESIZE
 * CLASS   generic-content (degenerate member)
 * SOURCE  blankpage
 * GATED   SYSTEM COMPLIANCE — zero raw hex/rgb/px in component code, every
 *         type/spacing value from the extracted scales, every section from
 *         patterns/ + ui/. Violation count must be zero.
 *
 * STRUCTURE — docs/02-template-classes.md, class 5, degenerate case:
 *   HEADER > blankpage > FOOTER   — NO shared tail at all.
 * Neither <SharedTail />, <ServiceAreaMap /> nor <ContactBlock /> belongs here.
 * Intentional, and matches the target's only tail-less page.
 *
 * HEADING OUTLINE — legal prose needs an ordered outline, so every top-level
 * clause is an h2 and sub-clauses are h3 nested under it. ProseBlock's own
 * `title` prop renders an h3, which is the wrong rank for a top-level clause,
 * so each clause supplies its own <Heading level={2}> from ui/ instead. No new
 * primitive is created — <Clause> and <SubClause> are local compositions of
 * ProseBlock + Heading.
 *
 * CONTENT — describes only what this site actually does. There is no analytics
 * script, no tag manager and no tracking cookie anywhere in app/, components/
 * or lib/, so none is claimed. The single collection point is the contact form,
 * which POSTs to app/api/contact/route.ts and is relayed by SMTP; nothing is
 * written to a database. CONFIG nap is a placeholder and the business is
 * service-area only, so this policy names no street address, no company
 * registration number, no data-protection officer and no jurisdictional
 * compliance claim.
 */
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${nap.name} handles the information you share when you request garage door service or contact us through this website.`,
  alternates: { canonical: '/privacy-policy' },
};

/** Paragraph stack. gap-5 = 15px, spacing scale entry --space-5. */
function Paras({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5">{children}</div>;
}

/** A top-level clause: h2 + body. Composed from ProseBlock + ui Heading. */
function Clause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ProseBlock>
      <div className="flex flex-col gap-5">
        <Heading level={2} className="text-ink">
          {title}
        </Heading>
        {children}
      </div>
    </ProseBlock>
  );
}

/** A sub-clause: h3, only ever rendered inside a Clause. */
function SubClause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <Heading level={3} className="text-ink">
        {title}
      </Heading>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <ContentColumn
      title="Privacy Policy"
      intro={`This policy explains what ${nap.name} collects when you use ${site.domain}, why we collect it, how long we keep it, and what you can ask us to do with it.`}
    >
      <Clause title="Who this policy covers">
        <Paras>
          <p>
            It applies to this website and to the service enquiries that reach us
            through it — the contact form on the site, a phone call to{' '}
            {nap.phone}, or an email you send us about a garage door.
          </p>
          <p>
            {nap.name} is a single service-area business. Work happens at your
            property, so the details you share are the details we need in order to
            find the door and fix it. We ask for nothing beyond that.
          </p>
        </Paras>
      </Clause>

      <Clause title="What we collect">
        <Paras>
          <p>
            There is exactly one place on this site where you can hand us personal
            information, and that is the contact form.
          </p>
          <SubClause title="Information you send us">
            <Paras>
              <p>
                The form asks for a name, a phone number, an email address and a
                short description of the problem. You may also pick which type of
                work you think you need. That is the whole set. Everything in it is
                information you have typed yourself and chosen to send.
              </p>
              <p>
                Please do not put payment card numbers, identification documents or
                other sensitive material into the form or an email. We never ask
                for them, and we do not need them to look at a door.
              </p>
            </Paras>
          </SubClause>
          <SubClause title="Information your browser sends">
            <Paras>
              <p>
                Like any website, this one is delivered by a web host, and that
                host keeps ordinary server logs — the address a request came from,
                the page requested, the time, and the browser making the request.
                Those logs exist for security and for fixing faults. We do not
                build profiles from them and we do not link them to anyone who has
                contacted us.
              </p>
            </Paras>
          </SubClause>
        </Paras>
      </Clause>

      <Clause title="Why we collect it, and on what basis">
        <Paras>
          <p>
            One reason only: to answer you and to carry out the garage door work
            you asked about. A phone number so a technician can call before
            arriving, an email address so we can write back, an area so we know
            where we are going, and a description so we bring the right parts.
          </p>
          <p>
            The basis is your own consent, given by choosing to send the form or to
            contact us. You are not required to give us anything, and you can
            withdraw that consent at any time by asking us to delete what you sent.
            Once a visit is arranged, we also keep what we need to carry out the
            job you asked for and to meet our own accounting obligations.
          </p>
        </Paras>
      </Clause>

      <Clause title="Cookies, analytics and tracking">
        <Paras>
          <p>
            This site does not run an analytics package, a tag manager, an
            advertising pixel or any other tracking script. It sets no cookies for
            tracking, measurement or advertising, and it does not follow you across
            other websites.
          </p>
          <p>
            Because nothing here tracks you, there is no tracking preference for
            you to set and nothing for you to opt out of. If that ever changes,
            this section changes first.
          </p>
        </Paras>
      </Clause>

      <Clause title="How your message is transmitted and stored">
        <Paras>
          <p>
            The form is sent over an encrypted connection to this site&apos;s own
            server, which immediately relays it to our email inbox using SMTP. It
            is not written to a database and it is not stored in the website
            itself, so the message lives in one place: our mailbox.
          </p>
          <p>
            The mail credentials sit in server-side environment variables. They are
            never placed in the pages you download, never handled in your browser
            and never written to a log.
          </p>
        </Paras>
      </Clause>

      <Clause title="How long we keep it">
        <Paras>
          <p>
            An enquiry that does not turn into a job is kept only as long as it
            takes to answer it and handle any follow-up, then deleted from the
            mailbox. Where an enquiry becomes actual work, we keep the record for
            as long as we need it for service history, for the parts fitted, and
            for the accounting and tax obligations that apply to the work, after
            which it is deleted.
          </p>
          <p>
            You do not have to wait for that. Ask us to delete your details and we
            will, unless a law obliges us to keep a specific record.
          </p>
        </Paras>
      </Clause>

      <Clause title="Who we share it with">
        <Paras>
          <p>
            Nobody, in the ordinary course of things. We do not sell, rent or trade
            your information, and we do not pass it to advertisers, lead brokers or
            marketing lists.
          </p>
          <p>
            The unavoidable exception is infrastructure: the company that hosts
            this website and the email provider that carries and stores our
            mailbox necessarily handle your message in order to deliver it. They
            act on our instructions and for no other purpose. Beyond that, we would
            disclose information only where the law requires it, or where it is
            genuinely needed to protect someone&apos;s safety or property.
          </p>
        </Paras>
      </Clause>

      <Clause title="Your choices and your rights">
        <Paras>
          <p>
            You can ask us what we hold about you, ask us to correct it if it is
            wrong, ask us to delete it where no law obliges us to keep it, ask for
            a copy of what you sent, and tell us to stop contacting you. We will
            act on any of those.
          </p>
          <p>
            Depending on where you live, local data-protection law may give you
            further rights than the ones listed here. Where such a law applies to
            you, we will honour the rights it gives you.
          </p>
          <SubClause title="Asking us to delete your information">
            <Paras>
              <p>
                Email{' '}
                <TextLink href={`mailto:${nap.email}`}>{nap.email}</TextLink> from
                the address you contacted us with, or call{' '}
                <TextLink href={nap.phoneHref}>{nap.phone}</TextLink>, and say what
                you want removed. We will confirm once it is done. If we have to
                keep a particular record, we will tell you which one and why.
              </p>
            </Paras>
          </SubClause>
        </Paras>
      </Clause>

      <Clause title="Keeping information secure">
        <Paras>
          <p>
            Traffic to and from this site is encrypted, the contact form is checked
            on the server before anything is sent, credentials live outside the
            code, and access to the mailbox is limited to the people who answer
            enquiries. No system anywhere is perfectly secure, which is exactly why
            we collect the minimum a garage door job actually requires and delete
            it when it is no longer needed.
          </p>
        </Paras>
      </Clause>

      <Clause title="Children">
        <Paras>
          <p>
            This site is intended for adults arranging work on a property. We do
            not knowingly collect information from children. If you believe a child
            has sent us personal information through this site, contact us and we
            will delete it.
          </p>
        </Paras>
      </Clause>

      <Clause title="Links to other websites">
        <Paras>
          <p>
            Some pages link out to door and opener manufacturers, mapping tools or
            other third-party sites. Once you follow such a link you are on their
            site, and what they collect is governed by their privacy policy, not by
            this one.
          </p>
        </Paras>
      </Clause>

      <Clause title="Changes to this policy">
        <Paras>
          <p>
            If the way we handle information changes, this page changes with it.
            The version published here is the one that applies. There is no mailing
            list to notify you, so check back if this matters to you.
          </p>
        </Paras>
      </Clause>

      <Clause title="How to contact us about privacy">
        <Paras>
          <p>
            Email <TextLink href={`mailto:${nap.email}`}>{nap.email}</TextLink>,
            call <TextLink href={nap.phoneHref}>{nap.phone}</TextLink>, or use the{' '}
            <TextLink href="/contact">contact page</TextLink> and mark your message
            for privacy. Tell us what you would like us to do and we will reply.
          </p>
        </Paras>
      </Clause>
    </ContentColumn>
  );
}
