export default function Debug({ data }: { data?: any }) {
  if (data === undefined) return null;

  return (
    <pre
      style={{
        whiteSpace: "pre-wrap",
        background: "#eee",
        margin: 0,
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
