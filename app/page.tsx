'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
      {now && <p>Current Time: {now}</p>}
    </div>
  );
}
