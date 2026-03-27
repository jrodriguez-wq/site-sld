/**
 * JsonLd — injects structured data (JSON-LD) into the page head.
 * Usage: <JsonLd data={schema} />  or  <JsonLd data={[schema1, schema2]} />
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
