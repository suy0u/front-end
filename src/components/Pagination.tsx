interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  limit,
  onChange,
}: PaginationProps) {
  const pages = Math.ceil(total / limit);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          style={{
            padding: "6px 12px",
            background: page === i + 1 ? "#1d5b4e" : "#fff",
            color: page === i + 1 ? "#fff" : "#000",
          }}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
