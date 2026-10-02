export function Wordmark({ small, dark }: { small?: boolean; dark?: boolean }) {
  return (
    <span className={`wordmark ${small ? 'is-small' : ''} ${dark ? 'is-dark' : ''}`} aria-label="Kero-stack" role="img">
      <b aria-hidden="true">kero</b>
      <b aria-hidden="true">stack</b>
    </span>
  );
}
