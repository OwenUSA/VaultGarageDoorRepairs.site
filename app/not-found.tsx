import { Container, Section, Heading, Prose, ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <Section tone="page" rhythm="hero">
      <Container>
        <div className="flex max-w-prose flex-col gap-7">
          <Heading level={2} as={1}>
            That page does not exist
          </Heading>
          <Prose className="text-ink-muted">
            The link may be out of date. Head back to the homepage, or get in touch and we will
            point you the right way.
          </Prose>
          <div className="flex flex-wrap gap-5">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink variant="inverse" href="/contact">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
