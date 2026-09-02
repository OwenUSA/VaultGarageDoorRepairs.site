import { Container, Section, Heading, Prose, ButtonLink } from '@/components/ui';
import { nap } from '@/lib/site';

/**
 * 404. Not one of the five routes (D-01) and not in the sitemap — it is the
 * fallback Next.js renders for anything else, and four sibling sites reached
 * their acceptance sweep to find it had never been written at all.
 *
 * The call CTA is the only filled chromatic action here, as on every page.
 */
export default function NotFound() {
  return (
    <Section tone="page" rhythm="hero">
      <Container>
        <div className="flex max-w-prose flex-col gap-7">
          <Heading level={2} as={1}>
            That page does not exist
          </Heading>
          <Prose className="text-ink-muted">
            The link may be out of date. Head back to the homepage, call us, or open the
            contact page and we will point you the right way.
          </Prose>
          <div className="flex flex-wrap gap-5">
            <ButtonLink variant="call" href={nap.phoneHref}>
              Call {nap.phone}
            </ButtonLink>
            <ButtonLink variant="solid" href="/">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
