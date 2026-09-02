import type { Metadata } from 'next';
import { routeMeta } from '@/content/copy';
import type { ReactNode } from 'react';
import { ContentColumn, ProseBlock } from '@/components/patterns';
import { Heading, TextLink } from '@/components/ui';
import { nap, hours, site } from '@/lib/site';

/**
 * UNREVIEWED TEMPLATE — requires legal review before launch.
 *
 * ROUTE   /privacy   (one of the five in D-01)
 * CLASS   NOVEL — no counterpart in the reference. Measured by token
 *         conformance only; there is no diff.
 *
 * STRUCTURE — the degenerate content page: HEADER > blankpage > FOOTER, with
 * NO shared tail. Neither <SharedTail />, <BusinessMap /> nor <ContactBlock />
 * belongs here.
 *
 * CONTENT — D-16. This policy describes only what the site actually does:
 *   - the contact form is CLIENT-SIDE ONLY. There is no API route, no server,
 *     no database and no transport of any kind (D-05). Nothing you type is
 *     transmitted anywhere.
 *   - there is no electronic-mail collection, anywhere, in any form (D-03).
 *   - there is no analytics script, tag manager, chat widget, cookie banner or
 *     tracking pixel anywhere in app/, components/ or lib/ (D-15), so none is
 *     claimed.
 * No GDPR or CCPA compliance is claimed. The contact clause lists a phone
 * number and a postal address and nothing else.
 */
// Metadata is NOT declared here. content/copy.ts is the single source, and the
// lexical gate measures it there. See CLAUDE.md and docs/content-divergence.md.
export const metadata: Metadata = routeMeta('/privacy');

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
      intro={`How ${site.name} handles the information you share with us, and what this website does and does not do with it.`}
      headingId="privacy-heading"
    >
      <Clause title="The short version">
        <Paras>
          <p>
            This website does not collect anything. The callback form on the
            contact page runs entirely inside your own browser and has no
            destination — nothing you type into it is transmitted to us, to a
            server, or to anyone else. If you want to reach us, the phone number
            below is the way to do it.
          </p>
          <p>
            We do not run analytics, advertising pixels, a chat widget or a cookie
            banner, and we do not sell or share information with anyone, because we
            do not gather any to sell.
          </p>
        </Paras>
      </Clause>

      <Clause title="What the contact form does">
        <Paras>
          <p>
            The form asks for a name, a phone number, which service you need, when
            it suits you to be called, and a short description of what the door is
            doing. Those fields are checked in your browser so the form can tell
            you if something is missing.
          </p>
          <p>
            The form has no submission target. When you submit it, the page shows a
            confirmation state and stops there. The values never leave your device
            and are discarded when you close or reload the page.
          </p>
          <SubClause title="What this means in practice">
            <Paras>
              <p>
                Until a callback destination is connected, a form submission does
                not reach us. To arrange work, call {nap.phone}. We are open{' '}
                {hours.label}.
              </p>
            </Paras>
          </SubClause>
        </Paras>
      </Clause>

      <Clause title="Information you give us on the phone">
        <Paras>
          <p>
            When you call, you will usually tell us a name, a number to call back
            on, the address the door is at, and what the door is doing. We use that
            to schedule the visit and to bring the right parts, and for nothing
            else. This policy covers the website; it does not change what we do
            with information you give us directly.
          </p>
        </Paras>
      </Clause>

      <Clause title="Cookies and tracking">
        <Paras>
          <p>
            This site sets no analytics cookie, no advertising cookie and no
            tracking pixel. The web framework the site is built on may set cookies
            that are strictly necessary to serve the pages, and your browser keeps
            its own cache. Neither is used to identify you or to follow you between
            sites.
          </p>
          <p>
            The map on the home page and the contact page is embedded from Google
            Maps by coordinates. Loading it means your browser contacts Google, and
            what Google does with that request is governed by Google&rsquo;s
            privacy policy rather than this one. The map is set to load lazily, so
            it is not requested until you scroll to it.
          </p>
        </Paras>
      </Clause>

      <Clause title="Links to other websites">
        <Paras>
          <p>
            Some pages link out to door and opener manufacturers or to mapping
            tools. Once you follow such a link you are on their site, and what they
            collect is governed by their privacy policy, not by this one.
          </p>
        </Paras>
      </Clause>

      <Clause title="Children">
        <Paras>
          <p>
            This site is intended for adults arranging work on a property. We do
            not knowingly collect information from children, and the site collects
            nothing from anyone.
          </p>
        </Paras>
      </Clause>

      <Clause title="Changes to this policy">
        <Paras>
          <p>
            If the way this site handles information changes — for example if a
            callback destination is connected to the form — this page changes with
            it. The version published here is the one that applies. There is no
            mailing list to notify you, so check back if this matters to you.
          </p>
        </Paras>
      </Clause>

      <Clause title="How to contact us about privacy">
        <Paras>
          <p>
            Call <TextLink href={nap.phoneHref}>{nap.phone}</TextLink> and say your
            question is about privacy, or write to us at {nap.address}. Those are
            the only two ways to reach us.
          </p>
        </Paras>
      </Clause>
    </ContentColumn>
  );
}
